import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import PlanCard from '../components/PlanCard'
import CardDeck from '../components/CardDeck'
import ChartCard from '../components/ChartCard'
import CreatePlanModal, { IFormData } from '../components/CreatePlanModal'
import DeletePlanModal from '../components/DeletePlanModal'
import { ICombinedStates } from '../store/reducers'

import { calcPercentage } from '../utils'
import { updateLocation } from '../store/reducers/location'
import { fetchPlansAction, addPlanAction, IPlan, deletePlanAction } from '../store/reducers/plans'
import moment from 'moment'
import ViewAllButton from '../components/ViewAllButton'

export interface IChartData {
  id: string
  date: string
  amount: number
  category: string
}

const DashboardPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { plans, auth } = useSelector((state: ICombinedStates) => state)
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<IPlan>()
  const [savingsChartData, setSavingsChartData] = useState<IChartData[]>([])
  const [leftOverChartData, setLeftOverChartData] = useState<IChartData[]>([])
  const [categoryChartData, setCategoryChartData] = useState<IChartData[]>([])

  const onDeletePlan = (id: string) => {
    const deleteTarget = plans.plans?.find(p => p._id === id)

    if (!deleteTarget) return

    setDeleteTarget(deleteTarget)
    setOpenDeleteModal(true)
  }

  const renderLatestPlans = () => {
    if (!plans.plans)
      return (
        <div className="tw-text-xl dark:tw-text-white">
          Loading...
        </div>
      )

    if(!plans.plans.length)
      return (
        <div className="tw-text-xl dark:tw-text-white">
          There's no plan yet. Please click Add New Plan button and create your first plan!
        </div>
      )

    const latestPlans = plans.plans.sort((a, b) => a.end < b.end ? 1 : -1 ).slice(0, 3).map(plan => {
      const [diff] = calcPercentage(plan.records)

      return (
        <div
          key={plan._id}
          className='tw-w-full'
        >
          <PlanCard
            id={plan._id}
            title={plan.title}
            startDate={moment(plan.start * 1000)}
            endDate={moment(plan.end * 1000)}
            diff={diff}
            deletePlan={onDeletePlan}
          />
        </div>
      )
    })

    if (latestPlans.length >= 3) {
      latestPlans.push(<ViewAllButton key="view-all-button" />)
    }

    return latestPlans
  }

  useEffect(() => {
    dispatch(updateLocation({ path: '/dashboard', title: 'Dashboard' }))
  }, [])

  useEffect(() => {
    if (!auth.user)
      router.push('/')
  }, [auth])

  useEffect(() => {
    if (auth.user)
      dispatch(fetchPlansAction(auth.user))
  }, [auth])

  useEffect(() => {
    if (plans.plans && plans.plans.length > 0) {
      const records: IChartData[] = plans.plans.map(p => {
        return p.records.map(r => ({
          id: r.id,
          date: new Date(r.date).toDateString(),
          amount: Math.abs(r.amount),
          category: r.category
        }))
      }).flat()

      // calculate saving amount from plans
      const savingsData = records
        .filter(d => d.category === 'Saving')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      
      setSavingsChartData(savingsData.map((d, i) => ({
        ...d,
        amount: savingsData.slice(0, i).reduce((a, c) => a + c.amount, d.amount)
      })))

      // calculate leftover amount of plans
      const leftOvers = plans.plans
        .sort((a, b) => new Date(a.end * 1000).getTime() - new Date(b.end * 1000).getTime())
        .map(p => ({
          id: p.title,
          date: new Date(p.end * 1000).toDateString(),
          amount: p.records.reduce((a, c) => a + c.amount, 0),
          category: ''
        }))

      setLeftOverChartData(leftOvers)

      // calculate sums by categories
      const categoryData = records
        .filter(r => r.category !== 'Income')
        .reduce((a, c) => {
          const aIndex = a.findIndex((record: IChartData) => record.category === c.category)

          if (aIndex > -1) {
            a[aIndex].amount += Math.abs(c.amount)
          } else {
            a.push({ ...c, amount: Math.abs(c.amount) })
          }

          return a
        }, [] as IChartData[])

      setCategoryChartData(categoryData)
    }

  }, [plans.plans])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
    setDeleteTarget(undefined)
  }

  const handleSubmit = (data: IFormData) => {
    if (!auth.user) return

    dispatch(addPlanAction(auth.user, {
      title: data.title,
      start: data.start.unix(),
      end: data.end.unix()
    }))
  }

  const handleDeletePlan = (id: string) => {
    if (!auth.user) return

    dispatch(deletePlanAction(id, auth.user))
  }

  return (
    <div>
      <div className="tw-w-full tw-mt-4 tw-flex tw-flex-row tw-flex-wrap tw-justify-center lg:tw-justify-start lg:tw-overflow-x-auto lg:tw-flex-nowrap tw-overflow-auto">
        <ChartCard type={'savings'} data={savingsChartData} />
        <ChartCard type={'leftOver'} data={leftOverChartData} />
        <ChartCard type={'categories'} data={categoryChartData} />
      </div>

      <CardDeck
        deckTitle="Latest Plans"
        cards={renderLatestPlans()}
        wrap={false}
      />

      <button
        type="button"
        className="tw-fixed tw-bottom-20 tw-right-12 tw-border tw-rounded-md tw-px-4 tw-py-2 tw-transition tw-duration-500 tw-ease tw-select-none tw-text-white tw-bg-indigo-600 tw-border-indigo-500 hover:tw-text-indigo-200 hover:tw-bg-transparent focus:tw-outline-none focus:tw-shadow-outline"
        onClick={handleOpenModal}
      >
        New Plan
      </button>

      <CreatePlanModal
        open={openModal}
        handleClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <DeletePlanModal
        open={openDeleteModal}
        planData={deleteTarget}
        handleClose={handleCloseDeleteModal}
        onSubmit={handleDeletePlan}
      />
    </div>
  )
}

export default DashboardPage
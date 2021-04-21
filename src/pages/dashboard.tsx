import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import PlanCard from '../components/PlanCard'
import CardDeck from '../components/CardDeck'
import ChartCard from '../components/ChartCard'
import CreatePlanModal, { IFormData } from '../components/CreatePlanModal'
import { ICombinedStates } from '../store/reducers'

import { calcPercentage } from '../utils'
import { updateLocation } from '../store/reducers/location'
import { fetchPlansAction, addPlanAction } from '../store/reducers/plans'
import moment from 'moment'

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
  const [savingsChartData, setSavingsChartData] = useState<IChartData[]>([])
  const [leftOverChartData, setLeftOverChartData] = useState<IChartData[]>([])

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

    return plans.plans.sort((a, b) => a.end < b.end ? 1 : -1 ).slice(0, 3).map(plan => {
      const [diff] = calcPercentage(plan.records)

      return (
        <div
          key={plan._id}
          className='tw-w-1/3'
        >
          <PlanCard
            id={plan._id}
            title={plan.title}
            startDate={moment(plan.start * 1000)}
            endDate={moment(plan.end * 1000)}
            diff={diff}
          />
        </div>
    )})
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
      const savingsData = plans.plans.map(p => {
        return p.records.map(r => ({
          id: r.id,
          date: new Date(r.date).toDateString(),
          amount: Math.abs(r.amount),
          category: r.category
        }))
      })
        .flat()
        .filter(d => d.category === 'Saving')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      
      setSavingsChartData(savingsData.map((d, i) => ({
        ...d,
        amount: savingsData.slice(0, i).reduce((a, c) => a + c.amount, d.amount)
      })))

      const leftOvers = plans.plans.map(p => ({
        id: p.title,
        date: new Date(p.end).toDateString(),
        amount: p.records.reduce((a, c) => a + c.amount, 0),
        category: ''
      }))

      setLeftOverChartData(leftOvers)
    }

  }, [plans.plans])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSubmit = (data: IFormData) => {
    if (!auth.user) return

    dispatch(addPlanAction(auth.user, {
      title: data.title,
      start: data.start.unix(),
      end: data.end.unix()
    }))
  }

  return (
    <div>
      <div className="tw-w-full tw-flex tw-flex-row tw-flex-wrap tw-justify-start">
        <ChartCard type={'savings'} data={savingsChartData} />
        <ChartCard type={'recent'} data={leftOverChartData} />
      </div>

      <CardDeck
        deckTitle="Latest Plans"
        cards={renderLatestPlans()}
      />

      <button
        type="button"
        className="tw-fixed tw-bottom-20 tw-right-12 tw-border tw-rounded-md tw-px-4 tw-py-2 tw-transition tw-duration-500 tw-ease tw-select-none tw-text-white tw-bg-indigo-600 tw-border-indigo-500 hover:tw-text-indigo-200 hover:tw-bg-transparent focus:tw-outline-none focus:tw-shadow-outline"
        onClick={handleOpenModal}
      >
        Add New Plan
      </button>

      <CreatePlanModal
        open={openModal}
        handleClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default DashboardPage
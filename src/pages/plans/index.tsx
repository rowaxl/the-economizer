import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import PlanCard from '../../components/PlanCard'
import CardDeck from '../../components/CardDeck'
import CreatePlanModal, { IFormData } from '../../components/CreatePlanModal'
import DeletePlanModal from '../../components/DeletePlanModal'
import { ICombinedStates } from '../../store/reducers'

import { calcPercentage } from '../../utils'
import { updateLocation } from '../../store/reducers/location'
import { fetchPlansAction, addPlanAction, IPlan, deletePlanAction } from '../../store/reducers/plans'
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

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<IPlan>()

  const onDeletePlan = (id: string) => {
    const deleteTarget = plans.plans?.find(p => p._id === id)

    if (!deleteTarget) return

    setDeleteTarget(deleteTarget)
    setOpenDeleteModal(true)
  }

  const renderPlans = () => {
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

    return plans.plans.sort((a, b) => a.end < b.end ? 1 : -1 ).map(plan => {
      const [diff] = calcPercentage(plan.records)

      return (
        <div
          key={plan._id}
          className='tw-w-full lg:tw-w-1/3'
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
    )})
  }

  useEffect(() => {
    dispatch(updateLocation({ path: '/plans', title: 'Plans' }))
  }, [])

  useEffect(() => {
    if (!auth.user)
      router.push('/')
  }, [auth])

  useEffect(() => {
    if (auth.user)
      dispatch(fetchPlansAction(auth.user))
  }, [auth])

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


  const handleDeletePlan = (id: string) => {
    if (!auth.user) return

    dispatch(deletePlanAction(id, auth.user))
  }


  const handleSubmit = (data: IFormData) => {
    if (!auth.user) return

    dispatch(addPlanAction(auth.user, {
      title: data.title,
      start: data.start.unix(),
      end: data.end.unix()
    }))
  }

  const handleReturnToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div>
      <CardDeck
        deckTitle="Your Budget Plans"
        cards={renderPlans()}
        wrap={true}
      />

      <button
        type="button"
        className="tw-fixed tw-bottom-20 tw-right-24 tw-border tw-rounded-md tw-px-4 tw-py-2 tw-transition tw-duration-500 tw-ease tw-select-none tw-text-white tw-bg-indigo-600 tw-border-indigo-500 hover:tw-text-indigo-200 hover:tw-bg-transparent focus:tw-outline-none focus:tw-shadow-outline"
        onClick={handleOpenModal}
      >
        New Plan
      </button>

      <button
        type="button"
        className="tw-fixed tw-bottom-20 tw-right-4 tw-border tw-rounded-md tw-px-4 tw-py-2 tw-transition tw-duration-500 tw-ease tw-select-none tw-text-white tw-bg-gray-600 tw-border-gray-500 hover:tw-text-indigo-200 hover:tw-bg-transparent focus:tw-outline-none focus:tw-shadow-outline"
        onClick={handleReturnToDashboard}
      >
        Return
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
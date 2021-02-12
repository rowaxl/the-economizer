import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import PlanCard from '../components/PlanCard'
import CardDeck from '../components/CardDeck'
import Modal from '../components/Modal'
import { ICombinedStates } from '../store/reducers'

import { calcPercentage } from '../utils'
import { updateLocation } from '../store/reducers/location'
import { fetchPlansAction, addPlanAction } from '../store/reducers/plans'
import { ulid } from 'ulid'

const DashboardPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { plans, auth } = useSelector((state: ICombinedStates) => state)
  const [openModal, setOpenModal] = useState(false)

  const latestPlans = () => {
    if (!plans.plans) return

    return plans.plans.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1 ).map(plan => {
      const [diff] = calcPercentage(plan.records)

      return (
        <div
          key={plan.id}
          className='tw-w-1/3'
        >
          <PlanCard
            id={plan.id}
            date={new Date(plan.date)}
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

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSubmit = (date: string) => {
    if (!auth.user) return

    dispatch(addPlanAction(auth.user, {
      id: ulid(),
      date,
      records: []
    }))
  }

  return (
    <div>
      <CardDeck
        deckTitle="Latest Plans"
        cards={latestPlans()}
      />

      <button
        type="button"
        className="tw-fixed tw-bottom-20 tw-right-12 tw-border tw-border-indigo-500 tw-text-indigo-500 tw-rounded-md tw-px-4 tw-py-2 tw-transition tw-duration-500 tw-ease tw-select-none hover:tw-text-white hover:tw-bg-indigo-600 focus:tw-outline-none focus:tw-shadow-outline"
        onClick={handleOpenModal}
      >
        Add New
      </button>

      <Modal
        open={openModal}
        handleClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default DashboardPage
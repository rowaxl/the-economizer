import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import Card from '../components/Card'
import PlanCard from '../components/PlanCard'
import CardDeck from '../components/CardDeck'
import Modal from '../components/Modal'
import { Tw } from '../tw'
import { ICombinedStates } from '../store/reducers'

import { calcPercentage } from '../utils'
import { updateLocation } from '../store/reducers/location'
import { fetchPlansAction, addPlanAction } from '../store/reducers/plans'

const DashboardPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { plans, auth } = useSelector((state: ICombinedStates) => state)
  const [openModal, setOpenModal] = useState(false)

  const latestPlans = () => 
    plans.plans?.sort((a, b) => a.date < b.date ? 1 : -1).map(plan => {
      const [diff, percentage] = calcPercentage(plan.records)

      return (
        <PlanCard
          key={plan.id}
          id={plan.id}
          date={new Date(plan.date)}
          percentage={percentage}
          diff={diff}
        />
    )})

  useEffect(() => {
    dispatch(updateLocation({ path: '/dashboard', title: 'Dashboard' }))
  }, [])

  useEffect(() => {
    if (!auth)
      router.push('/')
  }, [auth])

  useEffect(() => {
    if (auth.user)
      dispatch(fetchPlansAction(auth.user))
  }, [auth, plans])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSubmit = (date: string) => {

  }

  return (
    <div>
      <div className={Tw().flexRow().my(8).minHeight('1/2').$()}>
        <Card
          title={'Exptends Category'}
        >
          {/* TODO: Circle Graph */}
        </Card>
        <Card
          title={'Left Overs'}
        >
          {/* TODO: Horizontal Graph */}
        </Card>
        <Card
          title={'Savings'}
        >
          {/* TODO: Line Graph */}
        </Card>
      </div>

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
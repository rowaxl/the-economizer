import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { updateLocation } from '../../store/reducers/location'
import { ICombinedStates } from '../../store/reducers'
import { calcPercentage } from '../../utils'

const PlanDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { auth, plans } = useSelector((state: ICombinedStates) => state)

  const { planId } = router.query
  const planDetail = plans.plans?.find(p => p.id === planId)

  if (!planDetail) return <div>Plan not found</div>

  const expences = planDetail.records.filter(r => r.amount < 0)
  const incomes = planDetail.records.filter(r => r.amount > 0)

  const [diff] = calcPercentage(planDetail.records)

  useEffect(() => {
    dispatch(updateLocation({ path: '/plan', title: 'Plan of ' + planDetail.date }))
  }, [])

  useEffect(() => {
    if (!auth.user)
      router.push('/')
  }, [auth])

  return (
    <div>
      <div className="tw-flex tw-flex-row">
        <div className="tw-w-1/2 tw-border-1 tw-border-l tw-border-r tw-border-gray-100 tw-px-4">
          <h5 className="tw-text-xl tw-font-semibold tw-px-1 dark:tw-text-white">
            Expences
          </h5>

          {expences.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(e => (
            <p key={e.id} className="dark:tw-text-white tw-mb-2">
              {`- $${-e.amount} (${e.category})`}
            </p>
          )) }
        </div>
        <div className="tw-w-1/2 tw-border-1 tw-border-l tw-border-r tw-border-gray-100 tw-px-4">
          <h5 className="tw-text-xl tw-font-semibold tw-px-1 dark:tw-text-white">
            Incomes
          </h5>

          {incomes.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(i => (
            <p key={i.id} className="dark:tw-text-white tw-mb-2">
              {`$ ${i.amount} - ${i.category}`}
            </p>
          )) }
        </div>
      </div>

      <div className="tw-flex tw-flex-row tw-border-t tw-border-gray-100 tw-py-4">
        <p className="dark:tw-text-white tw-mt-8">
          Left Over: {diff > 0 ? `$${diff}` : `-$${-diff}`}
        </p>
      </div>
    </div>
  )
}

export default PlanDetail

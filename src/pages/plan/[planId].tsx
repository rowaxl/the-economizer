import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { updateLocation } from '../../store/reducers/location'
import { ICombinedStates } from '../../store/reducers'
import { calcPercentage } from '../../utils'
import Record from '../../components/Record'

const PlanDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { auth, plans } = useSelector((state: ICombinedStates) => state)

  const { planId } = router.query
  const planDetail = plans.plans?.find(p => p._id === planId)

  useEffect(() => {
    if (planDetail)
      dispatch(updateLocation({ path: '/plan', title: planDetail.title }))
  }, [planDetail])

  useEffect(() => {
    if (!auth.user)
      router.push('/')
  }, [auth])

  if (!planDetail) return <div>Plan not found</div>

  const expences = planDetail.records.filter(r => r.amount < 0)
  const incomes = planDetail.records.filter(r => r.amount >= 0)

  const [leftOver] = calcPercentage(planDetail.records)

  const renderLeftOver = () => {
    const color = leftOver > 0 ? 'tw-text-blue-600 dark:tw-text-blue-400' : 'tw-text-red-600 dark:tw-text-red-400'

    return (
      <h6 className={`tw-text-3xl tw-font-bold ${color}`}>
        {leftOver >= 0 ? `$${leftOver}` : `-$${-leftOver}`}
      </h6>
    )
  }

  return (
    <div className="tw-h-full">
      <div className="tw-flex tw-flex-row tw-h-2/3 tw-py-4">
        <div className="tw-w-1/2 tw-border-1 tw-border-gray-100 tw-px-4">
          <h5 className="tw-text-2xl tw-font-semibold tw-px-1 dark:tw-text-white">
            Expences
          </h5>

          <ul className="tw-flex tw-flex-col tw-p-4 tw-overflow-scroll tw-h-full ">
            {
              expences.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(e => (
                <Record key={e.id} category={e.category} amount={e.amount} date={e.createdAt} />
              ))
            }
          </ul>
        </div>

        <div className="tw-w-1/2 tw-border-1 tw-border-gray-100 tw-px-4 tw-h-full">
          <h5 className="tw-text-2xl tw-font-semibold tw-px-1 dark:tw-text-white">
            Incomes
          </h5>

          <ul className="tw-flex tw-flex-col tw-p-4">
            {
              incomes.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(i => (
                <Record key={i.id} category={i.category} amount={i.amount} date={i.createdAt} />
              ))
            }
          </ul>
        </div>
      </div>

      <div className="tw-flex tw-flex-row tw-border-t tw-border-gray-100 tw-py-4 tw-h-1/3 tw-justify-between">
        <div className="tw-flex-column">
          <h5 className="tw-text-2xl tw-font-semibold tw-px-1 dark:tw-text-white">
            Left Over
          </h5>
          {renderLeftOver()}
        </div>

        <div className="tw-flex-column">
            {/* TODO: Add Button / Return Button */}
            {/* TODO: Add / Edit Record Modal, function  */}
            {/* TODO: Category Icons */}

          <button>
            Add Record
          </button>
          <button>
            Return
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlanDetail

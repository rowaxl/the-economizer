import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ulid } from 'ulid'

import { updateLocation } from '../../store/reducers/location'
import { updatePlanAction, IRecord } from '../../store/reducers/plans'
import { ICombinedStates } from '../../store/reducers'
import { calcPercentage } from '../../utils'

import Record from '../../components/Record'
import RecordModal, { IRcordFormData } from '../../components/RecordModal'

const PlanDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { auth, plans } = useSelector((state: ICombinedStates) => state)

  const { planId } = router.query
  const planDetail = plans.plans?.find(p => p._id === planId)

  const [showRecordModal, setShowRecordModal] = useState(false)
  const [targetRecordData, setTargetRecordData] = useState<IRecord | undefined>()

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
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(leftOver)}
      </h6>
    )
  }

  const showAddRecordModal = () => {
    setTargetRecordData(undefined)
    setShowRecordModal(true)
  }

  const closeRecordModal = () => {
    setTargetRecordData(undefined)
    setShowRecordModal(false)
  }

  const returnToDashboard = () => {
    router.push('/dashboard')
  }

  const submitRecord = (formData: IRcordFormData) => {
    if (!targetRecordData) {
      const newRecord = {
        id: ulid(),
        category: formData.category,
        amount: formData.category === 'Income' ? formData.amount : -1 * formData.amount,
        date: formData.date.unix() * 1000,
        createdAt: Date.now(),
      }

      const newPlan = {
        ...planDetail,
        records: planDetail.records.concat(newRecord)
      }

      dispatch(updatePlanAction(
        newPlan,
        auth.user
      ))

      return
    }

    const targetIndex = planDetail.records.findIndex(r => r.id === targetRecordData.id)

    const newRecords = [
      ...planDetail.records.slice(0, targetIndex),
      {
        ...planDetail.records[targetIndex],
        ...formData,
        date: formData.date.unix() * 1000
      },
      ...planDetail.records.slice(targetIndex + 1)
    ]

    const updatedPlan = {
      ...planDetail,
      records: newRecords
    }

    dispatch(updatePlanAction(
      updatedPlan,
      auth.user
    ))

    closeRecordModal()
  }

  const editRecord = (id: string) => {
    const targetRecord = planDetail.records.find(r => r.id === id)

    if (!targetRecord) return

    setTargetRecordData(targetRecord)
    setShowRecordModal(true)
  }


  const deleteRecord = (id: string) => {
    const targetRecord = planDetail.records.find(r => r.id === id)

    if (!targetRecord) return

    const targetIndex = planDetail.records.findIndex(r => r.id === targetRecord.id)

    const newRecords = [
      ...planDetail.records.slice(0, targetIndex),
      ...planDetail.records.slice(targetIndex + 1)
    ]

    const updatedPlan = {
      ...planDetail,
      records: newRecords
    }

    dispatch(updatePlanAction(
      updatedPlan,
      auth.user
    ))
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
              expences.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(r => (
                <Record
                  key={r.id}
                  id={r.id}
                  category={r.category}
                  amount={r.amount}
                  date={r.date}
                  editRecord={editRecord}
                  deleteRecord={deleteRecord}
                />
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
              incomes.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(r => (
                <Record
                  key={r.id}
                  id={r.id}
                  category={r.category}
                  amount={r.amount}
                  date={r.date}
                  editRecord={editRecord}
                  deleteRecord={deleteRecord}
                />
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
          <button
            type="button"
            className="tw-border tw-rounded-md tw-px-4 tw-py-2 tw-transition tw-duration-500 tw-ease tw-select-none tw-text-white tw-bg-indigo-600 tw-border-indigo-500 hover:tw-text-indigo-200 hover:tw-bg-transparent focus:tw-outline-none focus:tw-shadow-outline"
            onClick={showAddRecordModal}
          >
            Add Record
          </button>

          <button
            type="button"
            className="tw-mx-4 tw-border tw-rounded-md tw-px-4 tw-py-2 tw-transition tw-duration-500 tw-ease tw-select-none dark:tw-text-white tw-border-gray-300 hover:tw-text-gray-200 hover:tw-bg-gray-200 focus:tw-outline-none focus:tw-shadow-outline"
            onClick={returnToDashboard}
          >
            Return
          </button>
        </div>
      </div>

      <RecordModal
        open={showRecordModal}
        data={targetRecordData}
        onSubmit={submitRecord}
        handleClose={closeRecordModal}
      />
    </div>
  )
}

export default PlanDetail

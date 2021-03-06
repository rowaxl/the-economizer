import { useState, useEffect, ChangeEvent } from 'react'
import moment, { Moment } from 'moment'
import DateRangePicker from 'react-daterange-picker'
import { IRecord } from '../store/reducers/plans'
import { CATEGORIES } from '../utils'
export interface IRcordFormData {
  category: string
  amount: number
  date: Moment
}

interface IModalProps {
  open: boolean
  data?: IRecord
  handleClose: () => void
  onSubmit: (formData: IRcordFormData) => void
}

const RecordModal = ({ open, data, onSubmit, handleClose }: IModalProps) => {
  const today = moment()
  
  const [category, setCategory] = useState(data ? data.category : 'Housing')
  const [amount, setAmount] = useState(data ? Number(data.amount).toString() : '0')
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [date, setDate] = useState(data ? moment(data.date) : today)

  useEffect(() => {
    setCategory(data ? data.category : 'Housing')
    setAmount(data ? Number(data.amount).toString() : '0')
    setDate(data ? moment(data.date) : today)
  }, [data])

  const onChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
  }

  const onChangeAmount = (value: string) => {
    setAmount(value)
  }

  const onSelectDate = (value: Moment) => {
    setDate(value)

    setOpenDatePicker(false)
  }

  const toggleDatePicker = () => {
    setOpenDatePicker(!openDatePicker)
  }

  const handleOnSubmit = () => {
    onSubmit({ category, amount: parseFloat(amount), date })
    handleClose()
  }

  const renderOptions = () =>
    CATEGORIES.map(c => (
      <option key={c.label} value={c.label}>
        {c.icon} {c.label}
      </option>
    ))

  return (
    open ? 
      <div className="tw-animated tw-fadeIn tw-fixed tw-duration-500 tw-ease-in-out tw-z-50 tw-pin tw-overflow-auto tw-bg-gray-900 tw-bg-opacity-50 tw-flex tw-w-screen tw-h-screen tw-top-0 tw-left-0 tw-flex tw-justify-center tw-align-center">
        <div className="tw-animated tw-fadeInUp tw-shadow-inner tw-duration-500 tw-ease-in-out tw-max-w-md tw-h-auto md:tw-relative tw-pin-b tw-pin-x tw-align-top tw-m-auto tw-justify-end md:tw-justify-center tw-p-8 tw-bg-white dark:bg-gray-600 tw-md:rounded tw-w-full md:tw-h-auto md:tw-shadow tw-flex tw-flex-col">
          <h2 className="tw-text-xl tw-text-center tw-font-hairline md:tw-leading-loose tw-text-grey-200 md:tw-mt-8 tw-mb-4">
            { data ? 'Edit Record' : 'Add Record' }
          </h2>

          <div className="tw-flex tw-flex-row">
            <div className="tw-w-full tw-px-3 tw-mb-5">
              <label className="tw-text-md tw-font-semibold tw-px-1">
                Category
              </label>

              <div className="tw-flex tw-w-full tw-mt-2">
                <select
                  className="tw-form-select tw-mt-1 tw-block tw-w-full"
                  onChange={onChangeCategory}
                  value={category}
                >
                  {renderOptions()}
                </select>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-flex-row">
            <div className="tw-w-full tw-px-3 tw-mb-5">
              <label className="tw-text-md tw-font-semibold tw-px-1">
                Amount
              </label>

              <div className="tw-flex tw-w-full tw-mt-2">
                <input
                  className="tw-w-full tw-pl-3 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                  type="text"
                  placeholder=""
                  onChange={(e) => onChangeAmount(e.target.value)}
                  value={amount}
                />
              </div>
            </div>
          </div>

          <div className="tw-flex tw-flex-row">
            <div className="tw-w-full tw-px-3 tw-mb-5">
              <label className="tw-text-md tw-font-semibold tw-px-1 tw-mb-2">
                Date
              </label>

              <div className="tw-px-1 tw-my-2 tw-flex tw-flex-row tw-justify-around">
                <p className="tw-font-bold">
                  {date.format("YYYY-MM-DD")}
                </p>
              </div>

              <button
                className="tw-w-full tw-bg-blue-400 tw-border-b-2 tw-ml-2 hover:tw-bg-blue-200 tw-font-bold tw-py-2 tw-px-4 tw-rounded"
                onClick={toggleDatePicker}
              >
                Select Date
              </button>

              { openDatePicker && 
                <DateRangePicker
                  onSelect={onSelectDate}
                  value={date}
                  selectionType="single"
                />
              }
            </div>
          </div>
          
          <div className="tw-inline-flex tw-justify-end">
            <button
              className="tw-bg-green-400 tw-border-b-2 tw-ml-2 hover:tw-bg-green-200 tw-font-bold tw-py-2 tw-px-4 tw-rounded"
              onClick={handleOnSubmit}
            >
              Save
            </button>
            <button
              className="bg-grey-100 tw-ml-2 hover:tw-bg-gray-200 tw-text-grey-900 tw-font-bold tw-py-2 tw-px-4 tw-rounded"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    : <></>
  )
}

export default RecordModal
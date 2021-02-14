import { useState } from 'react'
import * as Moment from 'moment'
import { extendMoment, DateRange } from 'moment-range'
import DateRangePicker from 'react-daterange-picker'

const moment = extendMoment(Moment)

export interface IFormData {
  title: string
  start: Moment.Moment,
  end: Moment.Moment
}

interface IModalProps {
  open: boolean
  handleClose: () => void
  onSubmit: (formData: IFormData) => void
}

const Modal = ({ open, onSubmit, handleClose }: IModalProps) => {
  const today = moment()

  const [title, setTitle] = useState('')
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [date, setDate] = useState<DateRange>(
    moment.range(
      today,
      today.clone().add(1, 'week')
    ))

  const onSelectDate = (value: DateRange) => {
    setDate(value)

    setOpenDatePicker(false)
  }

  const toggleDatePicker = () => {
    setOpenDatePicker(!openDatePicker)
  }

  const handleOnSubmit = () => {
    onSubmit({ title, ...date })
    handleClose()
  }

  return (
    open ? 
      <div className="tw-animated tw-fadeIn tw-fixed tw-z-50 tw-pin tw-overflow-auto tw-bg-gray-900 tw-bg-opacity-50 tw-flex tw-w-screen tw-h-screen tw-top-0 tw-left-0 tw-flex tw-justify-center tw-align-center">
        <div className="tw-animated tw-fadeInUp tw-shadow-inner tw-max-w-md tw-h-auto md:tw-relative tw-pin-b tw-pin-x tw-align-top tw-m-auto tw-justify-end md:tw-justify-center tw-p-8 tw-bg-white dark:bg-gray-600 tw-md:rounded tw-w-full md:tw-h-auto md:tw-shadow tw-flex tw-flex-col">
          <h2 className="tw-text-xl tw-text-center tw-font-hairline md:tw-leading-loose tw-text-grey-200 md:tw-mt-8 tw-mb-4">
            Add New Plan
          </h2>

          <div className="tw-flex tw-flex-row">
            <div className="tw-w-full tw-px-3 tw-mb-5">
              <label className="tw-text-md tw-font-semibold tw-px-1">
                Title
              </label>

              <div className="tw-flex tw-w-full tw-mt-2">
                <input
                  className="tw-w-full tw-pl-3 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                  type="text"
                  placeholder="e.g.) Feb 2021"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>
          </div>

          <div className="tw-flex tw-flex-row">
            <div className="tw-w-full tw-px-3 tw-mb-5">
              <label className="tw-text-md tw-font-semibold tw-px-1 tw-mb-2">
                Duration
              </label>

              <div className="tw-px-1 tw-my-2 tw-flex tw-flex-row tw-justify-around">
                <p className="tw-font-bold">
                  {date.start.format("YYYY-MM-DD")}
                </p>

                <p>
                  {" ~ "}
                </p>

                <p className="tw-font-bold">
                  {date.end.format("YYYY-MM-DD")}
                </p>
              </div>

              <button
                className="tw-w-full tw-bg-blue-400 tw-border-b-2 tw-ml-2 hover:tw-bg-blue-200 tw-font-bold tw-py-2 tw-px-4 tw-rounded"
                onClick={toggleDatePicker}
              >
                Select Duration
              </button>

              { openDatePicker && 
                <DateRangePicker
                  onSelect={onSelectDate}
                  value={date}
                  singleDateRange={true}
                />
              }
            </div>
          </div>
          
          <div className="tw-inline-flex tw-justify-end">
            <button
              className="tw-bg-green-400 tw-border-b-2 tw-ml-2 hover:tw-bg-green-200 tw-font-bold tw-py-2 tw-px-4 tw-rounded"
              onClick={handleOnSubmit}
            >
              Add
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

export default Modal
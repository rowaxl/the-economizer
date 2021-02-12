import { useState } from "react"

interface IModalProps {
  open: boolean
  handleClose: () => void
  onSubmit: (date: string) => void
}

const Modal = ({ open, onSubmit, handleClose }: IModalProps) => {
  const [date, setDate] = useState({
    year: '',
    month: ''
  })

  const handleOnSubmit = () => {
    if (!new Date(`${date.month} ${date.year}`)) return

    onSubmit(`${date.month} ${date.year}`)
    handleClose()
  }

  return (
    open ? 
      <div className="tw-animated tw-fadeIn tw-fixed tw-z-50 tw-pin tw-overflow-auto tw-bg-gray-900 tw-bg-opacity-50 tw-flex tw-w-screen tw-h-screen tw-top-0 tw-left-0">
        <div className="tw-animated tw-fadeInUp tw-fixed tw-inset-1/3 tw-shadow-inner tw-max-w-md md:tw-relative tw-pin-b tw-pin-x tw-align-top tw-m-auto tw-justify-end tw-md:justify-center tw-p-8 tw-bg-white dark:bg-gray-600 tw-md:rounded tw-w-full md:tw-h-auto md:tw-shadow tw-flex tw-flex-col">
          <h2 className="tw-text-4xl tw-text-center tw-font-hairline md:tw-leading-loose tw-text-grey-200 md:tw-mt-8 tw-mb-4">
            Add New Plan
          </h2>

          <div className="tw-flex tw-flex-row">
            <div className="tw-w-1/2 tw-px-3 tw-mb-5">
              <label className="tw-text-xs tw-font-semibold tw-px-1">
                Years
              </label>
              <div className="tw-flex">
                <input
                  className="tw-w-full tw-pl-3 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                  type="text"
                  placeholder="2020"
                  onChange={(e) => setDate({...date, year: e.target.value})}
                />
              </div>
            </div>

            <div className="tw-w-1/2 tw-px-3 tw-mb-5">
              <label className="tw-text-xs tw-font-semibold tw-px-1">
                Months (Jan, Feb, Mar...)
              </label>
              <div className="tw-flex">
                <input
                  className="tw-w-full tw-pl-3 tw-pr-3 tw-py-2 tw-rounded-lg tw-border-2 tw-border-gray-200 tw-outline-none focus:tw-border-indigo-500"
                  type="text"
                  placeholder="Feb"
                  onChange={(e) => setDate({...date, month: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <div className="tw-inline-flex tw-justify-center">
            <button
              className="tw-bg-blue-400 tw-flex-1 tw-border-b-2 md:tw-flex-none tw-border-green tw-ml-2 hover:tw-bg-green-200 tw-text-grey-900 tw-font-bold tw-py-4 tw-px-6 tw-rounded"
              onClick={handleOnSubmit}
            >
              Add
            </button>
            <button
              className="bg-grey-100 tw-flex-1 md:tw-flex-none tw-border-tw-b-2 tw-border-red tw-ml-2 hover:tw-bg-red-100 tw-text-grey-900 tw-font-bold tw-py-4 tw-px-6 tw-rounded"
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
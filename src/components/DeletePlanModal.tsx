import { IPlan } from '../store/reducers/plans'

interface IModalProps {
  open: boolean
  planData: IPlan | undefined
  handleClose: () => void
  onSubmit: (id: string) => void
}

const Modal = ({ open, planData, onSubmit, handleClose }: IModalProps) => {
  if (!planData) return <></>

  const handleOnSubmit = () => {
    onSubmit(planData._id)
    handleClose()
  }

  return (
    open ? 
      <div className="tw-animated tw-fadeIn tw-fixed tw-z-50 tw-pin tw-overflow-auto tw-bg-gray-900 tw-bg-opacity-50 tw-flex tw-w-screen tw-h-screen tw-top-0 tw-left-0 tw-flex tw-justify-center tw-align-center">
        <div className="tw-animated tw-fadeInUp tw-shadow-inner tw-max-w-md tw-h-auto md:tw-relative tw-pin-b tw-pin-x tw-align-top tw-m-auto tw-justify-end md:tw-justify-center tw-p-8 tw-bg-white dark:bg-gray-600 tw-md:rounded tw-w-full md:tw-h-auto md:tw-shadow tw-flex tw-flex-col">
          <h2 className="tw-text-xl tw-text-center tw-font-hairline md:tw-leading-loose tw-text-grey-200 md:tw-mt-8 tw-mb-4">
            Delete Plan: {planData.title}
          </h2>

          <div className="tw-flex tw-flex-row">
            <div className="tw-w-full tw-px-3 tw-mb-5">
              <p className="tw-text-2xl">
                Are you sure to delete this plan?
              </p>
            </div>
          </div>

          <div className="tw-inline-flex tw-justify-end">
            <button
              className="tw-bg-red-400 tw-border-b-2 tw-ml-2 hover:tw-bg-red-200 tw-font-bold tw-py-2 tw-px-4 tw-rounded"
              onClick={handleOnSubmit}
            >
              Delete
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
import { useState } from 'react'
import moment from 'moment'
import { CATEGORIES } from '../utils'

interface IRecordProps {
  id: string
  category: string
  amount: number
  date: number
  editRecord: (id: string) => void
  deleteRecord: (id: string) => void
}

const Record = ({ id, category, amount, date, editRecord, deleteRecord }: IRecordProps) => {
  const [showRecordMenu, setShowRecordMenu] = useState(false)

  const renderAmount = () => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }


  const renderIcon = () => {
    if (!category) return '❓'

    return CATEGORIES.find(c => c.label === category)?.icon
  }

  const toggleRecordMenu = () => {
    setShowRecordMenu(!showRecordMenu)
  }

  const handleEditRecord = () => {
    editRecord(id)

    setShowRecordMenu(false)
  }

  const handleDeleteRecord = () => {
    deleteRecord(id)

    setShowRecordMenu(false)
  }

  return (
    <li className="tw-mb-2">
      <div className="tw-select-none cursor-pointer bg-gray-200 dark:bg-gray-700 tw-rounded-md tw-flex tw-flex-1 tw-items-center tw-p-4 tw-transition tw-duration-500 tw-ease-in-out tw-transform hover:tw--translate-y-1 hover:tw-shadow-lg">
        <div className="tw-flex flex-col tw-rounded-full tw-w-10 tw-h-10 tw-bg-gray-200 dark:tw-bg-gray-700 tw-justify-center tw-items-center tw-mr-4">
          {renderIcon()}
        </div>

        <div className="tw-flex-1 pl-1 mr-16">
          <div className="tw-font-medium tw-text-xl dark:tw-text-white">
            {category ? category : 'Uncategorised'}
          </div>

          <div className={amount >= 0 ? 'tw-text-lg tw-text-blue-600 dark:tw-text-blue-400' : 'tw-text-lg tw-text-red-600 dark:tw-text-red-400'}>
            {renderAmount()}
          </div>

          <div className="tw-text-gray-600 dark:tw-text-gray-300 tw-text-sm">
            {moment(date).format('YYYY-MM-DD')}
          </div>
        </div>

        <div className="tw-flex">
          <button
            type="button"
            className="tw-rounded-full tw-relative tw-w-8 tw-h-8 hover:tw-bg-gray-500 dark:tw-text-gray-100 tw-transition tw-duration-500 tw-ease-in-out"
            onClick={toggleRecordMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {
            showRecordMenu && 
            <ul className="tw-bg-white tw-right-12 tw-top-1/4 tw-border tw-rounded-sm tw-transform tw-absolute tw-transition tw-duration-150 ease-in-out tw-min-w-32">
              <li
                className="tw-rounded-sm tw-px-3 tw-py-1 hover:tw-bg-gray-100"
                onClick={handleEditRecord}
              >
                Edit
              </li>
              <li
                className="tw-rounded-sm tw-px-3 tw-py-1 hover:tw-bg-red-100 tw-text-red-500"
                onClick={handleDeleteRecord}
              >
                Delete
              </li>
            </ul>
          }
        </div>
      </div>
    </li>
  )
}

export default Record

interface IRecordProps {
  category: string
  amount: number
  date: number
}

const Record = ({ category, amount, date }: IRecordProps) => {
  const renderAmount = () => {
    return amount > 0 ? `$${amount}` : `- $${-amount}`
  }

  return (
    <li className="tw-mb-2">
      <div className="tw-select-none cursor-pointer bg-gray-200 dark:bg-gray-700 tw-rounded-md tw-flex tw-flex-1 tw-items-center tw-p-4 tw-transition tw-duration-500 tw-ease-in-out tw-transform hover:tw--translate-y-1 hover:tw-shadow-lg">
        <div className="tw-flex flex-col tw-rounded-full tw-w-10 tw-h-10 tw-bg-gray-200 dark:tw-bg-gray-700 tw-justify-center tw-items-center tw-mr-4">
          💧
        </div>
        <div className="tw-flex-1 pl-1 mr-16">
          <div className="tw-font-medium tw-text-xl dark:tw-text-white">
            {category}
          </div>
          <div className="tw-text-gray-600 tw-text-lg dark:tw-text-gray-300">
            {renderAmount()}
          </div>

          <div className="tw-text-gray-600 dark:text-gray-200 tw-text-xs">
            {date}
          </div>
        </div>
      </div>
    </li>
  )
}

export default Record

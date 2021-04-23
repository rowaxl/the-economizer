import DateAmountChart from './DateAmountBarChart'
import LineChart from './LineChart'

import { IChartData } from '../pages/dashboard'
import PieChart from './PieChart'

interface IProps {
  type: string
  data: IChartData[]
}

const TITLES = {
  'savings': 'Saving Balance: $',
  'leftOver': 'Left Over Transitions',
  'categories': 'Expense Categories',
}

const ChartCard = ({
  type,
  data
}: IProps) => {
  const renderTitle = () => {
    if (type === 'savings') {
      const totalBalance = data[data.length - 1].amount

      return TITLES['savings'] + totalBalance
    }

    return TITLES[type as keyof typeof TITLES]
  }

  const renderChart = () => {
    if (type === 'savings') {
      return <DateAmountChart data={data} />
    } else if (type === 'leftOver') {
      return <LineChart data={data} />
    } else if (type === 'categories') {
      return <PieChart data={data} animate={true} />
    }

    return <></>
  }

  return (
    <div className="tw-w-1/3 tw-h-full tw-px-2" style={{ minWidth: 500 }}>
      {
        data.length > 0 &&
        <>
          <p className="tw-text-2xl dark:tw-text-white tw-mb-4">
            { renderTitle()}
          </p>

          <div className="tw-w-full">
            { renderChart() }
          </div>
        </>
      }
    </div>
  )
}

export default ChartCard

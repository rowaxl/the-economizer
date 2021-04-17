import {
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  PieChart,
  Pie,
} from 'recharts'

interface IProps {
  type: string
  data: { date: string, amount: number, category: string }[]
}

const TITLES = {
  'savings': 'Saving Balance: $',
  'recent': 'Recent Records',
  'categories': 'Expense Categories',
}

const ChartCard = ({ type, data }: IProps) => {
  const renderChart = () => {
    if (type === 'savings') {
      console.log({ type, data })

      return (
        <LineChart data={data}>
          <XAxis dataKey='date' />
          <YAxis dataKey='amount' />
          <Legend />

          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      )
    } else if (type === 'recent') {
      return (
        <LineChart data={data}>
          <XAxis dataKey='date' />
          <YAxis dataKey='amount' />
          <Legend />

          <Line type="monotone" dataKey="amount" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      )
    } else if (type === 'categories') {
      const pieData = data.reduce((a, c) => {
        const targetIndex = a.findIndex(el => el.category === c.category)

        if (targetIndex < 0) {
          const newCategory = { category: c.category, count: 1 }
          a.push(newCategory)

          return a
        }

        a[targetIndex] = { ...a[targetIndex], count: a[targetIndex].count++ }

        return a
      }, [] as { category: string, count: number }[])

      return (
        <PieChart>
          <Pie data={pieData} dataKey='count' label />
        </PieChart>
      )
    } else {
      return <></>
    }
  }

  const renderTitles = () => {
    if (type === 'savings') {
      const totalBalance = data.reduce((a, c) => (a + c.amount), 0)

      return TITLES['savings'] + totalBalance
    }

    return TITLES[type as keyof typeof TITLES]
  }

  const dummy = [
    { date: '2021-04-01', amount: 1 },
    { date: '2021-04-02', amount: 2 },
    { date: '2021-04-03', amount: 3 },
    { date: '2021-04-04', amount: 4 },
    { date: '2021-04-05', amount: 5 },
    { date: '2021-04-06', amount: 6 },
  ]

  return (
    <div className="tw-w-1/3 tw-h-full">
      { data.length < 1 ? <></> :
        <>
          <p className="tw-text-xl tw-text-center dark:tw-text-white tw-my-4">
            {renderTitles()}
          </p>

          <div className="tw-h-full">
            {/* { renderChart() } */}
            <LineChart data={dummy}>
              <XAxis dataKey='date' />
              {/* <YAxis dataKey='amount' /> */}
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>

          </div>
        </>
      }
    </div>
  )
}

export default ChartCard

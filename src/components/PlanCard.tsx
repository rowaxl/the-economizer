import moment from 'moment'
import { useRouter } from 'next/router'
import { Moment } from 'moment'

import Card from './Card'
import Button from './Button'

interface IProps {
  id?: string
  title: string
  diff: number
  startDate: Moment
  endDate: Moment
}

const PlanCard = ({ id, title, diff, startDate, endDate }: IProps) => {
  const router = useRouter()

  const renderLeftOver = () => {
    return (
      <h5 className={
        diff >= 0 ?
          'tw-w-full tw-text-xl tw-text-center tw-text-blue-600 dark:tw-text-blue-400' :
          'tw-w-full tw-text-xl tw-text-center tw-text-red-600 dark:tw-text-red-400'
      }>
        { diff >= 0 ? `$${diff}` : `-$ ${-diff}`}
      </h5>
    )
  }

  const renderDate = () => {
    return (
      <h6 className='tw-w-full tw-text-2xl tw-text-center tw-text-black dark:tw-text-white'>
        {`${startDate.format('YYYY-MM-DD')} ~ ${endDate.format('YYYY-MM-DD')}`}
      </h6>
    )
  }

  const renderLeftDay = () => {
    const today = moment()

    if (today.unix() > endDate.unix()) {
      return (
        <div className='tw-my-3'></div>
      )
    }

    return (
      <p className='tw-w-full tw-text-lg tw-text-center dark:tw-text-white'>
        {`${endDate.diff(today, 'days')} days left`}
      </p>
    )
  }

  const handleOnClickDetail = () => {
    router.push('plan/' + id)
  }

  return (
    <Card
      title={title}
    >
      <div className='tw-flex tw-flex-row tw-w-full tw-my-4'>
        {renderDate()}
      </div>

      <div className='tw-flex tw-flex-row tw-my-4'>
        {renderLeftOver()}
      </div>

      <div className='tw-flex tw-flex-row tw-my-4'>
        {renderLeftDay()}
      </div>

      <Button
        variant="primary"
        text="Show Detail"
        onClick={handleOnClickDetail}
      />
    </Card>
  )
}

export default PlanCard

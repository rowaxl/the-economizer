import moment from 'moment'
import { useRouter } from 'next/router'
import Card from './Card'
import Button from './Button'

interface IProps {
  id: string
  title?: string
  percentage: number
  diff: number
  date: Date
}

const MILISEC_A_DAY = 1000 * 60 * 60 * 24

const PlanCard = ({ id, title, percentage, diff, date }: IProps) => {
  const router = useRouter()
  const currentMoment = moment(date).add(1, 'month').subtract(1, 'day')

  const renderPercentage = () => {
    return (
      <h5 className={
        percentage > 0 ?
          'tw-w-full tw-text-xl tw-text-center tw-text-blue-600 dark:tw-text-blue-400' :
          'tw-w-full tw-text-xl tw-text-center tw-text-red-600 dark:tw-text-red-400'
      }>
        {percentage > 0 ? '+' : '' }
        {percentage.toFixed(1)}
        %
        ($ {diff})
      </h5>
    )
  }

  const renderDate = () => {
    return (
      <h6 className='tw-w-full tw-text-2xl tw-text-center tw-text-black dark:tw-text-white'>
        {currentMoment.format('MMM YYYY')}
      </h6>
    )
  }

  const renderLeftDay = () => {
    const today = moment()

    if (today.unix() > currentMoment.unix()) {
      return (
        <div className='tw-my-3'></div>
      )
    }

    return (
      <p className='tw-w-full tw-text-lg tw-text-center dark:tw-text-white'>
        {`${(currentMoment.diff(today) / MILISEC_A_DAY).toFixed(0)} days left`}
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
        {renderPercentage()}
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

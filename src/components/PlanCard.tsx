import moment from 'moment'
import { useRouter } from 'next/router'
import { Tw } from '../tw'
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
          Tw().width('full').fontSize('xl').textAlign('center').textColor('blue-600').textColor('blue-400', 'dark').$() :
          Tw().width('full').fontSize('xl').textAlign('center').textColor('red-600').textColor('red-400', 'dark').$()
      }>
        {percentage > 0 ? '+' : '' }
        {percentage.toFixed(1)}
        %
      </h5>
    )
  }

  const renderDate = () => {
    return (
      <h6 className={Tw().width('full').fontSize('2xl').textAlign('center').textColor('black').textColor('white', 'dark').$()}>
        {currentMoment.format('MMM YYYY')}
      </h6>
    )
  }

  const renderLeftDay = () => {
    const today = moment()

    if (today.unix() > currentMoment.unix()) {
      return (
        <div className={Tw().my(3).$()}></div>
      )
    }

    return (
      <p className={Tw().width('full').fontSize('lg').textAlign('center').textColor('black').textColor('white', 'dark').$()}>
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
      <div className={Tw().flexRow().width('full').my(4).$()}>
        {renderDate()}
      </div>

      <div className={Tw().flexRow().my(4).$()}>
        {renderPercentage()}
      </div>

      <div className={Tw().flexRow().my(4).$()}>
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

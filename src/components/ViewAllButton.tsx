import { useRouter } from 'next/router'
import Card from './Card'


const ViewAllButton = () => {
  const router = useRouter()

  const pushToPlans = () => router.push('/plans')

  return (
    <Card>
      <div className="tw-h-full tw-flex tw-flex-col tw-justify-center">
        <p
          className="tw-text-blue-600 dark:tw-text-blue-400 tw-text-4xl tw-font-bold tw-cursor-pointer lg:tw-text-center"
          onClick={pushToPlans}
        >
          View All Plans
        </p>
      </div>
    </Card>
  )
}

export default ViewAllButton
import dynamic from 'next/dynamic'

const OuterChart = dynamic(
  () => import('./ChartCard'),
  { ssr: false }
)

export default OuterChart
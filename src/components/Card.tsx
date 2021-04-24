import { ReactNode } from "react"

interface IProps {
  title?: string,
  children: ReactNode | ReactNode[]
}

const Card = ({ children, title }: IProps) => {
  return (
    <div className='tw-w-full tw-mt-4 tw-px-4 hover:tw-shadow-xl tw-border dark:tw-border-gray-800 hover:tw-bg-gray-200 dark:hover:tw-bg-gray-600 tw-transition'>
      {
        title &&
        <h4 className='tw-text-xl tw-text-center dark:tw-text-white tw-my-4'>
          {title}
        </h4>
      }

      <div className='tw-py-4 tw-px-4 tw-h-full tw-relative'>
        {children}
      </div>
    </div>
  )
}

export default Card

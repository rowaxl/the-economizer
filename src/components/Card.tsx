import { ReactNode } from "react"

interface IProps {
  title?: string,
  children: ReactNode | ReactNode[]
}

const Card = ({ children, title }: IProps) => {
  return (
    <div className='tw-w-full hover:tw-shadow-xl tw-border dark:tw-border-gray-800'>
      {
        title &&
        <h4 className='tw-text-xl tw-text-center dark:tw-text-white tw-my-4'>
          {title}
        </h4>
      }

      <div className='tw-py-4 tw-px-4'>
        {children}
      </div>
    </div>
  )
}

export default Card

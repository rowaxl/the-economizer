import { ReactNode } from "react"

interface IProps {
  title?: string,
  children: ReactNode | ReactNode[]
}

const Card = ({ children, title }: IProps) => {
  return (
    <div className='tw-w-full hover:tw-shadow-xl'>
      {
        title &&
        <h4 className='tw-text-lg dark:tw-text-white tw-my-4'>
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

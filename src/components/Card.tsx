import { ReactNode } from "react"
import { Tw } from "../tw"

interface IProps {
  title?: string,
  children: ReactNode | ReactNode[]
}

const Card = ({ children, title }: IProps) => {
  return (
    <div className={Tw().width('full').shadow('xl', 'hover').$()}>
      {
        title &&
        <h4 className={Tw().fontSize('2xl').textColor('black').textColor('white', 'dark').my(4).$()}>
          {title}
        </h4>
      }

      <div className={Tw().px(4).py(4).px(10, 'md').$()}>
        {children}
      </div>
    </div>
  )
}

export default Card

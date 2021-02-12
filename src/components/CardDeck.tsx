import { ReactNode } from "react"
import { Tw } from "../tw"

interface IDeckProps {
  deckTitle?: string
  cards?: ReactNode[]
}

const CardDeck = ({ deckTitle, cards }: IDeckProps) => {
  return (
    <div className={Tw().flexColumn().minHeight('1/2').$()}>
      {
        deckTitle &&
        <h4 className={Tw().fontSize('2xl').textColor('black').textColor('white', 'dark').my(4).$()}>
          {deckTitle}
        </h4>
      }

      <div className={Tw().width('full').flexRow().flex('wrap').justify('start').$()}>
        { cards && cards }
      </div>
    </div>
  )
}

export default CardDeck
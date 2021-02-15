import { ReactNode } from "react"

interface IDeckProps {
  deckTitle?: string
  cards?: ReactNode | ReactNode[]
}

const CardDeck = ({ deckTitle, cards }: IDeckProps) => {
  return (
    <div className='tw-flex tw-flex-col tw-min-h-1/2'>
      {
        deckTitle &&
        <h4 className='tw-text-2xl tw-text-black dark:tw-text-white tw-my-4'>
          {deckTitle}
        </h4>
      }

      <div className='tw-w-full tw-flex tw-flex-row tw-flex-wrap tw-justify-start'>
        { cards && cards }
      </div>
    </div>
  )
}

export default CardDeck
import { ReactNode } from "react"

interface IDeckProps {
  deckTitle?: string
  cards?: ReactNode | ReactNode[]
  wrap?: boolean
}

const CardDeck = ({ deckTitle, cards, wrap = true }: IDeckProps) => {
  const deckClasses = wrap ? 'tw-w-full tw-flex tw-flex-row tw-flex-wrap tw-justify-start' : 'tw-w-full tw-flex tw-flex-row tw-justify-start'

  return (
    <div className='tw-flex tw-flex-col tw-min-h-1/2 tw-mt-4'>
      {
        deckTitle &&
        <h4 className='tw-text-2xl tw-text-black dark:tw-text-white tw-my-4'>
          {deckTitle}
        </h4>
      }

      <div className={deckClasses}>
        { cards && cards }
      </div>
    </div>
  )
}

export default CardDeck
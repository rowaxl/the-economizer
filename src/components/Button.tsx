interface IButtonProps {
  text: string
  variant: string
  onClick: any
}

const buttonColor = (variant: string) => {
  switch (variant) {
    case 'primary':
      return 'tw-border-indigo-500 focus:tw-border-indigo-600 tw-bg-indigo-500 focus:tw-bg-indigo-600'
    case 'success':
      return 'tw-border-green-500 focus:tw-border-green-600 tw-bg-green-500 focus:tw-bg-green-600'
    case 'error':
      return 'tw-border-red-500 focus:tw-border-red-600 tw-bg-red-500 focus:tw-bg-red-600'
    case 'info':
      return 'tw-border-teal-500 focus:tw-border-teal-600 tw-bg-teal-500 focus:tw-bg-teal-600'
    default:
      return 'tw-border-gray-500 focus:tw-border-gray-600 tw-bg-gray-500 focus:tw-bg-gray-600'
  }
}

const Button = ({ text, variant, onClick }: IButtonProps) => {
  const color = buttonColor(variant)

  return (
    <button
      className={`tw-border tw-text-white tw-rounded-md tw-px-4 tw-py-2 transition ease select-none tw-w-full ` + color}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button;
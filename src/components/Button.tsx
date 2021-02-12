import { Tw } from "../tw"

interface IButtonProps {
  text: string
  variant: string
  onClick: any
}

const buttonColor = (variant: string) => {
  switch (variant) {
    case 'primary':
      return ['indigo-500', 'indigo-600']
    case 'success':
      return ['green-500', 'green-600']
    case 'error':
      return ['red-500', 'red-600']
    case 'info':
      return ['teal-500', 'teal-600']
    default:
      return ['', '']
  }
}

const Button = ({ text, variant, onClick }: IButtonProps) => {
  const [defaultColor, focusedColor] = buttonColor(variant)

  return (
    <button
      className={Tw()
        .border().borderColor(defaultColor).borderColor(focusedColor, 'focus')
        .bgColor(defaultColor).bgColor(focusedColor, 'focus')
        .textColor('white')
        .rounded('md').px(4).py(2).transition().selectNone()
        .width('full')
        .$()}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button;
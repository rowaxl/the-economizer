import { Tw } from "../tw"

const Footer = () => {
  return (
    <footer className={Tw().flex().textColor('black').textColor('white', 'dark').border('t').borderColor('gray-200').py(4).px(4).$()}>
      &copy; Roaxl0 2021
    </footer>
  )
}

export default Footer
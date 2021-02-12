import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { ICombinedStates } from "../store/reducers"
import { Tw } from "../tw"

const Header = () => {
  const router = useRouter()
  const { location, auth } = useSelector((state: ICombinedStates) => state)

  return (
    router.pathname === '/' ?
      <></> :
      <header className={Tw()
        .textColor('black').textColor('white', 'dark')
        .fontSize('3xl')
        .bgColor('gray-light').bgColor('gray-dark', 'dark')
        .border('b').borderColor('gray-dark').borderColor('gray-mid', 'dark')
        .py(4).px(4)
        .flex().justify('between')
        .$()}>
        {location.title}

        {auth.user && auth.user.name}
      </header>
  );
}

export default Header;
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { ICombinedStates } from "../store/reducers"

const Header = () => {
  const router = useRouter()
  const { location, auth } = useSelector((state: ICombinedStates) => state)

  return (
    router.pathname === '/' ?
      <></> :
      <header className='tw-text-black dark:tw-text-white tw-text-3xl tw-bg-gray-light dark:tw-bg-gray-dark tw-border-b tw-border-gray-dark dark:tw-border-gray-mid tw-py-4 tw-px-4 tw-flex tw-justify-between'>
        <p>
          {location.title}
        </p>

        <p>
          {auth.user && `Welcome ${auth.user.name}!`}
        </p>
      </header>
  )
}

export default Header

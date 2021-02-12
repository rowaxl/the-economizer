import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { updateAuth } from '../store/reducers/auth'
import { signIn, useSession } from 'next-auth/client'
import { encodeUserToken } from '../utils'

import Button from '../components/Button'
import { Tw } from '../tw'

const IndexPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [ session ] = useSession()

  useEffect(() => {
    const dispatchUser = async () => {
      if (!session) {
        dispatch(updateAuth())
        return
      }

      dispatch(updateAuth({
        ...session.user,
        token: encodeUserToken(session.user)
      }))
    }

    dispatchUser()
  }, [session])

  const moveToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className={Tw().height('full').width('full').flexColumn().justify('center').$()}>
      <div className="tw-content tw-text-3xl tw-text-center md:tw-text-left">
        <h1 className="tw-text-5xl tw-text-blue-500 tw-font-bold">
          Economizer
        </h1>
        <p className={Tw().textColor('black').textColor('white', 'dark').$()}>
          Manage, Visualize, Categorize your budgets and Economize it.
        </p>
      </div>

      <div className="tw-container tw-mx-auto tw-flex tw-my-6 tw-flex-col tw-items-center">
        {
          session ?
            <Button
              variant="success"
              text="Start"
              onClick={moveToDashboard}
            /> :
            <Button
              variant="primary"
              text="Sign In with Google"
              onClick={signIn}
            />
        }
      </div>
    </div>
  )
}

export default IndexPage

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { updateAuth } from '../store/reducers/auth'
import { signIn, useSession } from 'next-auth/client'
import { encodeUserToken } from '../utils'

import Button from '../components/Button'

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
    <div className='tw-h-full tw-w-full tw-flex tw-flex-col sm:tw-flex-row tw-justify-center tw-items-center'>
      <div className="tw-content tw-text-3xl tw-text-center sm:tw-text-left">
        <h1 className="tw-text-5xl tw-text-blue-500 tw-font-bold">
          Economizer
        </h1>
        <p className='tw-text-black dark:tw-text-white'>
          Manage, Visualize, Categorize your budgets and Economize it.
        </p>
      </div>

      <div className="tw-container tw-mx-auto tw-flex tw-my-6 tw-flex-col tw-items-center tw-w-1/5 tw-min-w-max">
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

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { updateAuth } from '../store/reducers/auth'
import { providers, signIn, useSession } from 'next-auth/client'
import { encodeUserToken } from '../utils'

import Button from '../components/Button'
import LandingImage from '../components/LandingImage'

interface ISigninProvider {
  id: string
  name: string
  signinUrl: string
  type: string
  callbackUrl: string
}

interface IProps {
  siginInProviders: {
    [key:string]: ISigninProvider
  }
}

const IndexPage = ({ siginInProviders }: IProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [ session ] = useSession()

  useEffect(() => {
    const dispatchUser = async () => {
      console.log({ session })
      if (!session) {
        dispatch(updateAuth())
        return
      }

      dispatch(updateAuth({
        ...session.user,
        token: encodeUserToken(session.user)
      }))

      router.push('/dashboard')
    }

    dispatchUser()
  }, [session])


  const renderSignIn = () =>
    Object.values(siginInProviders)
      .map((provider: ISigninProvider) => (
        <div key={provider.name}>
          <Button
            text={`Sign in with ${provider.name}`}
            variant="outlined"
            onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}
          />
        </div>
      ))

  return (
    <div className='tw-h-full tw-w-full tw-flex tw-flex-col sm:tw-flex-row tw-justify-center tw-items-center tw-z-20'>
      <LandingImage />

      <div className="tw-flex tw-flex-col">
        <div className="tw-content tw-text-3xl tw-text-center sm:tw-text-left">
          <h1 className="tw-text-5xl tw-text-blue-500 tw-font-bold">
            Economizer
          </h1>
          <p className='tw-text-black dark:tw-text-white'>
            Manage, Visualize, Categorize your budgets and Economize it.
          </p>
        </div>

        <div className="tw-container tw-mx-auto tw-flex tw-my-6 tw-flex-col tw-items-center">
          {renderSignIn()}
        </div>
      </div>
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const siginInProviders = await providers()

  return { siginInProviders }
}

export default IndexPage

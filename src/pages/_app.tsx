import { Fragment } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { configStore } from '../store'

import { Provider as AuthProvider } from 'next-auth/client'

const { store, persistor } = configStore()

import 'tailwindcss/tailwind.css'
import 'react-daterange-picker/dist/css/react-calendar.css'

import Layout from '../components/Layout'

const AppWrap = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Head>
        <title>The Economizer</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Provider store={store}>
        <AuthProvider session={pageProps.session}>
          <PersistGate persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </AuthProvider>
      </Provider>
    </Fragment>
  )
}

export default AppWrap
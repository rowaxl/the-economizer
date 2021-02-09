import { Fragment } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'

import Layout from '../components/Layout'

const AppWrap = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Head>
        <title>The Economizer</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  )
}

export default AppWrap
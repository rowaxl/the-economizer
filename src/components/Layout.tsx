import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='tw-flex tw-flex-col tw-h-screen tw-w-screen tw-bg-gray-300 dark:tw-bg-gray-800'>
      <Header />

      <main className='tw-w-screen tw-flex-1 tw-px-8 tw-mx-auto tw-overflow-scroll'>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout

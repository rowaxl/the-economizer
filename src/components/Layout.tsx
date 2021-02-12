import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Tw } from '../tw'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={Tw().flexColumn().screenHeight().screenWidth().bgColor('gray-300').bgColor('gray-800', 'dark').$()}>
      <Header />

      <main className={Tw().screenWidth().flex('1').px(8).mx('auto').overflowScroll().$()}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout

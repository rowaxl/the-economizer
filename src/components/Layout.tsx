import React, { ReactNode } from 'react'
import Link from 'next/link'
import Footer from './Footer'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children }: Props) => (
  <div className="flex flex-col h-screen">
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a>Users List</a>
        </Link>{' '}
        | <a href="/api/users">Users API</a>
      </nav>
    </header>

    <main className="flex-1 overflow-scroll">
      {children}
    </main>

    <Footer />
  </div>
)

export default Layout

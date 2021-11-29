import { Fragment, useEffect } from 'react'
import Head from 'next/head'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/fonts.css'
import '../styles/global.css'
import '../styles/argon.css'

import { AuthProvider } from '../contexts/auth'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const comment = document.createComment('Desenvolvido por Marc (github.com/rfxct) ')
    document.insertBefore(comment, document.documentElement)
  }, [])

  return (
    <AuthProvider>
      <Fragment>
        <Head>
          <title>AjudAki</title>
        </Head>
        <Component {...pageProps} />
      </Fragment>
    </AuthProvider>
  )
}

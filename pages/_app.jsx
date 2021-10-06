import { Fragment, useEffect } from 'react'
import Head from 'next/head'

import '../styles/global.css'
import '../styles/nucleo/css/nucleo.css'
import '../styles/argon.css'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const comment = document.createComment(' Desenvolvido por Marc (github.com/rfxct) ')
    document.insertBefore(comment, document.documentElement)
  }, [])

  return (
    <Fragment>
      <Head>
        <title>AjudAki</title>
      </Head>

      <Component {...pageProps} />
    </Fragment>
  )
}

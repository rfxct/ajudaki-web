import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import Navbar from '../components/Navbar'

import routes from '../routes.js'

export default function Common(props) {
  const router = useRouter()
  const mainContentRef = useRef()

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContentRef.current.scrollTop = 0
  }, [])

  const getBrandText = () => routes.find(r => r.layout + r.path === router.route)?.name ?? 'AjudAki'

  return (
    <div className='main-content bg-gradient-dark' ref={mainContentRef}>
      <Navbar {...props} brandText={getBrandText()} />
      {props.children}
    </div>
  )
}

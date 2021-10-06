import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import routes from '../routes.js'

function Admin(props) {
  const router = useRouter()
  const mainContentRef = useRef()

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContentRef.current.scrollTop = 0
  }, [])

  const getBrandText = () => routes.find(r => r.layout + r.path === router.route)?.name ?? 'AjudAki'

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          src: '/img/brand/logo.png',
        }}
      />
      <div className='main-content bg-gradient-dark' ref={mainContentRef}>
        <Navbar {...props} brandText={props.brandText ?? getBrandText()} />
        {props.children}
      </div>
    </>
  )
}

export default Admin

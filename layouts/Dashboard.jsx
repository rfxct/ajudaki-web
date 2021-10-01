import { useEffect, createRef } from 'react'
import { useRouter } from 'next/router'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import routes from '../routes.js'

function Admin(props) {
  const router = useRouter()
  const mainContentRef = createRef()

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContentRef.current.scrollTop = 0
  }, [])
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name
      }
    }
    return 'AjudAki'
  }
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
      <div className='main-content h-100' ref={mainContentRef}>
        <Navbar {...props} brandText={getBrandText()} />
        {props.children}
      </div>
    </>
  )
}

export default Admin

import { useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/router'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import { AuthContext } from '../contexts/auth'
import routes from '../routes.js'

function Dashboard(props) {
  const { isAuthenticated, user} = useContext(AuthContext)
  const router = useRouter()
  const mainContentRef = useRef()

  useEffect(() => {
    if (!isAuthenticated) return router.push('/login')

    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContentRef.current.scrollTop = 0
  }, [])

  const getBrandText = () => routes.find(r => r.layout + r.path === router.route)?.name ?? 'AjudAki'

  return (
    <>
      {isAuthenticated && (<>
        <Sidebar
          {...props}
          user={user}
          routes={routes}
          logo={{
            innerLink: '/admin/index',
            src: '/img/brand/logo.png',
          }}
        />
        <div className='main-content' ref={mainContentRef}>
          <Navbar {...props} user={user} brandText={props.brandText ?? getBrandText()} />
          {props.children}
        </div>
      </>)}
    </>
  )
}

export default Dashboard
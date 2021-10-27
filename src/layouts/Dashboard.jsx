import { useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/router'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import { AuthContext } from '../contexts/auth'
import routes from '../routes.js'

function Dashboard(props) {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const getBrandText = () => routes.find(r => r.layout + r.path === router.route)?.name ?? 'AjudAki'

  if (user) return (
    <>
      <Sidebar
        {...props}
        user={user}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          src: '/img/brand/logo.png',
        }}
      />
      <div className='main-content'>
        <Navbar {...props} user={user} brandText={props.brandText ?? getBrandText()} />
        {props.children}
      </div>

    </>
  )

  return (
    <></>
  )
}

export default Dashboard
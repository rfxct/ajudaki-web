import { useRouter } from 'next/router'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import routes from '../routes.js'

function Dashboard(props) {
  const router = useRouter()

  const getBrandText = () =>
    Object.values(routes[props.user.role])?.find(r => r.fullPath === router.route)?.name ?? 'AjudAki'

  return (
    <>
      <Sidebar
        {...props}
        user={props.user}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          src: '/img/brand/logo.png',
        }}
      />
      <div className='main-content'>
        <Navbar {...props} user={props.user} brandText={props.brandText ?? getBrandText()} />
        {props.children}
      </div>
    </>
  )
}

export default Dashboard
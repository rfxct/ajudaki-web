import { Spinner } from 'reactstrap'
import { destroyCookie } from 'nookies'

import { getAPIClient } from '../services/axios'

export default function Logout() {
  return (
    <div
      style={{
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    >
      <Spinner />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const apiClient = getAPIClient(ctx)
  await apiClient.post(`/access/logout`).catch(() => [])
  
  destroyCookie(ctx, 'auth.token')
  
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
    props: {}
  }
}
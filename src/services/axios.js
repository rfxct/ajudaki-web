import axios from 'axios'
import { parseCookies, destroyCookie } from 'nookies'

export function getAPIClient(ctx) {
  const { 'auth.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://marc.rdp.fxck.cf:3333/api' // 'http://localhost:3333/api'
  })

  api.interceptors.request.use(config => config)

  api.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
      destroyCookie(undefined, 'auth.token')
    }

    return Promise.reject(error)
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { recoverUserInformation, signInRequest, registerRequest } from '../services/auth'
import { api } from '../services/api'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'auth.token': token } = parseCookies()

    if (token) {
      recoverUserInformation().then(response => setUser(response.data))
    }
  }, [])

  async function signIn({ email, password }) {
    const result = await signInRequest({
      email, password,
    })

    if (!result.success) return result?.message

    setCookie(undefined, 'auth.token', result.data.token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${result.data.token}`

    const { data: user } = await recoverUserInformation()
    setUser(user)

    Router.push('/tickets/@me')
  }

  async function registerAccount({ email, password, password_confirmation, first_name, last_name }) {
    const result = await registerRequest({
      email, password, password_confirmation, first_name, last_name
    })
    if (!result.success) return result?.errors

    await signIn({ email, password })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, registerAccount }}>
      {children}
    </AuthContext.Provider>
  )
}
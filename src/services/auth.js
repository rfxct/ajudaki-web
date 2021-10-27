import { api } from './api'

export async function signInRequest(credentials) {
  try {
    const { data } = await api.post('access/login', credentials)

    return { success: true, data }
  } catch {
    return { success: false, message: 'Credenciais de acesso inválidas' }
  }
}

export async function recoverUserInformation() {
  try {
    const { data } = await api.get('users/@me/profile')
    return { success: true, data }
  } catch {
    return { success: false, message: 'Erro ao obter informações do usuário' }
  }
}
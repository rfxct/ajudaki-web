import { getAPIClient } from '../services/axios'

export default async function checkAuth(ctx) {
  const apiClient = getAPIClient(ctx)
  const { data } = await apiClient.get('/users/@me/profile').catch(() => [])

  return data
}
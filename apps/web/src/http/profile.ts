import { api } from './api-client'

interface GetOProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}
export async function getProfile() {
  const result = await api.get('profile').json<GetOProfileResponse>()

  return result
}

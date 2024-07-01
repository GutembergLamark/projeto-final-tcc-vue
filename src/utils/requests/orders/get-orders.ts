import { getCookie } from '@/utils/functions/cookies'

export async function getListOrders<T>(id: string): Promise<T> {
  console.log(id)

  return await fetch(`${import.meta.env.VITE_API_HOST}/users/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('session-vue')
    }
  })
    .then((res) => res.json())
    .then((res) => res)
}

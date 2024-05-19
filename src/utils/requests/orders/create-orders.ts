import { getCookie } from '@/utils/functions/cookies'

export async function createOrder(data: { [key: string]: string }) {
  const response = await fetch(`${import.meta.env.VITE_API_HOST}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('session-vue')
    },
    body: JSON.stringify({
      days: data.days,
      userId: data.user,
      bookId: data.book
    })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        return res?.error
      }

      if (res.status === 'error') {
        return res?.message
      }

      return res
    })
    .catch((error) => {
      console.log(error)
    })

  return response
}

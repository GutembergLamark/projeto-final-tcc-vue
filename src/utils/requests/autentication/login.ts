
export async function login(data: { [key: string]: string }) {
  console.log(data)

  const response = await fetch(`${import.meta.env.VITE_API_HOST}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        console.log(res.error)
        return res
      }

      if (res.status === 'error') {
        console.log(res.message)
        return res
      }

      return res
    })
    .catch((error) => {
      console.log(error)
    })


  return response
}

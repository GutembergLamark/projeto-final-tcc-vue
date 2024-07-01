export async function register(data: { [key: string]: string }) {
  const response = await fetch(`${import.meta.env.VITE_API_HOST}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
      cpf: data.cpf
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

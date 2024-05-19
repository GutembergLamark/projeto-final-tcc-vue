import { jwtVerify } from 'jose'

const secretKey = import.meta.env.VITE_SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey)

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256']
    })

    return payload
  } catch (error) {
    return null
  }
}

/* export async function deleteSession() {
  const $cookies = inject<TypeCookies>('$cookies')

  if ($cookies) {
    $cookies.remove('session-vue')
    router.push('/')
  }
} */

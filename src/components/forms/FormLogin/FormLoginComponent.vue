<script setup lang="ts">
import { InputComponent } from '@/components/formsInputs'
import { ButtonComponent } from '@/components/general'
import { login } from '@/utils/requests'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()
const router = useRouter()

const data = {
  email: '',
  password: ''
}

const changeInput = (value: string, name: string) => {
  data[name as 'email' | 'password'] = value
}

const submit = async () => {
  const request = await login(data)

  if (request.token) {
    cookies?.set('session-vue', request.token)
    router.push('/dashboard')
  }
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <InputComponent
      type="email"
      placeholder="Email"
      name="email"
      :value="data.email"
      @input-change="changeInput"
    />
    <InputComponent
      type="password"
      placeholder="Senha"
      name="password"
      :value="data.password"
      @input-change="changeInput"
    />
    <ButtonComponent
      type="button"
      label="Entrar"
      styleType="default"
      :button-props="{ type: 'submit' }"
      >Entrar</ButtonComponent
    >
  </form>
</template>

<style src="./FormLogin.scss" lang="scss" scoped />

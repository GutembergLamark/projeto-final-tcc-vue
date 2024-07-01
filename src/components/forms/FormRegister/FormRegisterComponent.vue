<script setup lang="ts">
import { InputComponent } from '@/components/formsInputs'
import { ButtonComponent } from '@/components/general'
import { register } from '@/utils/requests'
import { useRouter } from 'vue-router'
const router = useRouter()

const data = {
  username: '',
  email: '',
  cpf: '',
  password: ''
}

const changeInput = (value: string, name: string) => {
  data[name as 'email' | 'password' | 'cpf' | 'username'] = value
}

const submit = async () => {
  const request = await register(data)

  if (request.user.id) {
    router.push('/')
  }
}
</script>

<template>
  <form class="form" @submit.prevent="submit" data-cy="register">
    <InputComponent
      type="text"
      placeholder="Seu nome"
      name="username"
      :value="data.username"
      @input-change="changeInput"
    />
    <InputComponent
      type="email"
      placeholder="Email"
      name="email"
      :value="data.email"
      @input-change="changeInput"
    />
    <InputComponent
      type="text"
      placeholder="CPF"
      name="cpf"
      :value="data.cpf"
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

<style src="./FormRegister.scss" lang="scss" scoped />

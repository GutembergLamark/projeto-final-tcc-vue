<script setup lang="ts">
import type { PropType } from 'vue'
import type { RootSectionFields } from './RootSection.interfaces'
import { FormLoginComponent } from '@/components/forms'
import library from '@/assets/img/library.png'

const props = defineProps({
  fields: Object as PropType<RootSectionFields>,
  order: Number
})
</script>

<template>
  <section class="r-login">
    <article>
      <picture>
        <img src="/logo.png" width="187" height="160" alt="Logo" />
      </picture>
      <h2>Bem-vindo</h2>
      <p v-if="fields?.type === 'login'">Olá, entre para continuar</p>
      <p v-else>Olá, crie uma nova conta</p>
      <p>
        Ou
        <router-link v-if="fields?.type === 'login'" to="/register"
          >Crie uma nova conta</router-link
        >
        <router-link v-else to="/">entre para continuar</router-link>
      </p>

      <FormLoginComponent v-if="fields?.type === 'login'" />
      <FormRegisterComponent v-else />
    </article>
    <figure>
      <img :src="library" alt="Library" />
    </figure>
  </section>
</template>

<style src="./RootSection.scss" lang="scss" scoped />

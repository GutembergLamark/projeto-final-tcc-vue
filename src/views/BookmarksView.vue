<script setup lang="ts">
import { HeaderLayout } from '@/sections/layouts'
import { ListingBooks } from '@/sections/modules'
</script>
<template lang="">
  <HeaderLayout />
  <main>
    <ListingBooks :fields="{ title: 'Listagem de Livros', cardType: 'vertical' }" :order="1" />
  </main>
</template>

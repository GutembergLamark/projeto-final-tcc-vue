<script setup lang="ts">
import { HeaderLayout } from '@/sections/layouts'
import { CategoriesSection, ListingBooks } from '@/sections/modules'
</script>
<template lang="">
  <HeaderLayout />
  <main class="dashboard">
    <CategoriesSection />
    <ListingBooks :fields="{ title: 'Listagem de Livros', cardType: 'horizontal' }" :order="2" />
  </main>
</template>
<style src="@/assets/sass/pages/dashboard.scss" lang="scss" scoped />

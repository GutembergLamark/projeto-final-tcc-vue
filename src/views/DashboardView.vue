<script setup lang="ts">
import { HeaderLayout } from '@/sections/layouts'
import { CategoriesSection, ListingBooks } from '@/sections/modules'
</script>
<template lang="">
  <HeaderLayout />
  <main>
    <CategoriesSection />
    <ListingBooks title="Listagem de Livros" card-type="horizontal" :order="2" />
  </main>
</template>
<style lang=""></style>

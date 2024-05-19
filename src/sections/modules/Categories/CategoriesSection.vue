<script setup lang="ts">
import CategoriesFilter from './CategoriesFilter.vue'
import { getBooks } from '@/utils/requests'
import { type CategoriesFetch } from './Categories.interfaces'
import { ref } from 'vue'

const categories = ref<string[]>([])

async function getData() {
  try {
    const { books } = await getBooks<CategoriesFetch>()
    categories.value = books?.map((book) => book.category)
  } catch (err) {
    console.log(err)
  }
}

getData()
</script>

<template>
  <section class="categories wrapper">
    <h2>Categorias</h2>
    <CategoriesFilter :categories="categories" />
  </section>
</template>

<style src="./Categories.scss" lang="scss" scoped />

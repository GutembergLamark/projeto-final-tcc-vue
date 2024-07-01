<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, type PropType } from 'vue'
import { IconComponent } from '@/components/general'
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('history')

const props = defineProps({
  categories: Array as PropType<string[]>
})

const category = ref(params.category ?? '')

const setCategory = (newCategory: string) => {
  category.value = newCategory

  category.value === '' ? delete params.category : (params.category = category.value ?? '')
}

const allCategories = computed(() => {
  return [...new Set(props?.categories)]
})

console.log(allCategories.value)
</script>

<template>
  <div class="categories__list">
    <button @click="setCategory('')">
      <figure>
        <IconComponent type="category" />
      </figure>
      <p>Todas</p>
    </button>
    <button
      v-for="(category, i) in allCategories"
      :key="`category-item-${category}-${i}`"
      @click="setCategory(category)"
    >
      <figure>
        <IconComponent type="category" />
      </figure>
      <p>{{ category }}</p>
    </button>
  </div>
</template>

<style src="./Categories.scss" lang="scss" scoped />

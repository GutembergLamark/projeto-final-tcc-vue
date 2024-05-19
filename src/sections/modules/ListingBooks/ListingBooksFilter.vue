<script setup lang="ts">
import { ref, onMounted, type PropType, computed, watch } from 'vue'
import { getListOrders } from '@/utils/requests'
import type { JWTPayload } from 'jose'
import { useUrlSearchParams } from '@vueuse/core'
import type { ListingBooksBook, ListingBooksOrders } from './ListingBooks.interfaces'
import { BookCardComponent } from '@/components/general'

const params = useUrlSearchParams('history')

const props = defineProps({
  books: Array as PropType<ListingBooksBook[]>,
  cardType: String as PropType<'horizontal' | 'vertical'>,
  token: Object as PropType<JWTPayload | null>
})

const category = ref<string>((params?.category as string) ?? '')
const list = ref<ListingBooksBook[]>(props?.books ?? [])

async function getData() {
  try {
    const { orders } = await getListOrders<ListingBooksOrders>(props?.token?.sub ?? '')
    list.value = orders?.map((order) => order?.book) ?? []
  } catch (err) {
    console.log(err)
  }
}

getData()

onMounted(async () => {
  if (props?.cardType === 'vertical') {
    getData()
  }
})

const filteredBooks = computed(() => {
  return list.value.filter((book) =>
    category.value !== '' ? book.category === category.value : book
  )
})

watch(params, () => {
  list.value = list.value.filter((book) =>
    category.value !== '' ? book.category === category.value : book
  )
})
console.log(list.value)
</script>

<template>
  <p>{{ list }}</p>
  <div class="l-books__list">
    <BookCardComponent
      v-for="(book, i) in list"
      :key="`book-item-${book?.id}-${i}`"
      :type="cardType"
      :title="book?.title"
      :image="book?.image"
      :description="book?.synopsis"
      :status="book?.available"
      :author="book?.author"
      :edit="token?.email === 'admin@email.com'"
    />
  </div>
</template>

<style src="./ListingBooks.scss" lang="scss" scoped />

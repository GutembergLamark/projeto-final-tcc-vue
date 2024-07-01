<script setup lang="ts">
import { ref, onMounted, type PropType, computed, watch, onUpdated } from 'vue'
import { getListOrders } from '@/utils/requests'
import type { JWTPayload } from 'jose'
import { useUrlSearchParams } from '@vueuse/core'
import type { ListingBooksBook, ListingBooksOrders } from './ListingBooks.interfaces'
import { BookCardComponent } from '@/components/general'
import { useRoute } from 'vue-router'

const params = useUrlSearchParams('hash-params')

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

const route = useRoute()

onMounted(async () => {
  if (props?.cardType === 'vertical') {
    await getData()
  } else {
    list.value = props?.books ?? []
  }
})

onUpdated(() => {
  list.value = props?.books ?? []
  console.log(params)
})
console.log(route.query)

watch(params?.category! as any, () => (category.value = (params?.category ?? '') as string), {
  immediate: true
})

const filteredBooks = computed(() => {
  return list.value.filter((book) =>
    category.value !== '' ? book.category === category.value : book
  )
})
</script>

<template>
  <div class="l-books__list">
    <BookCardComponent
      v-for="(book, i) in filteredBooks"
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

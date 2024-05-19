<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { getBooks } from '@/utils/requests'
import './ListingBooks.scss'
import ListingBooksFilter from './ListingBooksFilter.vue'
import { decrypt } from '@/utils/libs/jose'
import type {
  ListingBooksBook,
  ListingBooksFetch,
  ListingBooksFields
} from './ListingBooks.interfaces'
import { useCookies } from 'vue3-cookies'
import type { JWTPayload } from 'jose'
import { IconComponent } from '@/components/general'

const { cookies } = useCookies()

const props = defineProps({
  fields: Object as PropType<ListingBooksFields>,
  order: Number
})

const payload = ref<JWTPayload | null>({})
const books = ref<ListingBooksBook[]>([])

async function getData() {
  try {
    const data = await decrypt(cookies?.get('session-vue'))
    const dataBooks = await getBooks<ListingBooksFetch>()
    payload.value = data
    books.value = dataBooks?.books
  } catch (err) {
    console.log(err)
  }
}

getData()
</script>

<template>
  <section class="l-books wrapper">
    <h2>{{ fields?.title }}</h2>

    <ListingBooksFilter :books="books" :cardType="fields?.cardType" :token="payload" />

    <Link v-if="payload?.email === 'admin@email.com'" to="/book/create" class="l-books__add">
      <IconComponent type="add" />
    </Link>
  </section>
</template>

<style src="./ListingBooks.scss" lang="scss" scoped />

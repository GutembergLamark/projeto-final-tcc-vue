<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { IconComponent } from '@/components/general'
import type { CachedBook } from './FormSearch.interfaces'

const active = ref(false)
const search = ref('')
const list = ref([] as Array<CachedBook>)

const props = defineProps({
  cachedBooks: Array<CachedBook>
})

const inputRef = ref<HTMLInputElement>(null as unknown as HTMLInputElement)

onMounted(() => {
  updateList()
})

watch(search, () => {
  updateList()
})

const handleClick = () => {
  if (inputRef.value) {
    inputRef.value.focus()
    active.value = true
  }
}

const handleBlur = (e: any) => {
  if (!e.target.value) {
    active.value = false
  }
}

const handleInput = (e: any) => {
  search.value = e.target.value
}

const highlightTitle = (title: string) => {
  if (search.value) {
    return title.replace(new RegExp(search.value, 'gi'), '<strong>$&</strong>')
  }
  return title
}

const handleLinkClick = () => {
  search.value = ''
}

const updateList = () => {
  list.value =
    search.value != ''
      ? props.cachedBooks
          ?.filter((v) => v.title.toLowerCase().includes(search.value.toLowerCase()))
          ?.slice(0, 6) ?? []
      : []
}
</script>

<template lang="">
  <form class="search">
    <fieldset @click="handleClick" :data-active="active ? 'active' : ''">
      <IconComponent type="search" />
      <input
        ref="inputRef"
        type="text"
        placeholder="Buscar por livro"
        @blur="handleBlur"
        @input="handleInput"
      />
    </fieldset>

    <div v-if="list && list.length > 0" class="search__results">
      <RouterLink
        v-for="item in list"
        :key="item.title"
        :to="item.url || '/'"
        @click="handleLinkClick()"
      >
        <span v-html="highlightTitle(item.title)"></span>
      </RouterLink>
    </div>
  </form>
</template>

<style src="./FormSearch.scss" lang="scss" scoped></style>

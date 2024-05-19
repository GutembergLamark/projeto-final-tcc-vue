<script setup lang="ts">
import { ref } from 'vue'
import HeaderNav from './HeaderNav.vue'
import { getSuggestionPosts } from '@/components/forms/FormSearch/FormSearch.suggestions'

const suggestion = ref([] as { title: string; url: string }[])

async function getData() {
  try {
    suggestion.value = await getSuggestionPosts()
  } catch (err) {
    console.log(err)
  }
}

getData()

const payload = {}
</script>

<template>
  <header className="header">
    <div className="header__wrapper wrapper">
      <h1>
        <a href="/dashboard">
          <img src="/header-logo.png" width="53" height="45" alt="Logo" />
        </a>
      </h1>
      <HeaderNav responsivity="desktop" :suggestion="suggestion" :payload="payload" />
    </div>
  </header>
  <HeaderNav responsivity="mobile" :suggestion="suggestion" :payload="payload" />
</template>

<style src="./Header.scss" lang="scss" />

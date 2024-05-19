<script setup lang="ts">
import { HeaderLayout } from '@/sections/layouts'
</script>

<template>
  <HeaderLayout />
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

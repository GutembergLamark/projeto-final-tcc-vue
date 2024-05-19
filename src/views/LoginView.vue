<script setup lang="ts">
import { RootSection } from '@/sections/modules'
</script>

<template>
  <main class="login">
    <RootSection :fields="{ type: 'login' }" :order="1" />
  </main>
</template>

<style src="@/assets/sass/pages/login.scss" lang="scss" scoped />

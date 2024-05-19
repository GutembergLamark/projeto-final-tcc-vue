<script setup lang="ts">
const props = defineProps({
  value: String,
  placeholder: String,
  id: String
})
</script>

<template>
  <fieldset class="field">
    <textarea v-bind="props"></textarea>
  </fieldset>
</template>

<style src="./TextArea.scss" lang="scss" scoped />

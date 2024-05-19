<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: String,
  value: String,
  placeholder: String,
  id: String,
  name: String
})

const emit = defineEmits<{
  (e: 'input-change', value: string, name: string): void
}>()

const dataValue = computed({
  get(): string {
    return props?.value ?? ''
  },
  set(newValue: string) {
    emit('input-change', newValue, props.name!)
  }
})
</script>

<template>
  <fieldset class="field">
    <input v-bind="props" v-model="dataValue" />
  </fieldset>
</template>

<style src="./Input.scss" lang="scss" scoped />

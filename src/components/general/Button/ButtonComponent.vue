<script setup lang="ts">
import { type ButtonHTMLAttributes, type LinkHTMLAttributes, type PropType } from 'vue'

const props = defineProps({
  type: String as PropType<'link' | 'button'>,
  styleType: String as PropType<'default'>,
  label: String,
  href: String,
  target: String as PropType<'_self' | '_blank'>,
  linkProps: Object as PropType<LinkHTMLAttributes>,
  buttonProps: Object as PropType<ButtonHTMLAttributes>
})

const Tag = props?.type === 'link' ? 'router-link' : 'button'
const linkProps = props?.type === 'link' ? props?.linkProps : {}
const buttonProps = props?.type === 'button' ? props?.buttonProps : {}
</script>

<template>
  <component
    :is="Tag"
    :class="`button button--${styleType}`"
    :aria-label="label"
    :href="type === 'link' ? href : undefined"
    :target="type === 'link' ? target : undefined"
    v-bind="type === 'link' ? linkProps : buttonProps"
  >
    <slot></slot>
  </component>
</template>

<style src="./Button.scss" lang="scss" scoped />

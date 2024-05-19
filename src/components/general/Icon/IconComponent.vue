<script setup lang="ts">
import type { PropType } from 'vue'
import * as svgSheet from './svgSheet'

interface SvgSheetKeys {
  [key: string]: keyof typeof svgSheet // Use o tipo apropriado para os valores do objeto
}

const props = defineProps({
  type: String as PropType<keyof SvgSheetKeys>
})

function isIndexDefined(index: any): index is keyof typeof svgSheet {
  return typeof index !== 'undefined'
}

const svgElement = isIndexDefined(props.type) ? svgSheet[props.type].default : null
</script>

<template>
  <img v-if="svgElement" :src="svgElement" alt="Icon" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconComponent } from '..'

const props = defineProps({
  type: String,
  image: String,
  title: String,
  description: String,
  status: Boolean,
  author: String,
  edit: Boolean
})
</script>

<template>
  <article :class="`card card--${type}`">
    <router-link
      v-if="edit"
      class="card__edit"
      :to="`/book/update?title=${title}`"
      aria-label="Editar Livro"
    >
      <IconComponent type="edit" />
    </router-link>
    <router-link
      :to="`/book/${title
        ?.toLowerCase()
        .replace(/\s/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')}?title=${title}${
        type === 'vertical' ? '&bookmark=true' : ''
      }`"
    >
      <figure>
        <img v-if="image" :src="image" width="113" height="170" :alt="title" />
        <div class="card__loading"></div>
      </figure>
      <div class="card__text">
        <h3 v-if="title">{{ title }}</h3>
        <p v-if="type === 'horizontal' && description">{{ description }}</p>
        <p>
          <span
            :style="{ color: status ? '#ef9f27' : type === 'vertical' ? '#006316' : '#FF3053' }"
          >
            {{ status ? 'Disponível' : type === 'vertical' ? 'Salvo' : 'Indisponível' }}
          </span>
          &bull;
          <span>{{ type === 'vertical' ? 'Ver' : author }}</span>
        </p>
      </div>
    </router-link>
  </article>
</template>

<style src="./BookCard.scss" lang="scss" scoped />

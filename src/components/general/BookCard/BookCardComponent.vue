<script setup lang="ts">
import { onUpdated, ref } from 'vue'
import { IconComponent } from '..'

const showModal = ref<boolean>(false)

const props = defineProps({
  type: String,
  image: String,
  title: String,
  description: String,
  status: Boolean,
  author: String,
  edit: Boolean
})

function handleClick() {
  showModal.value = true
}

function close() {
  showModal.value = false
}

onUpdated(() => {
  console.log(showModal)
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
    <div @click="handleClick" data-cy="card-button">
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
    </div>
  </article>

  <dialog name="fade" v-if="showModal" class="modal" :open="showModal" data-cy="modal">
    <article>
      <div className="{style?.modal__close}">
        <button @click="close">&times;</button>
      </div>

      <h3 v-if="title">{{ title }}</h3>
    </article>
  </dialog>
</template>

<style src="./BookCard.scss" lang="scss" scoped />

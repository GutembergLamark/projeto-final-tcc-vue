<script setup>
import { ref, computed } from 'vue'
import { IconComponent } from '@/components/general'
import { FormSearchComponent } from '@/components/forms'
import { useRoute } from 'vue-router'

const active = ref('')

const props = defineProps({
  responsivity: String,
  suggestion: Array,
  payload: String
})

const route = useRoute()

const pathname = computed(function () {
  return route.path.replace('/', '')
})

active.value = pathname.value ?? 'dashboard'
</script>

<template>
  <FormSearchComponent v-if="props.responsivity === 'desktop'" :cached-books="suggestion" />
  <nav
    class="header__nav"
    :class="{
      'mobile-only': props.responsivity === 'mobile',
      'desktop-only': props.responsivity === 'desktop'
    }"
  >
    <RouterLink to="/dashboard" :data-active="active === 'dashboard' ? active : ''">
      <IconComponent type="dashboard" />
      <IconComponent type="dashboard_yellow" />
    </RouterLink>

    <RouterLink to="/library" :data-active="active === 'library' ? active : ''">
      <IconComponent type="book" />
      <IconComponent type="book_yellow" />
    </RouterLink>

    <RouterLink
      to="/bookmarks"
      v-if="payload?.email !== 'admin@email.com'"
      :data-active="active === 'bookmarks' ? active : ''"
    >
      <IconComponent type="bookmark" />
      <IconComponent type="bookmark_yellow" />
    </RouterLink>

    <RouterLink to="/profile" :data-active="active === 'profile' ? active : ''">
      <IconComponent type="profile" />
      <IconComponent type="profile_yellow" />
    </RouterLink>
  </nav>
</template>

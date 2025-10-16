<template>
  <component :is="components[layout]">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from "@/components/layout/layout/DefaultLayout.vue"
import AuthLayout from "@/components/layout/layout/AuthLayout.vue"
import ErrorLayout from "@/components/layout/layout/ErrorLayout.vue"

type LayoutKey =
  | 'DefaultLayout'
  | 'AuthLayout'
  | 'ErrorLayout'

const components: Record<LayoutKey, any> = {
  DefaultLayout,
  AuthLayout,
  ErrorLayout,
}

const route = useRoute()

const layout = computed<LayoutKey>(() => {
  return route.meta.layout
})
</script>

<style scoped></style>

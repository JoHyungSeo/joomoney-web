<template>
  <component :is="components[layout]">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

// 레이아웃 컴포넌트 import
import DefaultLayout from "@/components/layout/layout/DefaultLayout.vue"
import AuthLayout from "@/components/layout/layout/AuthLayout.vue"
import ErrorLayout from "@/components/layout/layout/ErrorLayout.vue"

// 레이아웃 이름 타입 정의
type LayoutKey =
  | 'DefaultLayout'
  | 'AuthLayout'
  | 'ErrorLayout'

// 컴포넌트 맵 타입
const components: Record<LayoutKey, any> = {
  DefaultLayout,
  AuthLayout,
  ErrorLayout,
}

const route = useRoute()

// meta.layout이 반드시 있어야 한다고 강제
const layout = computed<LayoutKey>(() => {
  return route.meta.layout
})

onMounted(() => {
  // mount 후 필요한 초기화 로직
})
</script>

<style scoped></style>

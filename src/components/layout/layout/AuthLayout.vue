<template>
<!-- 콘솔 홈 레이아웃 -->
  <main id="main">
    <div >
      <slot></slot> <!-- <router-view>를 받게 됨 -->
    </div>
    <Footer></Footer>
  </main>
</template>

<script setup lang="ts">
import Footer from '@/components/layout/footer/Footer.vue';
</script>

<style scoped></style>

<template>
  <DefaultHeader></DefaultHeader>
  <slot></slot>
  <DefaultFooter></DefaultFooter>
</template>

<script setup lang="ts">
import DefaultFooter from '@/components/layout/footer/DefaultFooter.vue'
import DefaultHeader from '../header/DefaultHeader.vue';
</script>

<style setup>
</style>

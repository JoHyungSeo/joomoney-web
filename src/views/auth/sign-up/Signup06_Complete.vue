<template>
  <main class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-wrap">
          <img src="/assets/images/logo/default-icon.svg"/>
        </div>

        <div class="complete-wrap">
          <img src="/assets/images/icons/complete.svg" class="complete-icon" />
          <div class="complete-title">{{ t("auth.signUp.complete.title") }}</div>
          <div class="complete-desc">
            {{ t("auth.signUp.complete.description") }}
          </div>
          <button class="complete-button">{{ t("auth.button.next") }}</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 필요하다면 emit이나 goPage("Home") 같은 동작 추가 가능
</script>

<style scoped>
</style>

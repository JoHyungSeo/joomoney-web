<template>
  <main class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-wrap">
          <img src="/assets/images/logo/default-icon.svg"/>
        </div>

        <div class="auth-title">
          {{ t("auth.signUp.name.title") }}
        </div>

        <form class="form" @submit.prevent="onSubmit">
          <!-- Name -->
          <div class="form-group">
            <label class="form-label">{{ t("auth.common.name") }}</label>
            <div class="input-wrap">
              <input
                type="text"
                id="name"
                name="name"
                :placeholder="t('auth.common.name')"
                v-model="name"
                maxlength="50"
                :class="{ 'input-error': nameError }"
                @focus="clearNameError"
                ref="nameInput"
              />
              <img
                v-if="name"
                src="/assets/images/icons/cancel.svg"
                class="icon-btn"
                @click="name = ''"
              />
            </div>
            <div v-if="nameError" class="error-msg">{{ t(nameError) }}</div>
          </div>

          <button class="form-button" type="submit">{{ t("auth.button.continue") }}</button>
        </form>
      </div>

      <button class="sub-link-button" @click="goPage('Login')">
        {{ t("auth.button.logIn") }}
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { goPage } from "@/modules/utils/util"
import { ref, onMounted } from "vue"
import { storeToRefs } from "pinia"
import useStore from "@/stores"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const store = useStore()

const { name } = storeToRefs(store.signup)
const nameInput = ref<HTMLInputElement | null>(null)
const nameError = ref("")

const validateName = () => {
  if (!name.value.trim()) {
    nameError.value = "auth.error.name.required"
  }
}

const clearNameError = () => {
  nameError.value = ""
}

const onSubmit = () => {
  validateName()

  if (!nameError.value) {
    store.signup.setName(name.value)

    console.log("🚀 회원가입 - 이름 입력:", store.signup.name)
    
    goPage("Signup02_Email")
  }
}

onMounted(() => {
  nameInput.value?.focus()
})
</script>

<style setup></style>

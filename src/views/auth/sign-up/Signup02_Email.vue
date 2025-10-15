<template>
  <main class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-wrap">
          <img src="/assets/images/logo/default-icon.svg"/>
        </div>

        <div class="auth-title">
          {{ t("auth.signUp.email.title") }}
        </div>

        <form class="form" @submit.prevent="onSubmit">
          <!-- Email -->
          <div class="form-group">
            <label class="form-label">{{ t("auth.common.email") }}</label>
            <div class="input-wrap">
              <input
                type="text"
                id="email"
                name="email"
                :placeholder="t('auth.common.email')"
                v-model="email"
                :class="{ 'input-error': emailError }"
                @focus="clearEmailError"
                ref="emailInput"
              />
              <img
                v-if="email"
                src="/assets/images/icons/cancel.svg"
                class="icon-btn"
                @click="email = ''"
              />
            </div>
            <div v-if="emailError" class="error-msg">{{ emailError }}</div>
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

const { email } = storeToRefs(store.signup)
const emailInput = ref<HTMLInputElement | null>(null)
const emailError = ref("")

// 이메일 검사
const validateEmail = () => {
  if (!email.value.trim()) {
    emailError.value = t("auth.error.email.required")
  } else if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.value)) {
    emailError.value = t("auth.error.email.invalid")
  }
}

// focus 시 에러 초기화
const clearEmailError = () => {
  emailError.value = ""
}

// Continue 버튼 클릭
const onSubmit = () => {
  validateEmail()

  if (!emailError.value) {
    // ✅ Pinia signup store에 값 저장
    store.signup.setEmail(email.value)
    console.log("🚀 회원가입 - 이메일 입력:", store.signup.email)
    goPage("Signup03_Password") // 다음 단계로 이동
  }
}

onMounted(() => {
  emailInput.value?.focus()  // 페이지 들어오자마자 자동 focus
})
</script>

<style setup></style>

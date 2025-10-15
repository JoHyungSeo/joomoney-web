<template>
  <main class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-wrap">
          <img src="@/assets/images/logo/default-icon.svg"/>
        </div>

        <div class="auth-title">
          {{ t("auth.logIn.title") }}
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

          <!-- Password -->
          <div class="form-group">
            <label class="form-label">{{ t("auth.common.password") }}</label>
            <div class="input-wrap">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                :placeholder="t('auth.common.password')"
                v-model="password"
                :class="{ 'input-error': passwordError }"
                @focus="clearPasswordError"
              />
              <img
                v-if="password"
                src="/assets/images/icons/cancel.svg"
                class="icon-btn icon-btn-left"
                @click="password = ''"
              />
              <img
                :src="showPassword ? '/assets/images/icons/eye.svg' : '/assets/images/icons/eye-off.svg'"
                class="icon-btn"
                @click="showPassword = !showPassword"
              />
            </div>
            <div v-if="passwordError" class="error-msg">{{ passwordError }}</div>
          </div>

          <button class="form-button" type="submit">{{ t("auth.button.login") }}</button>
        </form>

        <div class="divider">
          <span>or</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <button class="oauth-button">
            <img src="/assets/images/icons/google.svg"/>
            <span>{{ t("auth.logIn.continueWithGoogle") }}</span>
            <div></div>
          </button>

          <button class="oauth-button">
            <img src="/assets/images/icons/apple.svg"/>
            <span>{{ t("auth.logIn.continueWithApple") }}</span>
            <div></div>
          </button>

          <!-- <button class="oauth-button">
            <img src="/assets/images/icons/naver.svg"/>
            <span>Continue with Naver</span>
            <div></div>
          </button> -->

          <!-- <button class="oauth-talk-button">
            <img src="/assets/images/icons/kakao-talk.svg"/>
            <span>Continue with Kakao</span>
            <div></div>
          </button> -->
        </div>
      </div>

      <button class="sub-link-button" @click="goPage('Signup01_Name')">
        {{ t("auth.button.signUp") }}
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { goPage } from "@/modules/utils/util"
import { ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const email = ref("")
const password = ref("")
const showPassword = ref(false)

const emailError = ref("")
const passwordError = ref("")

// 이메일 검사
const validateEmail = () => {
  if (!email.value.trim()) {
    emailError.value = t("auth.error.email.required")
  } else if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.value)) {
    emailError.value = t("auth.error.email.invalid")
  }
}

// 패스워드 검사
const validatePassword = () => {
  if (!password.value.trim()) {
    passwordError.value = t("auth.error.password.required")
  }
}

// focus 시 에러 초기화
const clearEmailError = () => {
  emailError.value = ""
}
const clearPasswordError = () => {
  passwordError.value = ""
}

// 로그인 버튼 클릭
const onSubmit = () => {
  validateEmail()
  validatePassword()

  if (!emailError.value && !passwordError.value) {
    console.log("🚀 로그인 요청:", { email: email.value, password: password.value })
  }
}
</script>

<style scoped>
.oauth-button {
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #333B47;
  border-radius: 12px;
  /* box-sizing: border-box; */
  padding: 0 16px;
  color: #EAECEF;
  font-size: 16px;
  font-weight: 400;
}

</style>

<template>
  <main class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-wrap">
          <img src="/assets/images/logo/default-icon.svg"/>
        </div>

        <div class="auth-title">
          {{ t("auth.signUp.password.title") }}
        </div>

        <form class="form" @submit.prevent="onSubmit">
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
                ref="passwordInput"
              />
              <!-- X 버튼 -->
              <img
                v-if="password"
                src="/assets/images/icons/cancel.svg"
                class="icon-btn icon-btn-left"
                @click="password = ''"
              />
              <!-- Eye 버튼 -->
              <img
                :src="showPassword ? '/assets/images/icons/eye.svg' : '/assets/images/icons/eye-off.svg'"
                class="icon-btn"
                @click="showPassword = !showPassword"
              />
            </div>
            <div v-if="passwordError" class="error-msg">{{ t(passwordError) }}</div>
          </div>

          <!-- 규칙 표시 -->
          <div class="password-rules">
            <div
              v-for="rule in passwordRules"
              :key="rule.text"
              class="rule-item"
            >
              <img
                :src="rule.valid
                  ? '/assets/images/icons/check-circle-green.svg'
                  : '/assets/images/icons/check-circle.svg'"
                class="rule-icon"
              />
              <span class="rule-text">{{ rule.text }}</span>
            </div>
          </div>

          <button class="form-button" type="submit">{{ t("auth.button.next") }}</button>
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
import { ref, computed, onMounted } from "vue"
import { storeToRefs } from "pinia"
import useStore from "@/stores"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const store = useStore()

const { password } = storeToRefs(store.signup)
const passwordInput = ref<HTMLInputElement | null>(null)
const passwordError = ref("")
const showPassword = ref(false)

const hasLength = computed(() => password.value.length >= 8 && password.value.length <= 128)
const hasUpper = computed(() => /[A-Z]/.test(password.value))
const hasNumber = computed(() => /[0-9]/.test(password.value))
const hasSpecial = computed(() => /[!@#$%^&*(),.?":{}|<>_\-]/.test(password.value))

const passwordRules = computed(() => [
  { text: "auth.signUp.password.rules.length", valid: hasLength.value },
  { text: "auth.signUp.password.rules.upperCase", valid: hasUpper.value },
  { text: "auth.signUp.password.rules.number", valid: hasNumber.value },
  { text: "auth.signUp.password.rules.special", valid: hasSpecial.value },
])

const validatePassword = () => {
  if (!password.value.trim()) {
    passwordError.value = "auth.error.password.required"
  } else if (!hasLength.value || !hasUpper.value || !hasNumber.value || !hasSpecial.value) {
    passwordError.value = "auth.error.password.rule"
  }
}

const clearPasswordError = () => {
  passwordError.value = ""
}

const onSubmit = () => {
  validatePassword()

  if (!passwordError.value) {
    store.signup.setPassword(password.value)

    console.log("🚀 회원가입 - 패스워드 입력:", store.signup.password)
    
    goPage("Signup04_Birthday&Gender")
  }
}

onMounted(() => {
  passwordInput.value?.focus()
})
</script>

<style scoped>
.password-rules {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.rule-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.rule-text {
  font-size: 13px;
  font-weight: 400;
  color: #929AA5; /* 항상 회색 */
}

.rule-icon {
  width: 16px;
  height: 16px;
}
</style>

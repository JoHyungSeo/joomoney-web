<template>
  <main class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-wrap">
          <img src="/assets/images/logo/default-icon.svg"/>
        </div>

        <div class="auth-title">
          {{ t("auth.signUp.payday_currency.title") }}
        </div>

        <form class="form" @submit.prevent="onSubmit">
          <!-- Payday -->
          <div class="form-group">
            <label class="form-label">{{ t("auth.common.payday") }} {{ t("auth.common.optional") }}</label>
            <div class="input-wrap">
              <input
                type="text"
                id="payday"
                name="payday"
                v-model="payday"
                placeholder="DD"
                maxlength="2"
                class="day-input"
                @input="onPaydayInput"
                ref="paydayInput"
              />
            </div>
          </div>

          <!-- Currency -->
          <div class="form-group">
            <label class="form-label">{{ t("auth.common.currency") }}</label>
            <div class="custom-inputs">
              <div
                class="custom-select"
                ref="currencyRef"
                role="button"
                tabindex="0"
                aria-haspopup="listbox"
                :aria-expanded="isCurrencyOpen"
                :class="{ open: isCurrencyOpen }"
                @click="toggleCurrency"
                @keydown="onCurrencyKeydown"
              >
                <span class="select-label" :class="{ placeholder: !currency }">
                  {{ currency || 'Select currency' }}
                </span>
                <img
                  src="@/assets/images/icons/arrow-down.svg"
                  :class="{ rotated: isCurrencyOpen }"
                  alt=""
                  aria-hidden="true"
                />
                <ul v-if="isCurrencyOpen" class="options" role="listbox">
                  <li
                    v-for="opt in currencyOptions"
                    :key="opt.value"
                    role="option"
                    :aria-selected="currency === opt.value"
                    @click.stop="selectCurrency(opt.value)"
                  >
                    {{ opt.label }}
                  </li>
                </ul>
              </div>
            </div>
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
import { ref, onMounted, onBeforeUnmount } from "vue"
import { storeToRefs } from "pinia"
import useStore from "@/stores"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const store = useStore()
const { payday, currency } = storeToRefs(store.signup)

const paydayInput = ref<HTMLInputElement | null>(null)

const isCurrencyOpen = ref(false)
const currencyRef = ref<HTMLElement | null>(null)

// 입력시 숫자만 허용 & 1~31 사이 제한
const onPaydayInput = (e: Event) => {
  let v = (e.target as HTMLInputElement).value.replace(/\D/g, "")
  if (!v) {
    payday.value = ""
    return
  }
  let num = parseInt(v, 10)
  if (num < 1) num = 1
  if (num > 31) num = 31
  payday.value = String(num)
}

// 통화 옵션
const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "KRW", label: "KRW - Korean Won" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "JPY", label: "JPY - Japanese Yen" }
]

const toggleCurrency = () => { isCurrencyOpen.value = !isCurrencyOpen.value }
const selectCurrency = (val: string) => {
  currency.value = val
  isCurrencyOpen.value = false
}
const handleClickOutsideCurrency = (e: MouseEvent) => {
  if (currencyRef.value && !currencyRef.value.contains(e.target as Node)) {
    isCurrencyOpen.value = false
  }
}

onMounted(() => document.addEventListener("click", handleClickOutsideCurrency))
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutsideCurrency))

// 화살표 키 지원
const onCurrencyKeydown = (e: KeyboardEvent) => {
  if (e.key === "ArrowDown") { isCurrencyOpen.value = true; e.preventDefault() }
  if (e.key === "Enter" || e.key === "Escape") { isCurrencyOpen.value = false }
}

// Continue 버튼 클릭
const onSubmit = () => {
  // ✅ Pinia store에 저장
  store.signup.setPayday(payday.value)
  store.signup.setCurrency(currency.value)

  console.log("🚀 회원가입 - 월급날/통화:", {
    payday: store.signup.payday,
    currency: store.signup.currency,
  })

  goPage("Signup06_Complete") // 다음 단계로 이동
}

onMounted(() => {
  paydayInput.value?.focus() // 페이지 들어오자마자 자동 focus
})
</script>

<style setup>
</style>

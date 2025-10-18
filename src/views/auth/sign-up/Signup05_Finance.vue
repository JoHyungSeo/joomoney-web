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
                ref="currencyInput"
                role="button"
                tabindex="0"
                aria-haspopup="listbox"
                :aria-expanded="isCurrencyOpen"
                :class="{ open: isCurrencyOpen }"
                @click="toggleCurrency"
                @keydown="onCurrencyKeydown"
              >
                <span class="select-label" :class="{ placeholder: !currency }">
                  {{ currency || 'Select Currency' }}
                </span>
                <img
                  src="@/assets/images/icons/arrow-down.svg"
                  :class="{ rotated: isCurrencyOpen }"
                  alt=""
                  aria-hidden="true"
                />
                <ul v-if="isCurrencyOpen" class="options" role="listbox">
                  <li
                    v-for="option in currencyOptions"
                    :key="option.code"
                    role="option"
                    :aria-selected="currency === option.code"
                    @click.stop="selectCurrency(option.code)"
                  >
                    {{ option.code }} - {{ option.codeName }}
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
import useApi from "@/modules/api"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const store = useStore()
const api = useApi()

const { payday, currency } = storeToRefs(store.signup)
const paydayInput = ref<HTMLInputElement | null>(null)
const currencyInput = ref<HTMLElement | null>(null)
const isCurrencyOpen = ref(false)

const currencyOptions = ref<{ code: string, codeName: string }[]>([])

const loadCurrencyOptions = async () => {
  try {
    const res = await api.common.getCommonCodes("CURRENCY_TYPE")

    if (res?.data?.codes) {
      currencyOptions.value = res.data.codes
    }
  } catch (e) {
    console.error("[Currency] Failed to load:", e)
  }
}

const onPaydayInput = (e: Event) => {
  let day = (e.target as HTMLInputElement).value.replace(/\D/g, "")

  if (!day) {
    payday.value = ""
    return
  }

  let dayNumber = parseInt(day, 10)

  if (dayNumber < 1) dayNumber = 1
  if (dayNumber > 31) dayNumber = 31

  payday.value = String(dayNumber)
}

const toggleCurrency = () => {
  isCurrencyOpen.value = !isCurrencyOpen.value
}

const selectCurrency = (selectedCurrency: string) => {
  currency.value = selectedCurrency
  isCurrencyOpen.value = false
}

const handleClickOutsideCurrency = (e: MouseEvent) => {
  if (currencyInput.value && !currencyInput.value.contains(e.target as Node)) {
    isCurrencyOpen.value = false
  }
}
const onCurrencyKeydown = (e: KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    isCurrencyOpen.value = true
    e.preventDefault()
  }

  if (e.key === "Enter" || e.key === "Escape") {
    isCurrencyOpen.value = false
  }
}

const onSubmit = () => {
  store.signup.setPayday(payday.value)
  store.signup.setCurrency(currency.value)

  console.log("🚀 회원가입 - 월급날:", payday.value)
  console.log("🚀 회원가입 - 통화:", currency.value)

  goPage("Signup06_Complete")
}

onMounted(() => {
  loadCurrencyOptions()
  paydayInput.value?.focus()
  document.addEventListener("click", handleClickOutsideCurrency)
})

onBeforeUnmount(() => document.removeEventListener("click", handleClickOutsideCurrency))
</script>

<style setup>
</style>

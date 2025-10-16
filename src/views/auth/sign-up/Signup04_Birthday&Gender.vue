<template>
  <main class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo-wrap">
          <img src="/assets/images/logo/default-icon.svg"/>
        </div>

        <div class="auth-title">
          {{ t("auth.signUp.birthday_gender.title") }}
        </div>

        <form class="form" @submit.prevent="onSubmit">
          <!-- Birthday -->
          <div class="form-group">
            <label class="form-label">{{ t("auth.common.birthday") }} {{ t("auth.common.optional") }}</label>

            <div class="custom-inputs">
              <!-- Year -->
              <input
                type="text"
                v-model="birthdayYear"
                placeholder="YYYY"
                maxlength="4"
                class="year-input"
                :class="{ error: yearError }"
                @input="onYearInput"
                @focus="clearErrors"
              />

              <!-- Month -->
              <div
                class="custom-select"
                ref="monthRef"
                role="button"
                tabindex="0"
                aria-haspopup="listbox"
                :aria-expanded="isMonthOpen"
                :class="{ open: isMonthOpen, error: monthError }"
                @click="toggleMonth"
                @keydown="onMonthKeydown"
                @focus="clearErrors"
              >
                <span class="select-label" :class="{ placeholder: !birthdayMonth }">
                  {{ birthdayMonth || 'MM' }}
                </span>
                <img
                  src="@/assets/images/icons/arrow-down.svg"
                  :class="{ rotated: isMonthOpen }"
                  alt=""
                  aria-hidden="true"
                />
                <ul v-if="isMonthOpen" class="options" role="listbox">
                  <li
                    role="option"
                    :aria-selected="!birthdayMonth"
                    @click.stop="clearMonth"
                  >
                    .
                  </li>
                  <li
                    v-for="n in 12"
                    :key="n"
                    role="option"
                    :aria-selected="birthdayMonth === String(n)"
                    @click.stop="selectMonth(n)"
                  >
                    {{ n }}
                  </li>
                </ul>
              </div>

              <!-- Day -->
              <input
                type="text"
                v-model="birthdayDay"
                placeholder="DD"
                maxlength="2"
                class="day-input"
                :class="{ error: dayError }"
                @input="onDayInput"
                @focus="clearErrors"
              />
            </div>
            <div v-if="birthdayError" class="error-msg">{{ birthdayError }}</div>
          </div>

          <!-- Gender -->
          <div class="form-group">
            <label class="form-label">{{ t("auth.common.gender") }} {{ t("auth.common.optional") }}</label>
            <div class="gender-pill">
              <div class="pill-indicator" :style="indicatorStyle" v-if="gender"></div>
              <button
                v-for="option in genderOptions"
                :key="option.value"
                type="button"
                class="pill-option"
                :class="{ active: gender === option.value }"
                @click="gender = (gender === option.value ? '' : option.value)"
              >
                {{ option.label }}
              </button>
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import { storeToRefs } from "pinia"
import useStore from "@/stores"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const store = useStore()
const {
  birthdayYear,
  birthdayMonth,
  birthdayDay,
  gender
} = storeToRefs(store.signup)

const isMonthOpen = ref(false)
const monthRef = ref<HTMLElement | null>(null)

const yearError = ref(false)
const monthError = ref(false)
const dayError = ref(false)
const birthdayError = ref("")

const genderOptions = [
  { value: "male", label: t("auth.signUp.birthday_gender.male") },
  { value: "female", label: t("auth.signUp.birthday_gender.female") },
  { value: "other", label: t("auth.signUp.birthday_gender.other") }
]

const indicatorStyle = computed(() => {
  const idx = genderOptions.findIndex(o => o.value === gender.value)
  if (idx === -1) return {}
  return { transform: `translateX(${idx * 100}%)` }
})

const clearErrors = () => {
  birthdayError.value = ""
  yearError.value = false
  monthError.value = false
  dayError.value = false
}

const onYearInput = (e: Event) => {
  let v = (e.target as HTMLInputElement).value.replace(/\D/g, "")
  if (v.length > 4) v = v.slice(0, 4)
  birthdayYear.value = v
}

const onDayInput = (e: Event) => {
  let v = (e.target as HTMLInputElement).value.replace(/\D/g, "")
  if (!v) { birthdayDay.value = ""; return }
  let num = parseInt(v, 10)
  if (num < 1) num = 1
  if (num > 31) num = 31
  birthdayDay.value = String(num)
}

const clearMonth = () => {
  birthdayMonth.value = ""
  isMonthOpen.value = false
}

const toggleMonth = () => { isMonthOpen.value = !isMonthOpen.value }
const selectMonth = (n: number) => {
  birthdayMonth.value = String(n)
  isMonthOpen.value = false
}
const handleClickOutside = (e: MouseEvent) => {
  if (monthRef.value && !monthRef.value.contains(e.target as Node)) {
    isMonthOpen.value = false
  }
}
onMounted(() => document.addEventListener("click", handleClickOutside))
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside))

let inputBuffer = ""
const onMonthKeydown = (e: KeyboardEvent) => {
  if (e.key >= "0" && e.key <= "9") {
    inputBuffer += e.key
    if (inputBuffer === "0") { inputBuffer = ""; return }
    const num = parseInt(inputBuffer, 10)
    if (num >= 1 && num <= 12) {
      birthdayMonth.value = String(num)
      if (num < 10) setTimeout(() => { inputBuffer = "" }, 1000)
      else inputBuffer = ""
    } else {
      inputBuffer = e.key
    }
  }
  if (e.key === "ArrowDown") { isMonthOpen.value = true; e.preventDefault() }
  if (e.key === "Enter" || e.key === "Escape") { isMonthOpen.value = false }
}

const validateBirthday = (): boolean => {
  yearError.value = false
  monthError.value = false
  dayError.value = false
  birthdayError.value = ""

  const y = birthdayYear.value.trim()
  const m = birthdayMonth.value.trim()
  const d = birthdayDay.value.trim()

  if (!y && !m && !d) return true

  if ((!y && (m || d)) || (!m && (y || d)) || (!d && (y || m))) {
    birthdayError.value = t("auth.error.birthday.required")
    if (!y) yearError.value = true
    if (!m) monthError.value = true
    if (!d) dayError.value = true
    return false
  }

  const yy = parseInt(y, 10)
  const mm = parseInt(m, 10)
  const dd = parseInt(d, 10)

  const inputDate = new Date(yy, mm - 1, dd)
  const today = new Date()

  if (
    isNaN(inputDate.getTime()) ||
    inputDate.getFullYear() !== yy ||
    inputDate.getMonth() !== mm - 1 ||
    inputDate.getDate() !== dd
  ) {
    birthdayError.value = t("auth.error.birthday.invalid")
    yearError.value = monthError.value = dayError.value = true
    return false
  }

  if (inputDate > today) {
    birthdayError.value = t("auth.error.birthday.rule")
    yearError.value = monthError.value = dayError.value = true
    return false
  }

  return true
}

const onSubmit = () => {
  if (!validateBirthday()) return
  console.log("🚀 회원가입 - 생일/성별:", {
    year: birthdayYear.value,
    month: birthdayMonth.value,
    day: birthdayDay.value,
    gender: gender.value,
  })
  goPage("Signup05_Finance")
}
</script>

<style scoped>
</style>

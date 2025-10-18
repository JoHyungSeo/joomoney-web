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
                ref="monthInput"
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
            <div v-if="birthdayError" class="error-msg">{{ t(birthdayError) }}</div>
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
                {{ t(option.label) }}
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

const { birthdayYear, birthdayMonth, birthdayDay, gender } = storeToRefs(store.signup)
const monthInput = ref<HTMLElement | null>(null)
const isMonthOpen = ref(false)

const yearError = ref(false)
const monthError = ref(false)
const dayError = ref(false)
const birthdayError = ref("")

const genderOptions = [
  { value: "male", label: "auth.signUp.birthday_gender.male" },
  { value: "female", label: "auth.signUp.birthday_gender.female" },
  { value: "other", label: "auth.signUp.birthday_gender.other" }
]

const indicatorStyle = computed(() => {
  const idx = genderOptions.findIndex(genderOption => genderOption.value === gender.value)

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
  let year = (e.target as HTMLInputElement).value.replace(/\D/g, "")

  if (year.length > 4) {
    year = year.slice(0, 4)
  }

  birthdayYear.value = year
}

const onDayInput = (e: Event) => {
  let day = (e.target as HTMLInputElement).value.replace(/\D/g, "")

  if (!day) {
    birthdayDay.value = ""
    return
  }

  let dayNumber = parseInt(day, 10)

  if (dayNumber < 1) dayNumber = 1
  if (dayNumber > 31) dayNumber = 31

  birthdayDay.value = String(dayNumber)
}

const clearMonth = () => {
  birthdayMonth.value = ""
  isMonthOpen.value = false
}

const toggleMonth = () => {
  isMonthOpen.value = !isMonthOpen.value
}

const selectMonth = (selectedMonth: number) => {
  birthdayMonth.value = String(selectedMonth)
  isMonthOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  if (monthInput.value && !monthInput.value.contains(e.target as Node)) {
    isMonthOpen.value = false
  }
}

let inputBuffer = ""
const onMonthKeydown = (e: KeyboardEvent) => {
  if (e.key >= "0" && e.key <= "9") {
    inputBuffer += e.key

    if (inputBuffer === "0") {
      inputBuffer = ""
      return
    }

    const inputBufferNumber = parseInt(inputBuffer, 10)

    if (inputBufferNumber >= 1 && inputBufferNumber <= 12) {
      birthdayMonth.value = String(inputBufferNumber)

      if (inputBufferNumber < 10) {
        setTimeout(() => {
          inputBuffer = ""
        }, 1000)
      }
      else {
        inputBuffer = ""
      }
    } else {
      inputBuffer = e.key
    }
  }
  
  if (e.key === "ArrowDown") {
    isMonthOpen.value = true
    e.preventDefault()
  }

  if (e.key === "Enter" || e.key === "Escape") {
    isMonthOpen.value = false
  }
}

const validateBirthday = (): boolean => {
  yearError.value = false
  monthError.value = false
  dayError.value = false
  birthdayError.value = ""

  const year = birthdayYear.value.trim()
  const month = birthdayMonth.value.trim()
  const day = birthdayDay.value.trim()

  if (!year && !month && !day) return true

  if ((!year && (month || day)) || (!month && (year || day)) || (!day && (year || month))) {
    birthdayError.value = "auth.error.birthday.required"

    if (!year) yearError.value = true
    if (!month) monthError.value = true
    if (!day) dayError.value = true

    return false
  }

  const yearNumber = parseInt(year, 10)
  const monthNumber = parseInt(month, 10)
  const dayNumber = parseInt(day, 10)

  const inputDate = new Date(yearNumber, monthNumber - 1, dayNumber)
  const today = new Date()

  if (isNaN(inputDate.getTime()) || inputDate.getFullYear() !== yearNumber || inputDate.getMonth() !== monthNumber - 1 || inputDate.getDate() !== dayNumber) {
    birthdayError.value = "auth.error.birthday.invalid"
    yearError.value = monthError.value = dayError.value = true

    return false
  }

  if (inputDate > today) {
    birthdayError.value = "auth.error.birthday.rule"
    yearError.value = monthError.value = dayError.value = true

    return false
  }

  return true
}

const onSubmit = () => {
  if (!validateBirthday()) return

  console.log("🚀 회원가입 - 생일:", birthdayYear.value + "-" + birthdayMonth.value + "-" + birthdayDay.value )
  console.log("🚀 회원가입 - 성별:", gender.value)

  goPage("Signup05_Finance")
}

onMounted(() => document.addEventListener("click", handleClickOutside))

onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside))
</script>

<style scoped>
</style>

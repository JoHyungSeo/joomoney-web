import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useSignupStore = defineStore("signup", () => {
  // 기본 정보
  const name = ref("")
  const email = ref("")
  const password = ref("")

  // 추가 정보 (year/month/day로 분리)
  const birthdayYear = ref("")
  const birthdayMonth = ref("")
  const birthdayDay = ref("")
  const gender = ref("")         // "male" | "female" | "other"
  const payday = ref("")         // 월급날 (예: "25")
  const currency = ref("USD")    // 통화 종류 기본값 USD

  // Getter: YYYY-MM-DD 문자열로 조합
  const birthdayFormatted = computed(() => {
    if (!birthdayYear.value || !birthdayMonth.value || !birthdayDay.value) return ""
    return `${birthdayYear.value}-${String(birthdayMonth.value).padStart(2, "0")}-${String(birthdayDay.value).padStart(2, "0")}`
  })

  // Setter
  const setName = (val: string) => (name.value = val)
  const setEmail = (val: string) => (email.value = val)
  const setPassword = (val: string) => (password.value = val)

  const setBirthdayYear = (val: string) => (birthdayYear.value = val)
  const setBirthdayMonth = (val: string) => (birthdayMonth.value = val)
  const setBirthdayDay = (val: string) => (birthdayDay.value = val)

  const setGender = (val: string) => (gender.value = val)
  const setPayday = (val: string) => (payday.value = val)
  const setCurrency = (val: string) => (currency.value = val)

  // Reset
  const reset = () => {
    name.value = ""
    email.value = ""
    password.value = ""
    birthdayYear.value = ""
    birthdayMonth.value = ""
    birthdayDay.value = ""
    gender.value = ""
    payday.value = ""
    currency.value = "USD"
  }

  return {
    // state
    name, email, password,
    birthdayYear, birthdayMonth, birthdayDay,
    gender, payday, currency,

    // getter
    birthdayFormatted,

    // setter
    setName, setEmail, setPassword,
    setBirthdayYear, setBirthdayMonth, setBirthdayDay,
    setGender, setPayday, setCurrency,

    // reset
    reset
  }
})

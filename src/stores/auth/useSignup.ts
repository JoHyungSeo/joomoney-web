import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useSignupStore = defineStore("signup", () => {
  const name = ref("")
  const email = ref("")
  const password = ref("")

  const birthdayYear = ref("")
  const birthdayMonth = ref("")
  const birthdayDay = ref("")
  const gender = ref("")
  const payday = ref("")
  const currency = ref("USD")

  const birthdayFormatted = computed(() => {
    if (!birthdayYear.value || !birthdayMonth.value || !birthdayDay.value) return ""
    return `${birthdayYear.value}-${String(birthdayMonth.value).padStart(2, "0")}-${String(birthdayDay.value).padStart(2, "0")}`
  })

  const setName = (val: string) => (name.value = val)
  const setEmail = (val: string) => (email.value = val)
  const setPassword = (val: string) => (password.value = val)

  const setBirthdayYear = (val: string) => (birthdayYear.value = val)
  const setBirthdayMonth = (val: string) => (birthdayMonth.value = val)
  const setBirthdayDay = (val: string) => (birthdayDay.value = val)

  const setGender = (val: string) => (gender.value = val)
  const setPayday = (val: string) => (payday.value = val)
  const setCurrency = (val: string) => (currency.value = val)

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
    name, email, password,
    birthdayYear, birthdayMonth, birthdayDay,
    gender, payday, currency,

    birthdayFormatted,

    setName, setEmail, setPassword,
    setBirthdayYear, setBirthdayMonth, setBirthdayDay,
    setGender, setPayday, setCurrency,

    reset
  }
})

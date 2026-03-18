import { defineStore } from "pinia"
import { EMAIL_VERIFICATION_TYPE } from "@/constants"
import { ref, computed } from "vue"
import useStore from ".."
import useApi from "@/modules/api"

export const useSignupStore = defineStore("signup", () => {
  const store = useStore()
  const api = useApi()
  const userId = ref("")
  const name = ref("")
  const email = ref("")
  const verificationToken = ref("")
  const password = ref("")

  const birthdayYear = ref("")
  const birthdayMonth = ref("")
  const birthdayDay = ref("")
  const gender = ref("")

  const agreePolicyYn = ref(false)

  const birthdayFormatted = computed(() => {
    if (!birthdayYear.value || !birthdayMonth.value || !birthdayDay.value) return ""
    return `${birthdayYear.value}-${String(birthdayMonth.value).padStart(2, "0")}-${String(birthdayDay.value).padStart(2, "0")}`
  })

  const setUserId = (val: string) => (userId.value = val)
  const setName = (val: string) => (name.value = val)
  const setEmail = (val: string) => (email.value = val)
  const setVerificationToken = (val: string) => (verificationToken.value = val)
  const setPassword = (val: string) => (password.value = val)

  const setBirthdayYear = (val: string) => (birthdayYear.value = val)
  const setBirthdayMonth = (val: string) => (birthdayMonth.value = val)
  const setBirthdayDay = (val: string) => (birthdayDay.value = val)

  const setGender = (val: string) => (gender.value = val)

  const setAgreePolicyYn = (val: boolean) => (agreePolicyYn.value = val)

  // 아이디 중복 체크
  const checkDuplicateUserId = async () => {
    try {
      const res = await api.auth.checkDuplicateUserId({ target: userId.value })
      return { success: true, isDuplicate: res.data.isDuplicate }
    } catch (error) {
      return { success: false, error }
    }
  }

  // 이메일 인증 요청
  const emailVerificationRequest = async () => {
    try {
      await api.auth.emailVerificationRequest({
        email: email.value,
        type: EMAIL_VERIFICATION_TYPE.SIGN_UP,
        language: store.language.getCurrentLanguage()
      })
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  // 이메일 인증 코드 검증
  const emailVerificationValidate = async (code: string) => {
    try {
      const res = await api.auth.emailVerificationValidate({
        email: email.value,
        type: EMAIL_VERIFICATION_TYPE.SIGN_UP,
        code
      })
      verificationToken.value = res.data.verificationToken
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  // 회원가입
  const signUp = async () => {
    try {
      const params = {
        userId: userId.value,
        name: name.value,
        email: email.value,
        verificationToken: verificationToken.value,
        password: password.value,
        birthday: birthdayFormatted.value || null,
        gender: gender.value || null,
        agreePolicyYn: agreePolicyYn.value,
        userConfiguration: {
          language: store.language.currentLanguage,
          theme: store.theme.currentTheme
        },
        deviceInformation: store.auth.getDeviceInfo()
      }

      const res = await api.auth.signUp(params)
      const responseData = res.data

      // 회원가입 후 자동 로그인 처리
      store.auth.setUser(responseData.userInformation)
      store.auth.setUserConfig(responseData.userInformation.userConfiguration)
      store.auth.setTokens(responseData.accessToken, responseData.refreshToken)
      store.language.setLanguage(responseData.userInformation.userConfiguration.language)
      store.theme.setThemeFromServer(responseData.userInformation.userConfiguration.theme)

      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const reset = () => {
    userId.value = ""
    name.value = ""
    email.value = ""
    verificationToken.value = ""
    password.value = ""
    birthdayYear.value = ""
    birthdayMonth.value = ""
    birthdayDay.value = ""
    gender.value = ""
    agreePolicyYn.value = false
  }

  return {
    userId, name, email, verificationToken, password,
    birthdayYear, birthdayMonth, birthdayDay,
    gender, agreePolicyYn,

    birthdayFormatted,

    setUserId, setName, setEmail, setVerificationToken, setPassword,
    setBirthdayYear, setBirthdayMonth, setBirthdayDay,
    setGender, setAgreePolicyYn,

    checkDuplicateUserId,
    emailVerificationRequest,
    emailVerificationValidate,
    signUp,
    reset
  }
})

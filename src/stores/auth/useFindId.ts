import { defineStore } from "pinia"
import { EMAIL_VERIFICATION_TYPE } from "@/constants"
import { ref } from "vue"
import useStore from "@/stores"
import useApi from "@/modules/api"

export const useFindIdStore = defineStore("findId", () => {
  const store = useStore()
  const api = useApi()

  const email = ref("")
  const foundUserId = ref("")
  const verificationToken = ref("")

  const setEmail = (val: string) => (email.value = val)
  const setFoundUserId = (val: string) => (foundUserId.value = val)

  // 이메일 인증 요청 (재전송)
  const emailVerificationRequest = async () => {
    try {
      await api.auth.emailVerificationRequest({
        email: email.value,
        type: EMAIL_VERIFICATION_TYPE.IDENTITY_VERIFICATION,
        language: store.language.getCurrentLanguage()
      })
      return { success: true }
    } catch (error) {
      console.log("[FindId] Failed to request email verification: ", error)
      return { success: false, error }
    }
  }

  // 이메일 인증 코드 검증
  const emailVerificationValidate = async (code: string) => {
    try {
      const res = await api.auth.emailVerificationValidate({
        email: email.value,
        type: EMAIL_VERIFICATION_TYPE.IDENTITY_VERIFICATION,
        code
      })
      verificationToken.value = res.data.verificationToken
      return { success: true }
    } catch (error) {
      console.log("[FindId] Failed to validate email verification: ", error)
      return { success: false, error }
    }
  }

  // 아이디 찾기
  const findUserId = async () => {
    try {
      const res = await api.auth.findUserId({
        email: email.value,
        verificationToken: verificationToken.value
      })
      foundUserId.value = res.data.userId
      return { success: true }
    } catch (error) {
      console.log("[FindId] Failed to find user ID: ", error)
      return { success: false, error }
    }
  }

  const reset = () => {
    email.value = ""
    foundUserId.value = ""
    verificationToken.value = ""
  }

  return {
    email,
    foundUserId,
    verificationToken,

    setEmail,
    setFoundUserId,

    emailVerificationRequest,
    emailVerificationValidate,
    findUserId,
    reset
  }
})
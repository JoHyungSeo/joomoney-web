import { defineStore } from "pinia"
import { ref } from "vue"
import useStore from "@/stores"
import useApi from "@/modules/api"

export const useResetPasswordStore = defineStore("resetPassword", () => {
  const store = useStore()
  const api = useApi()

  const userId = ref("")
  const maskedEmail = ref("")
  const verificationToken = ref("")
  const newPassword = ref("")

  const setUserId = (val: string) => (userId.value = val)
  const setMaskedEmail = (val: string) => (maskedEmail.value = val)
  const setNewPassword = (val: string) => (newPassword.value = val)

  // 비밀번호 재설정 요청 (재전송)
  const passwordResetRequest = async () => {
    try {
      await api.auth.passwordResetRequest({
        userId: userId.value,
        language: store.language.getCurrentLanguage()
      })
      return { success: true }
    } catch (error) {
      console.log("[ResetPassword] Failed to request password reset: ", error)
      return { success: false, error }
    }
  }

  // 비밀번호 재설정 인증 코드 검증
  const passwordResetValidate = async (code: string) => {
    try {
      const res = await api.auth.passwordResetValidate({
        userId: userId.value,
        code
      })
      verificationToken.value = res.data.verificationToken
      return { success: true }
    } catch (error) {
      console.log("[ResetPassword] Failed to validate password reset: ", error)
      return { success: false, error }
    }
  }

  // 비밀번호 재설정
  const passwordReset = async () => {
    try {
      await api.auth.passwordReset({
        userId: userId.value,
        newPassword: newPassword.value,
        verificationToken: verificationToken.value
      })
      return { success: true }
    } catch (error) {
      console.log("[ResetPassword] Failed to reset password: ", error)
      return { success: false, error }
    }
  }

  const reset = () => {
    userId.value = ""
    maskedEmail.value = ""
    verificationToken.value = ""
    newPassword.value = ""
  }

  return {
    userId,
    maskedEmail,
    verificationToken,
    newPassword,

    setUserId,
    setMaskedEmail,
    setNewPassword,

    passwordResetRequest,
    passwordResetValidate,
    passwordReset,
    reset
  }
})
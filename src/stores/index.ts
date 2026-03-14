import { useAuthStore } from "./auth/useAuth"
import { useSignupStore } from "./auth/useSignup"
import { useResetPasswordStore } from "./auth/useResetPassword"
import { useFindIdStore } from "./auth/useFindId"
import { useLanguageStore } from "./language/useLanguage"
import { useThemeStore } from "./theme/useTheme"

const useStore = () => ({
  auth: useAuthStore(),
  signup: useSignupStore(),
  resetPassword: useResetPasswordStore(),
  findId: useFindIdStore(),
  language: useLanguageStore(),
  theme: useThemeStore(),
})


export default useStore

/* 회원정보, 계정추가 관리 */
import { useAuthStore } from "./auth/useAuth"
import { useSignupStore } from "./auth/useSignup"
import { useLanguageStore } from "./language/useLanguage";

const useStore = () => ({
  auth: useAuthStore(),
  signup: useSignupStore(),
  language: useLanguageStore(),
});


export default useStore;

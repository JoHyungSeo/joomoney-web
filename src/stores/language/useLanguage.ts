import { defineStore } from "pinia"
import { ref } from "vue"
import useApi from "@/modules/api"
import i18n, { getSupportedLanguages } from "@/modules/i18n"

export const useLanguageStore = defineStore("language", () => {
  const api = useApi()

  // i18n에서 export한 함수 사용 (중복 제거)
  const getCurrentLanguage = (): string => {
    // i18n.global.locale에서 현재 언어 가져오기
    return i18n.global.locale.value as string
  }

  const getAllLanguages = async () => {
    try {
      const res = await api.common.getCommonCodes("LANGUAGE_TYPE")
      return res.data.codes
    } catch (error) {
      console.log(error)
    }
  }

  const supportedLanguages = ref(getSupportedLanguages())
  const currentLanguage = ref(getCurrentLanguage())
  const allLanguages = ref<{ code: string; codeName: string }[]>([])

  const setLanguage = (language: string) => {
    if (!supportedLanguages.value.includes(language)) { language = "en" }

    currentLanguage.value = language

    i18n.global.locale.value = language as any

    localStorage.setItem("language", language)

    document.documentElement.lang = language
  }

  ;(async () => {
    allLanguages.value = await getAllLanguages()
  })()

  return {
    supportedLanguages,
    currentLanguage,
    allLanguages,
    getSupportedLanguages,
    getCurrentLanguage,
    getAllLanguages,
    setLanguage,
  }
})

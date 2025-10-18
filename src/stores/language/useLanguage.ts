import { defineStore } from "pinia"
import { ref } from "vue"
import useApi from "@/modules/api"
import i18n from "@/modules/i18n";

export const useLanguageStore = defineStore("language", () => {
  const api = useApi();

  const getSupportedLanguages = (): readonly string[] => {
    return Object.freeze(
      Object.keys(import.meta.glob("@/modules/i18n/locales/*.{ts,js}"))
        .map((file) => file.match(/\/locales\/([A-Za-z-]+)\.(?:ts|js)$/)?.[1])
        .filter((file): file is string => !!file)
        .sort()
    )
  }

  const getCurrentLanguage = (): string => {
    const localLanguage = localStorage.getItem("language")
    const browserLanguage = navigator.language.toLowerCase().split(/[-_]/).shift() as string
    const language = localLanguage || browserLanguage

    if (getSupportedLanguages().includes(language)) { return language }
    
    return "en"
  }

  const getAllLanguages = async () => {
    try {
      const res = await api.common.getCommonCodes("LANGUAGE_TYPE")
      return res.data.codes
    } catch (e) {
      console.error("[i18n] Failed to get allLanguages : ", e)
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
});

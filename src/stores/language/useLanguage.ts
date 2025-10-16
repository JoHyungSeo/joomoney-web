import { defineStore } from "pinia"
import { ref, watch } from "vue"
import useApi from "@/modules/api"

const api = useApi()

// locales 폴더에서 지원 언어 자동 수집 (ko.ts, en.ts, fr.ts 등)
const getSupportedLanguages = (): readonly string[] => {
  return Object.freeze(
    Object.keys(import.meta.glob("@/modules/i18n/locales/*.{ts,js}"))
      .map((p) => p.match(/\/locales\/([A-Za-z-]+)\.(?:ts|js)$/)?.[1])
      .filter((v): v is string => !!v)
      .sort()
  )
}

// 현재 언어 감지
const getCurrentLanguage = (): string => {
  const localLanguage = localStorage.getItem("language") as string
  const browserLanguage = navigator.language.toLowerCase() as string
  const language = (localLanguage || browserLanguage).split(/[-_]/).shift() as string

  if (getSupportedLanguages().includes(language)) { return language }

  return "en"
}

// 서버에서 언어 코드 목록 가져오기
const getAllLanguages = async () => {
  try {
    const res = await api.common.getCommonCodes("LANGUAGE_TYPE")
    return res.data.codes ?? []
  } catch (e) {
    console.error("[i18n] Failed to get allLanguages : ", e)
  }
}

export const useLanguageStore = defineStore("language", () => {
  console.log("[i18n] supportedLanguages : ", getSupportedLanguages())
  console.log("[i18n] currentLanguage : ", getCurrentLanguage())
  console.log("[i18n] getAllLanguages : ", getAllLanguages())
});

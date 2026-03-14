import { createI18n } from "vue-i18n"
import ko from "./locales/ko"
import en from "./locales/en"

// 지원하는 언어 목록 조회
export const getSupportedLanguages = (): readonly string[] => {
  return Object.freeze(
    Object.keys(import.meta.glob("@/modules/i18n/locales/*.{ts,js}"))
      .map((file) => file.match(/\/locales\/([A-Za-z-]+)\.(?:ts|js)$/)?.[1])
      .filter((file): file is string => !!file)
      .sort()
  )
}

// 초기 언어 결정 (pinia 없이 독립적으로 작동)
const getInitialLanguage = (): string => {
  // 1. localStorage에 저장된 언어 확인
  const storedLanguage = localStorage.getItem("language")
  if (storedLanguage && getSupportedLanguages().includes(storedLanguage)) {
    return storedLanguage
  }

  // 2. 브라우저 언어 확인
  const browserLanguage = navigator.language.toLowerCase().split(/[-_]/)[0] || "en"
  if (getSupportedLanguages().includes(browserLanguage)) {
    localStorage.setItem("language", browserLanguage)
    return browserLanguage
  }

  // 3. 기본값
  return "en"
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLanguage(),
  fallbackLocale: "en",
  messages: {
    en,
    ko,
  },
  missingWarn: false,
  fallbackWarn: false
})

export default i18n

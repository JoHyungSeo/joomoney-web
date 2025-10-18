import { createI18n } from "vue-i18n"
import ko from "./locales/ko"
import en from "./locales/en"

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

const i18n = createI18n({
  legacy: false,
  locale: getCurrentLanguage(),
  fallbackLocale: "en",
  messages: {
    en,
    ko,
  },
  missingWarn: false,
  fallbackWarn: false,
})

export default i18n

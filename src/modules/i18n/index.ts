// modules/i18n/index.ts
import { createI18n } from "vue-i18n";
import ko from "./locales/ko";
import en from "./locales/en";

const savedLang = localStorage.getItem("language");
const defaultLang = savedLang && ["ko", "en"].includes(savedLang) ? savedLang : "en";

const i18n = createI18n({
  legacy: false,
  locale: defaultLang,
  fallbackLocale: "en",
  messages: {
    ko,
    en,
  },
  missingWarn: false,
  fallbackWarn: false,
});

export default i18n;

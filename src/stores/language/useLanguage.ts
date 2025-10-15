import i18n from "@/modules/i18n";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

// 지원하는 언어 목록
export const SUPPORTED_LANGUAGES = ["ko", "en"] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// 기본 언어 결정 함수
const detectDefaultLanguage = (): SupportedLanguage => {
  const savedLang = localStorage.getItem("language") as SupportedLanguage | null;
  if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
    return savedLang;
  }
  return navigator.language.startsWith("ko") ? "ko" : "en";
};

export const DEFAULT_LANGUAGE: SupportedLanguage = detectDefaultLanguage();

export const useLanguageStore = defineStore("language", () => {
  const currentLanguage = ref<SupportedLanguage>(DEFAULT_LANGUAGE);

  // 공통 업데이트 함수
  const applyLanguage = (lang: SupportedLanguage) => {
    i18n.global.locale.value = lang;
    localStorage.setItem("language", lang); // 항상 localStorage에 저장
    document.documentElement.lang = lang;
  };

  // 언어 변경 감지 및 즉시 적용
  watch(
    currentLanguage,
    (newLang) => {
      if (newLang) {
        applyLanguage(newLang);
      }
    },
    { immediate: true }
  );

  // 언어 설정 함수
  const setLanguage = (language: string) => {
    const normalized = language.toLowerCase().trim() as SupportedLanguage;
    if (isValidLanguage(normalized)) {
      currentLanguage.value = normalized;
      applyLanguage(normalized);
    }
  };

  // 현재 언어 가져오기
  const getLanguage = (): SupportedLanguage => {
    return currentLanguage.value || DEFAULT_LANGUAGE;
  };

  // 지원 언어인지 검사
  const isValidLanguage = (language?: string): language is SupportedLanguage => {
    return (
      !!language &&
      SUPPORTED_LANGUAGES.includes(language.toLowerCase().trim() as SupportedLanguage)
    );
  };

  return {
    currentLanguage,
    setLanguage,
    getLanguage,
    isValidLanguage,
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE,
  };
});

import { defineStore } from "pinia"
import { ref, computed } from "vue"

export type Theme = "SYSTEM" | "LIGHT" | "DARK"

export const useThemeStore = defineStore("theme", () => {
  // State
  const currentTheme = ref<Theme>("SYSTEM")
  const systemPrefersDark = ref<boolean>(false)

  // Getters
  const actualTheme = computed(() => {
    if (currentTheme.value === "SYSTEM") {
      return systemPrefersDark.value ? "DARK" : "LIGHT"
    }
    return currentTheme.value
  })

  // 시스템 다크모드 감지
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

  const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
    systemPrefersDark.value = e.matches
    if (currentTheme.value === "SYSTEM") {
      applyTheme()
    }
  }

  // 초기 시스템 테마 설정
  systemPrefersDark.value = mediaQuery.matches

  // 시스템 테마 변경 감지
  mediaQuery.addEventListener("change", updateSystemTheme)

  // HTML에 실제 theme 적용
  const applyTheme = () => {
    const root = document.documentElement
    const theme = actualTheme.value

    // data-theme attribute 설정
    if (theme === "DARK") {
      root.setAttribute("data-theme", "DARK")
    } else {
      root.setAttribute("data-theme", "LIGHT")
    }

    console.log(`[Theme] Applied theme: ${theme.toLowerCase()}`)
  }

  // Theme 설정 (localStorage 저장 + HTML 적용)
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem("theme", theme)
    applyTheme()
    console.log(`[Theme] Theme set to: ${theme}`)
  }

  // localStorage 또는 기본값에서 theme 로드
  const loadTheme = () => {
    const storedTheme = localStorage.getItem("theme") as Theme | null

    if (storedTheme && ["SYSTEM", "LIGHT", "DARK"].includes(storedTheme)) {
      currentTheme.value = storedTheme
    } else {
      // 기본값: SYSTEM
      currentTheme.value = "SYSTEM"
      localStorage.setItem("theme", "SYSTEM")
    }

    applyTheme()
    console.log(`[Theme] Loaded theme: ${currentTheme.value}`)
  }

  // 로그인 시 서버에서 받은 theme 적용
  const setThemeFromServer = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem("theme", theme)
    applyTheme()
    console.log(`[Theme] Theme set from server: ${theme}`)
  }

  // 초기화
  loadTheme()

  return {
    // State
    currentTheme,
    actualTheme,
    systemPrefersDark,

    // Actions
    setTheme,
    setThemeFromServer,
    loadTheme,
    applyTheme
  }
})
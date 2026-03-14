import { defineStore } from "pinia"
import { ref, computed } from "vue"
import useStore from ".."
import useApi from "@/modules/api"

// Types
export interface User {
  userSeq: number
  userId: string
  name: string
  email: string
  birthday: string | null
  gender: "M" | "F" | "O" | null
  userStatus: "A" | "B" | "D" | "S"
  loginDt: string | null
}

export interface UserConfiguration {
  language: string
  theme: "SYSTEM" | "LIGHT" | "DARK"
}

export interface DeviceInfo {
  deviceId: string
  deviceType: string // "WEB", "MOBILE", "TABLET" etc
  os: string
  platform: string // "WEB"
  ip?: string
}

// 백엔드 응답 인터페이스
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  userInformation: {
    userSeq: number
    userId: string
    name: string
    email: string
    birthday: string | null
    gender: "M" | "F" | "O" | null
    userStatus: "A" | "B" | "D" | "S"
    loginDt: string | null
    userConfiguration: {
      language: string
      theme: "SYSTEM" | "LIGHT" | "DARK"
    }
  }
  deviceInformation: {
    deviceId: string
    deviceType: string
    os: string
    platform: string
  }
}

export const useAuthStore = defineStore("userAuth", () => {
  const store = useStore()
  const api = useApi()
  // State
  const user = ref<User | null>(null)
  const userConfig = ref<UserConfiguration | null>(null)
  const accessToken = ref<string>("")
  const refreshToken = ref<string>("")
  const deviceId = ref<string>("")

  // Getters
  const isLoggedIn = computed(() => !!accessToken.value && !!user.value)
  const userInfo = computed(() => user.value)
  const userConfiguration = computed(() => userConfig.value)
  const currentTheme = computed(() => userConfig.value?.theme || "S")
  const currentLanguage = computed(() => userConfig.value?.language || "en")

  // Actions
  const setUser = (userData: User | null) => {
    user.value = userData
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData))
    } else {
      localStorage.removeItem("user")
    }
  }

  const setUserConfig = (config: UserConfiguration | null) => {
    userConfig.value = config
    if (config) {
      localStorage.setItem("userConfig", JSON.stringify(config))
    } else {
      localStorage.removeItem("userConfig")
    }
  }

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access
    refreshToken.value = refresh

    if (access) {
      localStorage.setItem("accessToken", access)
    } else {
      localStorage.removeItem("accessToken")
    }

    if (refresh) {
      localStorage.setItem("refreshToken", refresh)
    } else {
      localStorage.removeItem("refreshToken")
    }
  }

  const setDeviceId = (id: string) => {
    deviceId.value = id
    if (id) {
      localStorage.setItem("deviceId", id)
    }
  }

  // 디바이스 ID 생성 (UUID v4)
  const generateDeviceId = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === "x" ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // 디바이스 정보 수집
  const getDeviceInfo = (): DeviceInfo => {
    // 기존 deviceId가 있으면 사용, 없으면 생성
    if (!deviceId.value) {
      const storedDeviceId = localStorage.getItem("deviceId")
      if (storedDeviceId) {
        deviceId.value = storedDeviceId
      } else {
        const newDeviceId = generateDeviceId()
        setDeviceId(newDeviceId)
      }
    }

    return {
      deviceId: deviceId.value,
      deviceType: getDeviceType(),
      os: getOS(),
      platform: "WEB"
    }
  }

  // 디바이스 타입 감지
  const getDeviceType = (): string => {
    const ua = navigator.userAgent
    if (/tablet|ipad/i.test(ua)) return "TABLET"
    if (/mobile|iphone|android/i.test(ua)) return "MOBILE"
    return "PC"
  }

  // OS 감지
  const getOS = (): string => {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf("Win") !== -1) return "WINDOWS"
    if (userAgent.indexOf("iPad") !== -1) return "IPADOS"
    if (userAgent.indexOf("Mac") !== -1) return "MACOS"
    if (userAgent.indexOf("Linux") !== -1) return "LINUX"
    if (userAgent.indexOf("Android") !== -1) return "ANDROID"
    if (userAgent.indexOf("iOS") !== -1) return "IOS"
    return "UNKNOWN"
  }

  // 로그인
  const login = async (loginData: { userId: string, password: string }) => {
    try {
      const deviceInformation = getDeviceInfo()

      const params = {
        userId: loginData.userId,
        password: loginData.password,
        deviceInformation: deviceInformation
      }

      const res = await api.auth.login(params)
      const responseData = res.data as LoginResponse

      // User 정보 추출
      const userData: User = {
        userSeq: responseData.userInformation.userSeq,
        userId: responseData.userInformation.userId,
        name: responseData.userInformation.name,
        email: responseData.userInformation.email,
        birthday: responseData.userInformation.birthday,
        gender: responseData.userInformation.gender,
        userStatus: responseData.userInformation.userStatus,
        loginDt: responseData.userInformation.loginDt
      }

      // UserConfiguration 정보 추출
      const userConfigData: UserConfiguration = responseData.userInformation.userConfiguration

      // 상태 업데이트
      setUser(userData)
      setUserConfig(userConfigData)
      setTokens(responseData.accessToken, responseData.refreshToken)

      // 로그인 후 사용자 언어 및 테마 적용
      store.language.setLanguage(userConfigData.language)
      store.theme.setThemeFromServer(userConfigData.theme)

      return { success: true }
    } catch (error) {
      console.log("[Login] Failed to login: ", error)
      return { success: false, error }
    }
  }

  // 로그아웃
  const logout = async () => {
    try {
      // TODO: 로그아웃 API 호출 (현재 디바이스의 refresh token 삭제)
      // await logoutApi({ deviceId: deviceId.value, refreshToken: refreshToken.value })

      clearAuth()
      return { success: true }
    } catch (error) {
      console.log("[Logout] Failed to logout: ", error)
      clearAuth() // 에러가 나도 로컬 데이터는 삭제
      return { success: false, error }
    }
  }

  // 토큰 갱신
  const refresh = async () => {
    try {
      if (!refreshToken.value) {
        console.log("[Refresh] No refresh token available")
        clearAuth()
        return null
      }

      const res = await api.auth.refreshToken({
        accessToken: refreshToken.value
      })

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data

      setTokens(newAccessToken, newRefreshToken)

      console.log("[Refresh] Token refreshed successfully")
      return { accessToken: newAccessToken, refreshToken: newRefreshToken }
    } catch (error) {
      console.log("[Refresh] Failed to refresh token: ", error)
      clearAuth()
      return null
    }
  }

  // 패스워드 재설정 요청
  const passwordResetRequest = async (userId: string) => {
    try {
      const res = await api.auth.passwordResetRequest({
        userId,
        language: store.language.getCurrentLanguage()
      })
      return { success: true, data: res.data }
    } catch (error) {
      console.log("[PasswordReset] Failed to request password reset: ", error)
      return { success: false, error }
    }
  }

  // 인증 정보 초기화
  const clearAuth = () => {
    setUser(null)
    setUserConfig(null)
    setTokens("", "")
    // deviceId는 유지 (다음 로그인에서도 같은 디바이스로 인식)
  }

  // localStorage에서 인증 정보 복원
  const loadAuthFromStorage = () => {
    try {
      const storedUser = localStorage.getItem("user")
      const storedConfig = localStorage.getItem("userConfig")
      const storedAccessToken = localStorage.getItem("accessToken")
      const storedRefreshToken = localStorage.getItem("refreshToken")
      const storedDeviceId = localStorage.getItem("deviceId")

      if (storedUser) {
        user.value = JSON.parse(storedUser)
      }
      if (storedConfig) {
        userConfig.value = JSON.parse(storedConfig)

        // 로그인 상태면 사용자 언어 및 테마 적용 (DB 우선순위)
        if (userConfig.value) {
          store.language.setLanguage(userConfig.value.language)
          store.theme.setThemeFromServer(userConfig.value.theme)
        }
      }
      if (storedAccessToken) {
        accessToken.value = storedAccessToken
      }
      if (storedRefreshToken) {
        refreshToken.value = storedRefreshToken
      }
      if (storedDeviceId) {
        deviceId.value = storedDeviceId
      }

      return !!storedAccessToken && !!storedUser
    } catch (error) {
      console.log("[AuthStorage] Failed to load auth from storage: ", error)
      return false
    }
  }

  // 사용자 설정 업데이트 (언어, 테마 등)
  const updateUserConfig = (config: Partial<UserConfiguration>) => {
    if (userConfig.value) {
      userConfig.value = { ...userConfig.value, ...config }
      localStorage.setItem("userConfig", JSON.stringify(userConfig.value))
    }
  }

  // Store 생성 시 자동으로 인증 정보 복원
  loadAuthFromStorage()

  return {
    // State
    user,
    userConfig,
    accessToken,
    refreshToken,
    deviceId,

    // Getters
    isLoggedIn,
    userInfo,
    userConfiguration,
    currentTheme,
    currentLanguage,

    // Actions
    setUser,
    setUserConfig,
    setTokens,
    setDeviceId,
    getDeviceInfo,
    login,
    logout,
    refresh,
    passwordResetRequest,
    clearAuth,
    loadAuthFromStorage,
    updateUserConfig
  }
})

import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios"
import useStore from "@/stores"

const instance = axios.create({
  timeout: 10000,
})

// 토큰 갱신 중복 방지를 위한 변수
let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

// 토큰 갱신 완료 후 대기 중인 요청들 처리
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

// 토큰 갱신 중일 때 요청을 대기열에 추가
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback)
}

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useStore()
    const accessToken = store.auth.accessToken

    config.headers.set("Content-Type", "application/json")
    config.headers.set("Authorization", accessToken ? `Bearer ${accessToken}` : "")

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    console.log("[Axios] Response received: ", response)
    return response
  },
  async (error: AxiosError<any>) => {
    const store = useStore()
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    console.log("[Axios] Error: ", error.response)
    console.log(`[Axios] Error status = ${error?.response?.status}`)

    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (error?.response?.status === 401 && !originalRequest._retry) {
      // 토큰 갱신 요청 자체가 실패한 경우 로그아웃
      if (originalRequest.url?.includes('/token/refresh')) {
        console.log("[Axios] Refresh token expired, logging out")
        store.auth.clearAuth()
        // TODO: 로그인 페이지로 리다이렉트
        return Promise.reject(error)
      }

      // 이미 토큰 갱신 중인 경우
      if (isRefreshing) {
        console.log("[Axios] Token refresh in progress, queuing request")
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.set("Authorization", `Bearer ${token}`)
            resolve(instance(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        console.log("[Axios] Attempting to refresh token")
        const res = await store.auth.refresh()

        if (res) {
          console.log("[Axios] Token refreshed successfully, retrying request")
          const newAccessToken = res.accessToken

          // 대기 중인 요청들에 새 토큰 전달
          onRefreshed(newAccessToken)

          // 원래 요청에 새 토큰 설정
          originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`)

          return instance(originalRequest)
        } else {
          console.log("[Axios] Token refresh failed, logging out")
          // TODO: 로그인 페이지로 리다이렉트
          return Promise.reject(error)
        }
      } catch (refreshError) {
        console.log("[Axios] Error during token refresh: ", refreshError)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    } else if (error?.response?.status === 500) {
      // store.auth.goErrorPage()
    }

    return Promise.reject(error)
  }
)

export default instance
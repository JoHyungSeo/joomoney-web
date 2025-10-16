import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios"
import useStore from "@/stores"

const instance = axios.create({
  timeout: 2000,
})

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
    console.log("Response received:", response)
    return response
  },
  async (error: AxiosError<any>) => {
    const store = useStore()

    console.log("[API Request ERROR]", error.response)
    console.log(`error status = ${error?.response?.status}`)

    if (error?.response?.status === 401 && error.response.data?.body?.message === "unauthorized") {
      const res = await store.auth.refresh()
      console.log("axios 리프레쉬 갱신 res:", res)
      if (res) {
        const errorAPI = error.config as InternalAxiosRequestConfig
        return instance(errorAPI)
      }
    } else if (error?.response?.status === 500) {
      store.auth.goErrorPage()
    }

    console.log("axios 에러 발생")
    return Promise.reject(error)
  }
)

export default instance
import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import useStore from "@/stores";

// axios 인스턴스 생성
const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,
  timeout: 2000,
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useStore();
    const accessToken = store.auth.accessToken;

    // axios v1.x 스타일: headers.set 사용
    config.headers.set("Content-Type", "application/json");
    config.headers.set("Authorization", accessToken ? `Bearer ${accessToken}` : "");

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    console.log("Response received:", response);
    return response;
  },
  async (error: AxiosError<any>) => {
    const store = useStore();

    console.log("[API Request ERROR]", error.response);
    console.log(`error status = ${error?.response?.status}`);

    // 인증 에러 발생
    if (error?.response?.status === 401 && error.response.data?.body?.message === "unauthorized") {
      // 토큰갱신처리
      const res = await store.auth.refresh();
      console.log("axios 리프레쉬 갱신 res:", res);
      if (res) {
        const errorAPI = error.config as InternalAxiosRequestConfig;
        return instance(errorAPI);
      }
    } else if (error?.response?.status === 500) {
      // 에러발생처리 
      store.auth.goErrorPage();
    }

    console.log("axios 에러 발생");
    return Promise.reject(error);
  }
);

export default instance;

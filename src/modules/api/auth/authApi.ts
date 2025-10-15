import $api from "@/modules/api/axios"

export interface LoginParams {
  userId: string
  password: string
}

export interface LogoutParams {
  accessToken: string
  deviceInfo?: Record<string, any>
}

export interface RefreshTokenParams {
  refreshToken: string
}

/** 로그아웃 */
export const login = async (params: LoginParams) => {
  return await $api.post(`/api/v1/user/login`, params);
};


/** 로그아웃 */
export const logout = async (params: LogoutParams) => {
  return await $api.post(`/api/v1/user/logout`, params);
};

/** 토큰 갱신 */
export const refreshToken = async (params: RefreshTokenParams) => {
  return await $api.post(`/api/v1/jwt/refresh`, params);
};

export default {
  login, logout, refreshToken
}
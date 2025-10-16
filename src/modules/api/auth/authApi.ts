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

export const login = async (params: LoginParams) => {
  return await $api.post(`/api/v1/user/login`, params);
};

export const logout = async (params: LogoutParams) => {
  return await $api.post(`/api/v1/user/logout`, params);
};

export const refreshToken = async (params: RefreshTokenParams) => {
  return await $api.post(`/api/v1/jwt/refresh`, params);
};

export default {
  login, logout, refreshToken
}
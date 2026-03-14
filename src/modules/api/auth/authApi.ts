import $api from "@/modules/api/axios"

export interface DeviceInformation {
  deviceId: string
  deviceType: string // PC, Mobile, Tablet, ...
  os: string // Windows, macOS, Android, Linux, iOS, iPadOS, ...
  platform: string // Web, App, ...
}

export interface loginParams {
  userId: string
  password: string
  deviceInformation: DeviceInformation
}

export interface checkDuplicateUserIdParams {
  target: string
}

export interface emailVerificationRequestParams {
  email: string,
  type: string,
  language: string
}

export interface emailVerificationValidateParams {
  email: string,
  type: string,
  code: string
}

export interface passwordResetRequest {
  userId: String,
  language: String
}

export interface passwordResetValidateParams {
  userId: string,
  code: string
}

export interface passwordResetParams {
  userId: string,
  newPassword: string,
  verificationToken: string
}

export interface findUserIdParams {
  email: string,
  verificationToken: string
}

export interface signUpParams {
  userId: string
  name: string
  email: string
  verificationToken: string
  password: string
  birthday: string | null
  gender: string | null
  agreePolicyYn: boolean
  userConfiguration: {
    language: string
    theme: string
  }
  deviceInformation: DeviceInformation
}

export interface refreshTokenParams {
  accessToken: string
}

export const login = async (params: loginParams) => {
  return await $api.post(`/api/v1/auth/login`, params)
}

export const refreshToken = async (params: refreshTokenParams) => {
  return await $api.post(`/api/v1/auth/token/refresh`, params)
}

export const checkDuplicateUserId = async (params: checkDuplicateUserIdParams) => {
  return await $api.post(`/api/v1/auth/duplicate/user-id/${params.target}`)
}

export const emailVerificationRequest = async (params: emailVerificationRequestParams) => {
  return await $api.post(`/api/v1/auth/email/verification/request`, params)
}

export const emailVerificationValidate = async (params: emailVerificationValidateParams) => {
  return await $api.post(`/api/v1/auth/email/verification/validate`, params)
}

export const passwordResetRequest = async (params: passwordResetRequest) => {
  return await $api.post(`/api/v1/auth/password/reset/request`, params)
}

export const passwordResetValidate = async (params: passwordResetValidateParams) => {
  return await $api.post(`/api/v1/auth/password/reset/validate`, params)
}

export const passwordReset = async (params: passwordResetParams) => {
  return await $api.post(`/api/v1/auth/password/reset`, params)
}

export const findUserId = async (params: findUserIdParams) => {
  return await $api.post(`/api/v1/auth/find/user-id`, params)
}

export const signUp = async (params: signUpParams) => {
  return await $api.post(`/api/v1/auth/sign-up`, params)
}

export default {
  login, refreshToken, checkDuplicateUserId, emailVerificationRequest, emailVerificationValidate, passwordResetRequest, passwordResetValidate, passwordReset, findUserId, signUp
}
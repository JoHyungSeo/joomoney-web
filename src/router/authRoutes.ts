import type { RouteRecordRaw } from "vue-router"
import type { RouteMeta } from "vue-router"

const getMeta = (name: string, title?: string): RouteMeta => {
  return {
    name,
    title,
    layout: "AuthLayout",
    authCheck: false
  }
}

const authRoutes: RouteRecordRaw[] = [
  /************************* 로그인 *************************/
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/login/Login.vue"),
    meta: getMeta("Login", "Log In | Joomoney")
  },
  /************************* 계정 찾기 *************************/
  {
    path: "/forgot-account",
    name: "ForgotAccount",
    component: () => import("@/views/auth/forgot-account/ForgotAccount.vue"),
    meta: getMeta("ForgotAccount", "Forgot Account | Joomoney")
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/auth/forgot-account/reset-password/ResetPassword.vue"),
    meta: getMeta("ResetPassword", "Reset Password | Joomoney")
  },
  {
    path: "/reset-password/verification",
    name: "ResetPasswordVerification",
    component: () => import("@/views/auth/forgot-account/reset-password/ResetPasswordVerification.vue"),
    meta: getMeta("ResetPasswordVerification", "Email Verification | Joomoney"),
  },
  {
    path: "/reset-password/new",
    name: "ResetPasswordNew",
    component: () => import("@/views/auth/forgot-account/reset-password/ResetPasswordNew.vue"),
    meta: getMeta("ResetPasswordNew", "New Password | Joomoney"),
  },
  {
    path: "/find-account",
    name: "FindAccount",
    component: () => import("@/views/auth/forgot-account/FindAccount.vue"),
    meta: getMeta("FindAccount", "Find Account | Joomoney")
  },
  /************************* 아이디 찾기 *************************/
  {
    path: "/find-id",
    name: "FindId",
    component: () => import("@/views/auth/forgot-account/find-id/FindId.vue"),
    meta: getMeta("FindId", "Find ID | Joomoney")
  },
  {
    path: "/find-id/verification",
    name: "FindIdVerification",
    component: () => import("@/views/auth/forgot-account/find-id/FindIdVerification.vue"),
    meta: getMeta("FindIdVerification", "Email Verification | Joomoney")
  },
  {
    path: "/find-id/result",
    name: "FindIdResult",
    component: () => import("@/views/auth/forgot-account/find-id/FindIdResult.vue"),
    meta: getMeta("FindIdResult", "Find ID | Joomoney")
  },
  /************************* 회원가입 *************************/
  {
    path: "/sign-up",
    name: "SignUp",
    meta: getMeta("SignUp", "Sign Up | Joomoney"),
    redirect: { name: "SignUpUserId" }, // 기본 진입 시 첫 단계로 리디렉션
    children: [
      {
        path: "user-id",
        name: "SignUpUserId",
        component: () => import("@/views/auth/sign-up/01_UserId.vue"),
        meta: getMeta("SignUpUserId", "Sign Up | Joomoney")
      },
      {
        path: "name",
        name: "SignUpName",
        component: () => import("@/views/auth/sign-up/02_Name.vue"),
        meta: getMeta("SignUpName", "Sign Up | Joomoney")
      },
      {
        path: "email",
        name: "SignUpEmail",
        component: () => import("@/views/auth/sign-up/03_Email.vue"),
        meta: getMeta("SignUpEmail", "Sign Up | Joomoney")
      },
      {
        path: "email-verification",
        name: "SignUpEmailVerification",
        component: () => import("@/views/auth/sign-up/04_EmailVerification.vue"),
        meta: getMeta("SignUpEmailVerification", "Sign Up | Joomoney")
      },
      {
        path: "password",
        name: "SignUpPassword",
        component: () => import("@/views/auth/sign-up/05_Password.vue"),
        meta: getMeta("SignUpPassword", "Sign Up | Joomoney")
      },
      {
        path: "birthday-gender",
        name: "SignUpBirthdayGender",
        component: () => import("@/views/auth/sign-up/06_BirthdayGender.vue"),
        meta: getMeta("SignUpBirthdayGender", "Sign Up | Joomoney")
      },
      {
        path: "complete",
        name: "SignUpComplete",
        component: () => import("@/views/auth/sign-up/07_Complete.vue"),
        meta: getMeta("SignUpComplete", "Sign Up | Joomoney")
      }
    ]
  }
]

export default authRoutes

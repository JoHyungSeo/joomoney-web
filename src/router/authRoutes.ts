import type { RouteRecordRaw } from "vue-router"
import type { RouteMeta } from "vue-router"

const getMeta = (name: string, title?: string): RouteMeta => {
  return {
    name,
    title,
    layout: "AuthLayout",
    authCheck: false,
  }
}

const authRoutes: RouteRecordRaw[] = [
  /************************* 로그인 *************************/
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/login/Login.vue"),
    meta: getMeta("Login", "Log In | Balance"),
  },
  /************************* 회원가입 *************************/
  {
    path: "/sign-up/name",
    name: "Signup01_Name",
    component: () => import("@/views/auth/sign-up/Signup01_Name.vue"),
    meta: getMeta("Signup01_Name", "Sign Up | Balance"),
  },
  {
    path: "/sign-up/email",
    name: "Signup02_Email",
    component: () => import("@/views/auth/sign-up/Signup02_Email.vue"),
    meta: getMeta("Signup02_Email", "Sign Up | Balance"),
  },
  {
    path: "/sign-up/password",
    name: "Signup03_Password",
    component: () => import("@/views/auth/sign-up/Signup03_Password.vue"),
    meta: getMeta("Signup03_Password", "Sign Up | Balance"),
  },
  {
    path: "/sign-up/birthday&gender",
    name: "Signup04_Birthday&Gender",
    component: () => import("@/views/auth/sign-up/Signup04_Birthday&Gender.vue"),
    meta: getMeta("Signup04_Birthday&Gender", "Sign Up | Balance"),
  },
  {
    path: "/sign-up/finance",
    name: "Signup05_Finance",
    component: () => import("@/views/auth/sign-up/Signup05_Finance.vue"),
    meta: getMeta("Signup05_Finance", "Sign Up | Balance"),
  },
  {
    path: "/sign-up/complete",
    name: "Signup06_Complete",
    component: () => import("@/views/auth/sign-up/Signup06_Complete.vue"),
    meta: getMeta("Signup06_Complete", "Sign Up | Balance"),
  },
]

export default authRoutes

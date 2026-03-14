import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from "vue-router"
import routes from "./routes"
import useStore from "@/stores"

export let saveFullpath = ""

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  beforeCheck(to, from, next)
})

router.beforeResolve((to) => {
})

router.afterEach((to) => {
  window.scrollTo({ top: 0, behavior: "smooth" })

  if (to.meta?.title) {
    document.title = to.meta.title as string
  } else {
    document.title = "Joomoney"
  }
})

const beforeCheck = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const store = useStore()
  const isLoggedIn = !!store.auth.accessToken

  if (!navigator.onLine) {
    saveFullpath = to.fullPath
    next({ name: "NetworkError" })
    return
  }

  if (to.meta.authCheck && to.name !== "Login" && !isLoggedIn) {
    return next("/login")
  }

  if (isLoggedIn && to.path === "/login") {
    return next("/")
  }

  // Sign Up
  if (to.name === "SignUpName" && !store.signup.userId) {
    return next({ name: "SignUpUserId" })
  }
  if (to.name === "SignUpEmail" && !store.signup.name) {
    return next({ name: "SignUpName" })
  }
  if (to.name === "SignUpEmailVerification" && !store.signup.email) {
    return next({ name: "SignUpEmail" })
  }
  if (to.name === "SignUpPassword" && !store.signup.verificationToken) {
    return next({ name: "SignUpEmail" })
  }
  if (to.name === "SignUpBirthdayGender" && !store.signup.password) {
    return next({ name: "SignUpPassword" })
  }
  if (to.name === "SignUpComplete" && !store.signup.password) {
    return next({ name: "SignUpPassword" })
  }

  // Reset Password
  if (to.name === "ResetPasswordVerification" && !store.resetPassword.maskedEmail) {
    return next({ name: "ResetPassword" })
  }
  if (to.name === "ResetPasswordNew" && !store.resetPassword.verificationToken) {
    return next({ name: "ResetPassword" })
  }

  // Find ID
  if (to.name === "FindIdVerification" && !store.findId.email) {
    return next({ name: "FindId" })
  }
  if (to.name === "FindIdResult" && !store.findId.foundUserId) {
    return next({ name: "FindId" })
  }

  if (!to.path.startsWith("/sign-up")) {
    store.signup.reset()
  }
  if (!to.path.startsWith("/reset-password")) {
    store.resetPassword.reset()
  }
  if (!to.path.startsWith("/find-id")) {
    store.findId.reset()
  }

  next()
}

export default router

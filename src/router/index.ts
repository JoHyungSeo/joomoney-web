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
  console.log("[BeforeEach] to:", to)
  beforeCheck(to, from, next)
})

router.beforeResolve((to) => {
  console.log("[BeforeResolve] path:", to.path)
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

  if (to.name === "Signup02_Email" && !store.signup.name) {
    return next({ name: "Signup01_Name" })
  }
  if (to.name === "Signup03_Password" && !store.signup.email) {
    return next({ name: "Signup02_Email" })
  }
  if (to.name === "Signup04_Birthday&Gender" && !store.signup.password) {
    return next({ name: "Signup03_Password" })
  }
  if (to.name === "Signup05_Finance" && !store.signup.password) {
    return next({ name: "Signup03_Password" })
  }
  if (to.name === "Signup06_Complete" && !store.signup.password) {
    return next({ name: "Signup03_Password" })
  }

  if (!to.path.startsWith("/sign-up")) {
    store.signup.reset()
  }

  next()
}

export default router

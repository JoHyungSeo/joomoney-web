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

// 네비게이션 가드
router.beforeEach((to, from, next) => {
  console.log("[BeforeEach] to:", to)
  beforeCheck(to, from, next)
})

router.beforeResolve((to) => {
  console.log("[BeforeResolve] path:", to.path)
})

// ✅ 페이지 이동 후 처리
router.afterEach((to) => {
  // 항상 맨 위로 이동
  window.scrollTo({ top: 0, behavior: "smooth" })

  // meta에 title이 있으면 document.title 업데이트
  if (to.meta?.title) {
    document.title = to.meta.title as string
  } else {
    document.title = "Balance" // 기본 타이틀
  }
})

// 네비게이션 가드 로직
const beforeCheck = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const store = useStore()
  const isLoggedIn = !!store.auth.accessToken

  // 네트워크 에러 처리
  if (!navigator.onLine) {
    saveFullpath = to.fullPath
    next({ name: "NetworkError" })
    return
  }

  // 인증 체크
  if (to.meta.authCheck && to.name !== "Login" && !isLoggedIn) {
    return next("/login")
  }

  // 로그인 상태에서 로그인 화면으로 이동 → 메인으로
  if (isLoggedIn && to.path === "/login") {
    return next("/")
  }

  // ✅ 회원가입 단계 강제 순서 체크
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

  // ✅ sign-up 외 페이지로 이동하면 입력값 초기화
  if (!to.path.startsWith("/sign-up")) {
    store.signup.reset()
  }

  next()
}

export default router

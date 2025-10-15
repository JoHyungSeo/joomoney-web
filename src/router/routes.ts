import type { RouteRecordRaw } from "vue-router"

import ErrorRoutes from "@/router/errorRoutes"
import AuthRoutes from "@/router/authRoutes"

// 라우트 메타 확장 타입
declare module "vue-router" {
  interface RouteMeta {
    name?: string
    title?: string
    layout: 'DefaultLayout' | 'AuthLayout' | 'ErrorLayout'
    authCheck?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  { 
    path: "/cookie",
    name: "Cookie",
    component: () => import("@/views/policies/Cookie.vue"),
    meta: {
      name: "Cookie",
      layout: "DefaultLayout",
      authCheck: false,
    },
  },
  {
    path: "/terms",
    name: "Terms",
    component: () => import("@/views/policies/Terms.vue"),
    meta: {
      name: "Terms",
      layout: "DefaultLayout",
      authCheck: false,
    },
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("@/views/policies/Privacy.vue"),
    meta: {
      name: "Privacy",
      layout: "DefaultLayout",
      authCheck: false,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/error/not-found",
  },
]

// 외부 라우트 병합
routes.push(ErrorRoutes)
routes.push(...AuthRoutes)

export default routes

import type { RouteRecordRaw, RouteMeta } from "vue-router"

const defaultPath = "/error"

const getMeta = (name: string, title?: string): RouteMeta => {
  return {
    name,
    title,
    layout: "ErrorLayout",
    authCheck: false,
  }
}

const errorRoutes: RouteRecordRaw = {
  path: defaultPath,
  meta: {
    layout: "ErrorLayout",
    authCheck: false,
  },
  children: [
    {
      path: "not-found",  // ✅ 상대경로
      name: "PageNotFound",
      component: () => import("@/views/error/PageNotFound.vue"),
      meta: getMeta("PageNotFound", "Page Not Found | Balance"),
    },
    {
      path: "network-error",   // ✅ 네트워크 에러 추가 예시
      name: "NetworkError",
      component: () => import("@/views/error/NetworkError.vue"),
      meta: getMeta("NetworkError", "Network Error | Balance"),
    },
    // {
    //   path: "server",    // ✅ 서버 에러 추가 예시
    //   name: "ServerError",
    //   component: () => import("@/views/error/ServerError.vue"),
    //   meta: getMeta("ServerError", "Server Error | Balance"),
    // },
  ],
}

export default errorRoutes

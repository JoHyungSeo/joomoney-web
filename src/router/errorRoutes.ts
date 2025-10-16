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
      path: "not-found",
      name: "PageNotFound",
      component: () => import("@/views/error/PageNotFound.vue"),
      meta: getMeta("PageNotFound", "Page Not Found | Balance"),
    },
    {
      path: "network-error",
      name: "NetworkError",
      component: () => import("@/views/error/NetworkError.vue"),
      meta: getMeta("NetworkError", "Network Error | Balance"),
    },
    // {
    //   path: "server",
    //   name: "ServerError",
    //   component: () => import("@/views/error/ServerError.vue"),
    //   meta: getMeta("ServerError", "Server Error | Balance"),
    // },
  ],
}

export default errorRoutes

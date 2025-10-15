import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router"
import $api from "@/modules/api/axios"
import * as auth from "@/modules/api/auth/authApi"
// import { useLangStore } from "@/stores/language/useLanguage"

// 유저 정보 타입 (간단화)
interface UserInfo {
  userSeq?: string
  userId?: string
  userNm?: string
  emailAdr?: string
  accessToken?: string
  refreshToken?: string
  language?: string
}

export const useAuthStore = defineStore(
  "userAuth",
  () => {
    /* 유저 정보 */
    const userInfo = ref<UserInfo>({});
    const deviceInfo = ref<Record<string, any>>({});
    /* 토큰 */
    const accessToken = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);
    /* 아이디 기억 하기 */
    const rememberYn = ref<boolean>(false);
    const loginId = ref<string>("");

    /* 로그인 */
    const login = async (params: Record<string, any>): Promise<void> => {
      await $api.post("/api/v1/jwt/login", params).then((res) => {
        userInfo.value.userId = res.data.userId;
        userInfo.value.accessToken = res.data.accessToken;
        userInfo.value.refreshToken = res.data.refreshToken;
        setToken();

        /* 권한 조회 */
        const roles: string[] = res.data.roles.split(",");
        if (roles.find((el) => el === "ROLE_ADMIN")) {
          const error: any = new Error("관리자 계정으로는 로그인할 수 없습니다.");
          error.response = { role: "ROLE_ADMIN" };
          throw error;
        }

        /* 사용자 설정 정보 get */
        // getUserConfInfo();


      }).catch((e) => {
        console.log("####### exception :", e);
        throw e;
      });
    };

    /* 사용자 설정 정보 get */
    // const langStore = useLangStore();
    // const getUserConfInfo = async (): Promise<void> => {
    //   await api._getUserConfInfo().then((subRes) => {
    //     const userLangConf = subRes.data.result.find((item: any) => item.confTypeCd === "LANG");
    //     const userLang = userLangConf?.confVal?.toLowerCase().trim();

    //     const targetLang = langStore.isValidLanguage(userLang) ? userLang : langStore.DEFAULT_LANGUAGE;
    //     userInfo.value.language = targetLang;
    //     langStore.setLanguage(targetLang);
    //   });
    // };

    /* 토큰 갱신 */
    const refresh = async (): Promise<boolean> => {
      accessToken.value = null;

      if (!refreshToken.value) {
        console.warn("refreshToken 없음 → 로그아웃 처리");
        logout();
        return false;
      }

      try {
        const res = await auth.refreshToken({ refreshToken: refreshToken.value });
        userInfo.value = res.data;
        setToken();
        // getUserConfInfo();
        return true;
      } catch (e) {
        console.log("refresh Error : ", e);
        logout();
        return false;
      }
    };

    /* 로그아웃 */
    const logout = async (): Promise<void> => {
      try {
        if (!accessToken.value) {
          console.warn("accessToken 없음 → 서버 로그아웃 생략");
        } else {
          await auth.logout({ accessToken: accessToken.value, deviceInfo: deviceInfo.value })
        }
      } catch (e) {
        console.log("logout Error :", e)
      } finally {
        localStorage.clear()
        removeAuth()
        router.push("/login")
      }
    };

    const goErrorPage = (): void => {
      router.push("/error/server");
    };

    const setToken = (): void => {
      accessToken.value = userInfo.value.accessToken ?? null;
      refreshToken.value = userInfo.value.refreshToken ?? null;
    };

    const removeAuth = (): void => {
      userInfo.value = {};
      deviceInfo.value = {};
      accessToken.value = null;
      refreshToken.value = null;
    };

    // const getUserInfo = async (): Promise<void> => {
    //   await api._getUserDetail().then((res: any) => {
    //     const result = res.data.result;
    //     userInfo.value.emailAdr = result.emailAdr;
    //   });
    // };

    return {
      userInfo,
      deviceInfo,
      accessToken,
      refreshToken,
      rememberYn,
      loginId,
      login,
      logout,
      refresh,
      goErrorPage,
      removeAuth,
      // getUserInfo,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);

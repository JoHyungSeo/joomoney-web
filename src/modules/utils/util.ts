import router from '@/router'  // router 인스턴스를 직접 import

/* 라우터 이동 */
export const goPage = (pageName: string, replaceYn = false) => {
  try {
    if (!replaceYn) {
      router.push({ name: pageName })
    } else {
      // 히스토리에 남기지 않게 push 대신 replace 사용
      router.replace({ name: pageName })
    }
  } catch (error) {
    console.error('라우터 이동 중 오류 발생:', error)
  }
}

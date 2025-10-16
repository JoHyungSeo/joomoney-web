import router from '@/router'

export const goPage = (pageName: string, replaceYn = false) => {
  try {
    if (!replaceYn) {
      router.push({ name: pageName })
    } else {
      router.replace({ name: pageName })
    }
  } catch (error) {
    console.error('라우터 이동 중 오류 발생:', error)
  }
}

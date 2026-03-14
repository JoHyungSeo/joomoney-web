import router from '@/router'

export const goPage = (pageName: string, replaceYn = false, newTab = false) => {
  try {
    if (newTab) {
      const url = router.resolve({ name: pageName }).href
      window.open(url, '_blank')
      return
    }

    if (!replaceYn) {
      router.push({ name: pageName })
    } else {
      router.replace({ name: pageName })
    }
  } catch (error) {
    console.log('[Router] Error during router movement: ', error)
  }
}
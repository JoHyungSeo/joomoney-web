import $api from "@/modules/api/axios"

export const getCommonCodes = async (groupCd: string) => {
  return await $api.get(`/api/v1/common/code/${groupCd}`)
}

export default {
  getCommonCodes,
}
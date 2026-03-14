import common from "@/modules/api/common/commonApi"
import auth from "@/modules/api/auth/authApi"

const useApi = () => ({
  common,
  auth,
})

export default useApi
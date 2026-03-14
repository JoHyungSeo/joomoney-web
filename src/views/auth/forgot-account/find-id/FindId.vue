<template>
  <div class="flex flex-col grow-1 min-w-0">
    <main class="flex flex-1-1-0pct flex-col ali-items-center min-w-0 overflow-hidden">
      <div class="flex flex-col jus-content-start ali-items-center pt-80 px-24 pb-48">
        <div class="w-425 min-h-580 p-40 border-solid-1 border-line br-24">
          <div class="mb-32">
            <div class="fs-32 fw-600 lh-40">
              {{ t("auth.findId.title") }}
            </div>
          </div>
          <form @submit.prevent="requestFindId">
            <div class="flex flex-col fs-14 fw-400 lh-22 gap-4">
              <label for="email" class="fs-14 fw-500 lh-22">
                {{ t("auth.common.email") }}
              </label>
              <div>
                <div class="flex min-w-0">
                  <div :class="emailError ? 'border-error' : 'border-input hover:border-yellow focus-within:border-yellow'" class="flex flex-1 flex-nowrap ali-items-center max-w-100vw w-100pct min-w-0 h-48 px-10 py-6 gap-8 fs-16 border-solid-1 br-10 bg-none bg-transparent transition-all transition-dur-250 transition-timing-ease-in-out">
                    <input
                      class="flex-1 min-w-0 w-inherit h-50 p-0 fs-16 fw-500 lh-24 caret-yellow placeholder-tertiary appearance-none"
                      @keypress.space.prevent
                      type="text"
                      id="email"
                      name="email"
                      v-model="email"
                      :placeholder="t('auth.common.email')"
                      @focus="clearEmailError"
                      ref="emailInput"
                    />
                    <div v-if="email" class="inline-flex flex-none">
                      <svg @click="clearEmail" class="text-icon cursor-pointer" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.53605 4.535C4.70709 4.36455 4.93521 4.26348 5.17638 4.25129C5.41755 4.2391 5.65469 4.31666 5.84205 4.469L5.91705 4.535L12 10.62L18.084 4.536L18.159 4.47C18.3534 4.31465 18.5997 4.23939 18.8477 4.25959C19.0957 4.2798 19.3266 4.39395 19.4932 4.57871C19.6599 4.76348 19.7496 5.0049 19.7442 5.25365C19.7388 5.5024 19.6386 5.73968 19.464 5.917L13.38 12L19.464 18.085C19.6406 18.2619 19.7426 18.4998 19.749 18.7497C19.7554 18.9995 19.6657 19.2423 19.4984 19.428C19.331 19.6137 19.0988 19.7281 18.8496 19.7476C18.6005 19.7671 18.3533 19.6903 18.159 19.533L18.084 19.465L12 13.38L5.91705 19.464L5.84205 19.532C5.6474 19.6861 5.4014 19.7603 5.15402 19.7395C4.90665 19.7188 4.67645 19.6046 4.51018 19.4203C4.34392 19.236 4.25406 18.9952 4.25886 18.747C4.26367 18.4988 4.36277 18.2618 4.53605 18.084L10.62 12L4.53605 5.916C4.35334 5.73285 4.25073 5.48471 4.25073 5.226C4.25073 4.9673 4.35334 4.71816 4.53605 4.535Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="emailError" class="fs-14 fw-400 lh-22 text-error">
                {{ t(emailError) }}
              </div>
            </div>
            <button v-if="!processing" @click="requestFindId" type="button" class="inline-flex jus-content-center ali-items-center overflow-hidden min-w-80 w-100pct min-h-48 h-48 mt-24 px-20 gap-5 fs-16 fw-500 lh-24 text-ali-center text-overflow-ellipsis text-decoration-none white-space-nowrap word-break-all text-btn br-8 bg-btn hover:opacity-80 focus-visible:bg-yellow active:bg-yellow user-select-none">
              {{ t("auth.button.next") }}
            </button>
            <button v-else type="button" class="inline-flex jus-content-center ali-items-center overflow-hidden min-w-80 w-100pct min-h-48 h-48 mt-24 px-20 gap-5 fs-16 fw-500 lh-24 text-ali-center text-overflow-ellipsis text-decoration-none white-space-nowrap word-break-all text-btn br-8 bg-btn hover:opacity-80 focus-visible:bg-yellow active:bg-yellow user-select-none">
              <div class="inline-flex jus-content-center ali-items-center h-24 p-8 gap-3">
                <div class="w-3 h-5 bg-text-on-yellow transform-origin-top anim-nm-jumpScaleY anim-dur-1500 anim-timing-linear anim-iteration-infinite" style="animation-delay: 50ms;"></div>
                <div class="w-3 h-5 bg-text-on-yellow transform-origin-top anim-nm-jumpScaleY anim-dur-1500 anim-timing-linear anim-iteration-infinite" style="animation-delay: 100ms;"></div>
                <div class="w-3 h-5 bg-text-on-yellow transform-origin-top anim-nm-jumpScaleY anim-dur-1500 anim-timing-linear anim-iteration-infinite" style="animation-delay: 150ms;"></div>
                <div class="w-3 h-5 bg-text-on-yellow transform-origin-top anim-nm-jumpScaleY anim-dur-1500 anim-timing-linear anim-iteration-infinite" style="animation-delay: 200ms;"></div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { goPage } from "@/modules/utils/util"
import { ref, onMounted } from "vue"
import { AxiosError } from "axios"
import useStore from "@/stores"

const { t } = useI18n()

const store = useStore()

const email = ref("")
const emailError = ref("")
const emailInput = ref<HTMLInputElement | null>(null)
const processing = ref(false)

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const errorCodeMap: Record<string, string> = {
  ERR_EMAIL_NOT_FOUND: "auth.error.email.notFound",
  ERR_EMAIL_CODE_LOCKED: "auth.error.email.codeLocked",
  ERR_EMAIL_VERIFY_ALREADY_COMPLETED: "auth.error.email.alreadyVerified",
  ERR_EMAIL_CODE_COOLDOWN: "auth.error.email.cooldown",
  ERR_EMAIL_SEND_FAILED: "auth.error.email.sendFailed",
}

const validateEmail = () => {
  emailError.value = ""

  if (!email.value) {
    return emailError.value = "auth.error.email.required"
  }

  if (!emailRegex.test(email.value)) {
    return emailError.value = "auth.error.email.invalid"
  }
}

const clearEmail = () => {
  email.value = ""
}

const clearEmailError = () => {
  emailError.value = ""
}

const requestFindId = async () => {
  validateEmail()

  if (emailError.value) return

  processing.value = true

  store.findId.setEmail(email.value)

  const res = await store.findId.emailVerificationRequest()

  if (res.success) {
    goPage("FindIdVerification")
  } else {
    if (res.error instanceof AxiosError) {
      const resultCode = res.error.response?.data?.code as string
      emailError.value = errorCodeMap[resultCode] ?? "auth.error.findId.failed"
    }
  }

  processing.value = false
}

onMounted(() => {
  emailInput.value?.focus()
})
</script>

<style setup>
</style>
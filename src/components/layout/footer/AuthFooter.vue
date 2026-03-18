<template>
  <div class="flex flex-col ali-items-center">
    <div class="flex jus-content-center ali-items-center w-425 h-70 text-secondary">
      <div class="flex flex-0-0-auto ali-items-center min-w-0 fs-14 text-footer">
        <div class="inline-flex pos-relative min-w-0 w-fit-content h-100pct" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
          <div class="inline-flex ali-items-center w-100pct">
            <div class="flex pos-relative ali-items-center min-w-0 h-100pct mx-8 fs-14 text-footer text-decoration-none hover:text-yellow cursor-pointer">
              <svg class="mr-4" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C14.364 2 16.301 6.051 16.484 11.2H21V13H16.477C16.252 18.053 14.333 22 12 22C9.667 22 7.748 18.053 7.522 13H3V11.2H7.516C7.699 6.051 9.636 2 12 2ZM9.324 13C9.429 15.146 9.864 17.006 10.46 18.332C11.224 20.029 11.907 20.2 12 20.2C12.093 20.2 12.776 20.029 13.54 18.332C14.137 17.006 14.571 15.146 14.676 13H9.324ZM12 3.8C11.907 3.8 11.224 3.971 10.46 5.668C9.845 7.035 9.403 8.97 9.316 11.2H14.684C14.597 8.97 14.155 7.035 13.54 5.668C12.776 3.971 12.093 3.8 12 3.8Z" fill="currentColor"/>
                <path d="M20.698 11.83C20.698 9.54913 19.7919 7.36169 18.1791 5.74887C16.5663 4.13606 14.3789 3.22999 12.098 3.22999C9.81714 3.22999 7.62969 4.13606 6.01688 5.74887C4.40407 7.36169 3.498 9.54913 3.498 11.83C3.498 14.1109 4.40407 16.2983 6.01688 17.9111C7.62969 19.5239 9.81714 20.43 12.098 20.43C14.3789 20.43 16.5663 19.5239 18.1791 17.9111C19.7919 16.2983 20.698 14.1109 20.698 11.83ZM22.498 11.83C22.498 17.573 17.842 22.23 12.098 22.23C6.354 22.23 1.698 17.573 1.698 11.83C1.698 6.08599 6.354 1.42999 12.098 1.42999C17.842 1.42999 22.498 6.08599 22.498 11.83Z" fill="currentColor"/>
              </svg>
              <div class="inline min-w-0 text-secondary hover:text-yellow">
                {{ currentLanguageLabel }}
              </div>
            </div>
          </div>
          <div :class="isOpen ? 'overflow-visible opacity-1 visibility-visible' : 'overflow-hidden opacity-0 visibility-hidden'" class="inline-flex pos-absolute z-1400 bottom-100pct left-50pct w-max-content fs-14 fw-400 lh-22 transform-translate--50pct-0 transition-opacity-visibility transition-dur-250 transition-timing-ease-in-out">
            <div class="pos-relative z-1 max-w-none br-8 bg-card shadow-2">
              <div class="flex overflow-y-auto min-w-0">
                <div class="grid grid-template-col-1fr min-w-0 w-250 p-24 gap-24">
                  <div class="min-w-0 w-196 h-370">
                    <div class="min-w-0 text-primary">
                      <div class="min-w-0 mb-16 fs-14 fw-400 lh-20 text-tertiary">
                        {{  t("auth.footer.language") }}
                      </div>
                      <div class="inline-flex flex-nowrap ali-items-center w-100pct max-w-100vw h-32 px-12 gap-8 fs-14 text-primary border-solid-1 border-input br-8 bg-none transition-all transition-dur-250 transition-timing-ease-in-out">
                        <input
                          class="flex-1 min-w-0 w-100pct fs-14 fw-500 lh-22 caret-yellow bg-none appearance-none"
                          @keypress.space.prevent
                          type="text"
                          id="search"
                          name="search"
                          v-model="search"
                          maxlength="50"
                          :placeholder="t('auth.footer.language')"
                          ref="searchInput"
                        />
                      </div>
                      <div class="overflow-auto min-w-0 h-300 mt-16">
                        <div
                          v-for="(lang, index) in filteredLanguages"
                          :key="lang.code"
                          class="min-w-0 fs-14 fw-500 lh-22 hover:text-link cursor-pointer"
                          :class="[lang.code === currentLanguage ? 'text-link' : 'text-primary', index > 0 ? 'mt-16' : '']"
                          @click="selectLanguage(lang)"
                        >
                          {{ lang.codeName }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-16 hover:text-link cursor-pointer">Cookies</div>
      <div @click="goPage('Privacy', false, true)" class="mx-16 hover:text-link cursor-pointer">Privacy</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { goPage } from "@/modules/utils/util"
import useStore from "@/stores"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const store = useStore()

const search = ref("")
const isOpen = ref(false)

const currentLanguage = computed(() => store.language.currentLanguage)
const allLanguages = computed(() => store.language.allLanguages)

const currentLanguageLabel = computed(() => {
  const language = allLanguages.value.find((lang) => lang.code === currentLanguage.value)
  return language?.codeName ?? currentLanguage.value.toUpperCase()
})

const filteredLanguages = computed(() => {
  const searchLanguage = search.value.trim().toLowerCase()
  if (!searchLanguage) return allLanguages.value
  return allLanguages.value.filter((language) =>
    language.codeName.toLowerCase().includes(searchLanguage) || language.code.toLowerCase().includes(searchLanguage)
  )
})

const selectLanguage = (language: { code: string; codeName: string }) => {
  store.language.setLanguage(language.code)
  isOpen.value = false
  search.value = ""
}
</script>

<style setup>
</style>

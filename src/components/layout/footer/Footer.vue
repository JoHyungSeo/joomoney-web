<template>
  <footer class="common-footer">
    <div class="common-links">
      <div
        class="lang-wrapper"
        @mouseenter="isOpen = true"
        @mouseleave="isOpen = false"
      >
        <div
          class="lang-trigger"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
        >
          <img
            :src="isHover
              ? '/assets/images/icons/network-yellow.svg'
              : '/assets/images/icons/network.svg'"
            style="width: 16px;"
          />
          <div class="color" style="padding-left: 4px;">
            {{ currentLanguageLabel }}
          </div>
        </div>

        <!-- ✅ 트랜지션 적용 -->
        <transition name="dropdown">
          <div v-show="isOpen" class="lang-dropdown">
            <div style="font-size: 14px; font-weight: 400; color: #929AA5;">
              Language
            </div>
            <input
              type="text"
              v-model="search"
              placeholder="Search"
              style="
                height: 36px;
                font-size: 14px;
                font-weight: 400;
                margin-top: 20px;
                border-radius: 8px;
              "
            />
            <div class="lang-list">
              <div
                v-for="lang in filteredLanguages"
                :key="lang.code"
                class="lang-item"
                @click="selectLanguage(lang)"
              >
                {{ lang.codeName }}
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="color" @click="goPage('Cookie')" style="display: flex; align-items: center; cursor: pointer;">Cookie</div>
      <div class="color" @click="goPage('Terms')" style="display: flex; align-items: center; cursor: pointer;">Terms</div>
      <div class="color" @click="goPage('Privacy')" style="display: flex; align-items: center; cursor: pointer;">Privacy</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { goPage } from "@/modules/utils/util";
import useStore from "@/stores";

const store = useStore();

const search = ref("");
const isHover = ref(false);
const isOpen = ref(false);

</script>

<style scoped>
.lang-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.lang-trigger {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 0px;
}

.lang-dropdown {
  position: absolute;
  border-radius: 8px;
  width: 240px;
  height: 400px;
  background-color: #202630;
  padding: 24px;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 0px);
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0px 14px rgba(0, 0, 0, .4), 0px 0px 6px rgba(0, 0, 0, .2), inset 0px 0px 2px hsla(0, 0%, 100%, .2);
}

/* transition */
.dropdown-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}

.lang-list {
  margin-top: 20px;
  flex: 1;
  overflow-y: auto;
  min-height: 200px;
}

.lang-item {
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 400;
  color: #EAECEF;
  cursor: pointer;
  margin-top: 12px;
  transition: color 0.3s ease;
}

.lang-item:hover {
  color: #F0B90B;
}
</style>

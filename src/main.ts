import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from '@/App.vue'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import router from './router'
import i18n from './modules/i18n'
import '@/style.css'
import '@/assets/css/index.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)   // Pinia 플러그인 주입
app.use(router)  // Router 주입
app.use(i18n)    // 다국어 주입

app.mount('#app') // 마지막에 mount

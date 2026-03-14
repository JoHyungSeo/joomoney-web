import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from '@/App.vue'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import router from './router'
import i18n from './modules/i18n'
import '@/assets/scss/index.scss'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')

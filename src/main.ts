import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import ActionCards from './components/ActionCards.vue'
import GameTable from './components/GameTable.vue'
import Toast, { PluginOptions } from 'vue-toastification'
import {createRouter, createWebHashHistory} from "vue-router";
import 'vue-toastification/dist/index.css'
import {CheckCircle} from "lucide-vue-next";
import en from './locales/en.json'
import de from './locales/de.json'
import {createI18n} from "vue-i18n";

const routes = [
    { name: 'Home', path: '/', component: ActionCards },
    { name: 'Game', path: '/:identifier', component: GameTable }
]

const pinia = createPinia()
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

const i18n = createI18n({
    locale: 'en',
    messages: {
        'en': en,
        'de': de
    }
})

const options: PluginOptions = {
    timeout: 2500,
    hideProgressBar: true,
    closeButton: false,
    icon: CheckCircle
}

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Toast, options)
app.use(i18n)

app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import ActionCards from './components/ActionCards.vue'
import GameTable from './components/GameTable.vue'
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    { name: 'Home', path: '/', component: ActionCards },
    { name: 'Game', path: '/:identifier', component: GameTable }
]

const pinia = createPinia()
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

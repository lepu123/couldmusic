import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import {Tabbar, TabbarItem, Icon, Search, NavBar, Swipe, SwipeItem, Popup, Slider, NoticeBar, Tab, Tabs} from "vant";

import './assets/reset.css'
import './assets/main.css'
import 'vant/lib/index.css'

const app = createApp(App)
const vantConfig = [
    Tabbar, TabbarItem, Icon, Search, NavBar, Swipe, SwipeItem, Popup, Slider, NoticeBar, Tab, Tabs
]

app.use(createPinia())
app.use(router)
vantConfig.forEach(Component => {
    app.use(Component)
})

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../../resources/css/theme.css'

require('./bootstrap');
createApp(App)
    .use(router)
    .mount('#app')


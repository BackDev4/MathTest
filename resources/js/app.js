import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVueNext from "bootstrap-vue-next";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

require('./bootstrap');
const app = createApp(App)

app
    .use(router)
    .use(BootstrapVueNext)
    .mount('#app')

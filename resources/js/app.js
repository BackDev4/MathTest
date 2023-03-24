import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVueNext from "bootstrap-vue-next";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import {BModal} from "bootstrap-vue-next";

require('./bootstrap');
const app = createApp(App)

app
    .component('b-modal', BModal)
    .use(router)
    .use(BootstrapVueNext)
    .mount('#app')

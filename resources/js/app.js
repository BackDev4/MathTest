import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";

import BootstrapVueNext from "bootstrap-vue-next";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import { BModal, BToast, BToastPlugin } from "bootstrap-vue-next";

require('./bootstrap');
const app = createApp(App);

app
    .mixin({
        methods: {
            clearBodyPaddingLeft() {
                const padding = document.body.style.paddingLeft

                if (this.$route.path.split('/')[1] !== 'home' && padding) document.body.style.paddingLeft = ''
            }
        },
        watch: {
            '$route.path'() {
                this.clearBodyPaddingLeft()
            }
        },
        mounted() {
        }
    })
    .component('b-modal', BModal)
    .component('b-toast', BToast)
    .use(BToastPlugin)
    .use(store)
    .use(router)
    .use(BootstrapVueNext)
    .mount('#app')

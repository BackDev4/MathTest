import {createApp} from 'vue';
import App from './App.vue';
import router from './router';

import BootstrapVueNext from "bootstrap-vue-next";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import {BModal} from "bootstrap-vue-next";

require('./bootstrap');
const app = createApp(App);

app
    .mixin({
        methods: {
            clearBodyPaddingLeft() {
                const padding = document.body.style.paddingLeft

                if (this.$route.path !== '/home' && padding) document.body.style.paddingLeft = ''
            }
        },
        watch: {
            '$route.path'() {
                this.clearBodyPaddingLeft()
            }
        }
    })
    .component('b-modal', BModal)
    .use(router)
    .use(BootstrapVueNext)
    .mount('#app')

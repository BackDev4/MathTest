import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "../pages/MainPage.vue";
import ControlPage from "../pages/ControlPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/home',
        component: ControlPage
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;

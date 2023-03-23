import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "../pages/MainPage.vue";
import ControlPage from "../pages/ControlPage.vue";
import ThemeSelectionPage from "../pages/ThemeSelectionPage.vue";
import CreatingTheme from "../pages/CreatingTheme.vue";
import Theme from "../pages/Theme.vue";
import Test from "../pages/Test.vue";
import ChangeTheme from "../pages/ChangeTheme.vue";

const routes = [
    // {
    //     path: '/',
    //     component: MainPage
    // },
    {
        path: '/home',
        component: ControlPage
    },
    {
        path: '/themes',

        children: [
            {
                path: '',
                component: ThemeSelectionPage
            },
            {
                path: 'create',
                component: CreatingTheme
            },
            {
                path: 'change/:id',
                component: ChangeTheme
            }
        ]
    },
    {
        path: '/theme',

        children: [
            {
                path: ':id',
                component: Theme
            }
        ]
    },
    {
        path: '/test',

        children: [
            {
                path: ':id',
                component: Test
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;

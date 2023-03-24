import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "../pages/MainPage.vue";
import AdminPanel from "../pages/AdminPanel.vue";
import ThemeSelectionPage from "../pages/ThemeSelectionPage.vue";
import CreatingTheme from "../pages/CreatingTheme.vue";
import Theme from "../pages/Theme.vue";
import Test from "../pages/Test.vue";
import ChangeTheme from "../pages/ChangeTheme.vue";
import Users from "../pages/Users.vue";


const routes = [
    // {
    //     path: '/',
    //     component: MainPage
    // },
    {
        path: '/home',
        component: AdminPanel
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
    {
        path: '/users',
        component: Users
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;

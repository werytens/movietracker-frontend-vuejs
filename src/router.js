import { createRouter, createWebHistory } from 'vue-router';

import Login from './pages/Login.vue'
import MyProfile from './pages/MyProfile.vue'
import UserProfile from './pages/UserProfile.vue'

import { myApi } from './api';

const loginCheck = async () => {
    const token = localStorage.getItem('authFilmsToken');
    if (token) {
        const response = await myApi.me(token);
        if (response.data.isOk) {
            return true
        }
    }

    return false
}

const auth = await loginCheck()


const publicRoutes = [
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: '/:username',
        name: 'UserProfile',
        component: UserProfile
    },
    {
        path: "/:pathMatch(.*)*",
        component: Login 
    }
];

const privateRoutes = [
    {
        path: '/profile',
        name: "Profile",
        component: MyProfile
    },
    {
        path: "/:pathMatch(.*)*",
        component: UserProfile 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: auth ? privateRoutes : publicRoutes,
});

export default router;

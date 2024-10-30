import { createRouter, createWebHistory } from 'vue-router';

const routers = [
    {
        path: '/',
        name: 'home',
        redirect: '/basic'
    },
    {
        path: '/basic',
        name: 'basic',
        component: () => import('./views/basic.vue')
    },
    {
        path: '/data',
        name: 'data',
        component: () => import('./views/data.vue')
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: () => import('./views/feedback.vue')
    },
    {
        path: '/others',
        name: 'others',
        component: () => import('./views/others.vue')
    },
    {
        path: '/form',
        name: 'form',
        component: () => import('./views/form.vue')
    },
    {
        path: '/navigation',
        name: 'navigation',
        component: () => import('./views/navigation.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routers
});

export default router;

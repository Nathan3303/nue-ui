import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
    path: '/custom',
    name: 'custom-home',
    redirect: '/custom/custom1',
    component: () => import('@/views/custom/index.vue'),
    children: [
        { path: '/custom/custom1', component: () => import('@/layouts/custom/custom1.vue') },
        { path: '/custom/custom2', component: () => import('@/layouts/custom/custom2.vue') },
        { path: '/custom/custom3', component: () => import('@/layouts/custom/custom3.vue') }
    ]
};

export default routes;

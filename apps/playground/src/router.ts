import { createRouter, createWebHistory } from 'vue-router';
import componentRoutes from '@/views/component/routes';
import customRoutes from '@/views/custom/routes';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/component',
            children: [componentRoutes, customRoutes]
        }
    ]
});

export default router;
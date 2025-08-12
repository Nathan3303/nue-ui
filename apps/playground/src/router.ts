import { createRouter, createWebHistory } from 'vue-router';

const componentRoutes = [
    {
        path: '/component',
        name: 'component-home',
        component: () => import('./layouts/components.vue'),
        redirect: '/component/button',
        children: [
            { path: '/component/button', component: () => import('./components/button.vue') },
            {
                path: '/component/container',
                component: () => import('./components/container.vue')
            },
            { path: '/component/link', component: () => import('./components/link.vue') },
            { path: '/component/text', component: () => import('./components/text.vue') },
            { path: '/component/icon', component: () => import('./components/icon.vue') },
            { path: '/component/avatar', component: () => import('./components/avatar.vue') },
            { path: '/component/badge', component: () => import('./components/badge.vue') },
            { path: '/component/collapse', component: () => import('./components/collapse.vue') },
            {
                path: '/component/infinite-scroll',
                component: () => import('./components/infinite-scroll.vue')
            },
            { path: '/component/marquee', component: () => import('./components/marquee.vue') },
            { path: '/component/progress', component: () => import('./components/progress.vue') },
            { path: '/component/empty', component: () => import('./components/empty.vue') },
            { path: '/component/input', component: () => import('./components/input.vue') },
            { path: '/component/textarea', component: () => import('./components/textarea.vue') },
            { path: '/component/select', component: () => import('./components/select.vue') },
            { path: '/component/switch', component: () => import('./components/switch.vue') },
            { path: '/component/checkbox', component: () => import('./components/checkbox.vue') },
            { path: '/component/confirm', component: () => import('./components/confirm.vue') },
            { path: '/component/drawer', component: () => import('./components/drawer.vue') },
            { path: '/component/dialog', component: () => import('./components/dialog.vue') },
            { path: '/component/message', component: () => import('./components/message.vue') },
            { path: '/component/prompt', component: () => import('./components/prompt.vue') },
            { path: '/component/tooltip', component: () => import('./components/tooltip.vue') },
            { path: '/component/divider', component: () => import('./components/divider.vue') },
            { path: '/component/dropdown', component: () => import('./components/dropdown.vue') },
            {
                path: '/component/breadcrumb',
                component: () => import('./components/breadcrumb.vue')
            }
        ]
    }
];

const customRoutes = [
    {
        path: '/custom',
        name: 'custom-home',
        redirect: '/custom/custom1',
        component: () => import('./layouts/customs.vue'),
        children: [
            { path: '/custom/custom1', component: () => import('./customs/custom1.vue') },
            { path: '/custom/custom2', component: () => import('./customs/custom2.vue') }
        ]
    }
];

const shadlikeRoutes = [
    {
        path: '/shadlike',
        name: 'shadlike-home',
        redirect: '/shadlike/button',
        component: () => import('./layouts/shadlike.vue'),
        children: [
            { path: '/shadlike/button', component: () => import('./shadlike/button.vue') },
            { path: '/shadlike/link', component: () => import('./shadlike/link.vue') },
            { path: '/shadlike/avatar', component: () => import('./shadlike/avatar.vue') },
            { path: '/shadlike/collapse', component: () => import('./shadlike/collapse.vue') },
            { path: '/shadlike/checkbox', component: () => import('./shadlike/checkbox.vue') },
            { path: '/shadlike/div', component: () => import('./shadlike/div.vue') },
            { path: '/shadlike/badge', component: () => import('./shadlike/badge.vue') },
            { path: '/shadlike/dialog', component: () => import('./shadlike/dialog.vue') },
            { path: '/shadlike/dropdown', component: () => import('./shadlike/dropdown.vue') }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/component',
            children: [...componentRoutes, ...customRoutes, ...shadlikeRoutes]
        }
    ]
});

export default router;

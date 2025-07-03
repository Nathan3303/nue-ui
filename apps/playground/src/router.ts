import { createRouter, createWebHistory } from 'vue-router';

const routers = [
    { path: '/', name: 'home', redirect: '/custom' },
    // Custom
    { path: '/custom', component: () => import('./layouts/custom.vue') },
    // Basic components
    { path: '/button', component: () => import('./components/button.vue') },
    {
        path: '/container',
        component: () => import('./components/container.vue')
    },
    // { path: '/div', component: () => import('./components/div.vue') },
    { path: '/link', component: () => import('./components/link.vue') },
    { path: '/text', component: () => import('./components/text.vue') },
    { path: '/icon', component: () => import('./components/icon.vue') },
    { path: '/avatar', component: () => import('./components/avatar.vue') },
    { path: '/badge', component: () => import('./components/badge.vue') },
    { path: '/collapse', component: () => import('./components/collapse.vue') },
    {
        path: '/infinite-scroll',
        component: () => import('./components/infinite-scroll.vue')
    },
    { path: '/marquee', component: () => import('./components/marquee.vue') },
    { path: '/progress', component: () => import('./components/progress.vue') },
    { path: '/empty', component: () => import('./components/empty.vue') },
    { path: '/input', component: () => import('./components/input.vue') },
    { path: '/textarea', component: () => import('./components/textarea.vue') },
    { path: '/select', component: () => import('./components/select.vue') },
    { path: '/switch', component: () => import('./components/switch.vue') },
    { path: '/checkbox', component: () => import('./components/checkbox.vue') },
    { path: '/confirm', component: () => import('./components/confirm.vue') },
    { path: '/drawer', component: () => import('./components/drawer.vue') },
    { path: '/dialog', component: () => import('./components/dialog.vue') },
    { path: '/message', component: () => import('./components/message.vue') },
    { path: '/prompt', component: () => import('./components/prompt.vue') },
    { path: '/tooltip', component: () => import('./components/tooltip.vue') },
    { path: '/divider', component: () => import('./components/divider.vue') },
    { path: '/dropdown', component: () => import('./components/dropdown.vue') },
    {
        path: '/breadcrumb',
        component: () => import('./components/breadcrumb.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routers
});

export default router;

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
    path: '/component',
    name: 'component',
    component: () => import('./index.vue'),
    redirect: '/component/button',
    children: [
        { path: '/component/button', component: () => import('@/layouts/component/button.vue') },
        {
            path: '/component/container',
            component: () => import('@/layouts/component/container.vue')
        },
        { path: '/component/link', component: () => import('@/layouts/component/link.vue') },
        { path: '/component/text', component: () => import('@/layouts/component/text.vue') },
        { path: '/component/icon', component: () => import('@/layouts/component/icon.vue') },
        { path: '/component/avatar', component: () => import('@/layouts/component/avatar.vue') },
        { path: '/component/badge', component: () => import('@/layouts/component/badge.vue') },
        {
            path: '/component/collapse',
            component: () => import('@/layouts/component/collapse.vue')
        },
        {
            path: '/component/infinite-scroll',
            component: () => import('@/layouts/component/infinite-scroll.vue')
        },
        { path: '/component/marquee', component: () => import('@/layouts/component/marquee.vue') },
        {
            path: '/component/progress',
            component: () => import('@/layouts/component/progress.vue')
        },
        { path: '/component/empty', component: () => import('@/layouts/component/empty.vue') },
        { path: '/component/input', component: () => import('@/layouts/component/input.vue') },
        {
            path: '/component/textarea',
            component: () => import('@/layouts/component/textarea.vue')
        },
        { path: '/component/select', component: () => import('@/layouts/component/select.vue') },
        { path: '/component/switch', component: () => import('@/layouts/component/switch.vue') },
        {
            path: '/component/checkbox',
            component: () => import('@/layouts/component/checkbox.vue')
        },
        { path: '/component/confirm', component: () => import('@/layouts/component/confirm.vue') },
        { path: '/component/drawer', component: () => import('@/layouts/component/drawer.vue') },
        { path: '/component/dialog', component: () => import('@/layouts/component/dialog.vue') },
        { path: '/component/message', component: () => import('@/layouts/component/message.vue') },
        { path: '/component/prompt', component: () => import('@/layouts/component/prompt.vue') },
        { path: '/component/tooltip', component: () => import('@/layouts/component/tooltip.vue') },
        { path: '/component/divider', component: () => import('@/layouts/component/divider.vue') },
        {
            path: '/component/dropdown',
            component: () => import('@/layouts/component/dropdown.vue')
        },
        {
            path: '/component/breadcrumb',
            component: () => import('@/layouts/component/breadcrumb.vue')
        },
        { path: '/component/div', component: () => import('@/layouts/component/div.vue') },
        {
            path: '/component/date-picker',
            component: () => import('@/layouts/component/date-picker.vue')
        },
        {
            path: '/component/scroll-bar',
            component: () => import('@/layouts/component/scroll-bar.vue')
        }
    ]
};

export default routes;
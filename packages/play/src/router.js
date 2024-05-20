import { createRouter, createWebHashHistory } from "vue-router";

const routers = [
    {
        path: "/",
        name: "home",
        redirect: "/basic",
    },
    {
        path: "/basic",
        name: "basic",
        component: () => import("./views/basic-view.vue"),
    },
    {
        path: "/data",
        name: "data",
        component: () => import("./views/data-view.vue"),
    },
    {
        path: "/feedback",
        name: "feedback",
        component: () => import("./views/feedback-view.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routers,
});

export default router;

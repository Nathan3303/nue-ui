import type { App, Component, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(components: Plugin[]) {
    const installer = (app: App) => {
        for (const comp of components) {
            app.use(comp);
        }
    };
    return installer;
}

export function withInstall<T>(component: T) {
    (component as SFCWithInstall<T>).install = (app: App) => {
        const name = (component as Component).name as string;
        app.component(name, component as Plugin);
    };
    return component as SFCWithInstall<T>;
}
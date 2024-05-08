import type { App, Plugin } from "vue";
import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(components: Plugin[]) {
    const installer = (app: App) => {
        return each(components, (comp) => {
            app.use(comp);
        });
    };
    return installer;
}

export function withInstall<T>(component: T) {
    (component as SFCWithInstall<T>).install = (app: App) => {
        const name = (component as any).name;
        app.component(name, component as Plugin);
    };
    return component as SFCWithInstall<T>;
}

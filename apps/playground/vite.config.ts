import { defineConfig, lazyPlugins } from 'vite-plus';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// 版本号取自已发布包（packages/core 即 `nue-ui`），避免外壳里再写一份
const corePackage = JSON.parse(
    readFileSync(
        fileURLToPath(new URL('../../packages/core/package.json', import.meta.url)),
        'utf8'
    )
) as { version: string };

// https://vite.dev/config/
export default defineConfig({
    plugins: lazyPlugins(() => [vue()]),
    define: {
        __NUE_UI_VERSION__: JSON.stringify(corePackage.version)
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
});
import { defineConfig, lazyPlugins } from 'vite-plus';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: lazyPlugins(() => [vue()]),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
});
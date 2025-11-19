import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import type { PluginOption } from 'vite';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            outDir: 'dist/types',
            tsconfigPath: 'tsconfig.build.json'
        }) as PluginOption,
        terser({
            compress: {
                drop_console: ['log', 'warn'],
                drop_debugger: true,
                passes: 3,
                global_defs: {
                    '@PROD': JSON.stringify(isProd),
                    '@DEV': JSON.stringify(isDev),
                    '@TEST': JSON.stringify(isTest)
                }
            }
        })
    ],
    build: {
        outDir: 'dist/umd',
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'nue-ui',
            fileName: 'index',
            formats: ['umd']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: { vue: 'Vue' },
                assetFileNames: assetInfo => {
                    if (assetInfo.type === 'asset' && assetInfo.name?.endsWith('.css')) {
                        return 'index.css';
                    }
                    return '[name]-[hash][extname]';
                }
            }
        }
    }
});

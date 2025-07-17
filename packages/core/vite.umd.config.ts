import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import useRollupPlugin from './use-rollup-plugin.ts';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { compression } from 'vite-plugin-compression2';
import { removeOldFiles, moveUMDStyleFiles } from './utils.ts';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            outDir: 'dist/types',
            tsconfigPath: 'tsconfig.build.json'
        }),
        compression({ include: /\.(cjs|css)$/i }),
        useRollupPlugin({
            name: 'umd-rollup-plugin',
            beforeBuild: () => removeOldFiles(),
            afterBuild: () => moveUMDStyleFiles()
        }),
        terser({
            compress: {
                drop_console: ['log'],
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
                globals: {
                    vue: 'Vue'
                },
                assetFileNames: assetInfo => {
                    if (assetInfo.name === 'style.css') {
                        return 'index.css';
                    }
                    return assetInfo.name as string;
                }
            }
        }
    }
});

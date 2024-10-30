import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { compression } from 'vite-plugin-compression2';
import { readFile } from 'fs';
import { defer, delay } from 'lodash-es';
import shell from 'shelljs';
import hooksPlugin from './hooks-plugin';
import terser from '@rollup/plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const moveStyles = () => {
    readFile('./dist/umd/index.css.gz', err => {
        if (err) return delay(moveStyles, 800);
        defer(() => shell.cp('./dist/umd/index.css', './dist/index.css'));
    });
};

export default defineConfig({
    plugins: [
        vue(),
        dts({
            outDir: 'dist/types',
            tsconfigPath: 'tsconfig.build.json'
        }),
        compression({ include: /\.(cjs|css)$/i }),
        hooksPlugin({
            fileNames: ['./dist/umd', './dist/index.css'],
            afterBuild: moveStyles
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

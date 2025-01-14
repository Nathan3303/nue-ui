import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import terser from '@rollup/plugin-terser';
import useRollupPlugin from './use-rollup-plugin.ts';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import {
    removeOldFiles,
    moveESStyleFiles,
    touchGlobalTypesFile,
    getComponentNames
} from './utils.ts';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            outDir: 'dist/types',
            tsconfigPath: './tsconfig.build.json'
        }),
        useRollupPlugin({
            name: 'es-rollup-plugin',
            beforeBuild: () => removeOldFiles(),
            afterBuild: () => {
                moveESStyleFiles();
                touchGlobalTypesFile();
            }
        }),
        terser({
            compress: {
                sequences: isProd,
                arguments: isProd,
                drop_console: isProd && ['log'],
                drop_debugger: isProd,
                passes: isProd ? 4 : 1,
                global_defs: {
                    '@PROD': JSON.stringify(isProd),
                    '@DEV': JSON.stringify(isDev),
                    '@TEST': JSON.stringify(isTest)
                }
            },
            format: {
                semicolons: false,
                shorthand: isProd,
                braces: !isProd,
                beautify: !isProd,
                comments: !isProd
            },
            mangle: {
                toplevel: isProd,
                eval: isProd,
                keep_classnames: isDev,
                keep_fnames: isDev
            }
        })
    ],
    build: {
        outDir: 'dist/es',
        minify: false,
        cssCodeSplit: true,
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'nue-ui',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                assetFileNames: assetInfo => {
                    if (assetInfo.name === 'style.css') {
                        return 'index.css';
                    }
                    if (
                        assetInfo.type === 'asset' &&
                        (assetInfo.name as string).endsWith('.css')
                    ) {
                        return 'theme/[name].[ext]';
                    }
                    return assetInfo.name as string;
                },
                manualChunks: id => {
                    if (id.includes('node_modules')) return 'vendor';
                    if (id.includes('/packages/hooks')) return 'hooks';
                    if (
                        id.includes('/packages/utils') ||
                        id.includes('plugin-vue:export-helper')
                    ) {
                        return 'utils';
                    }
                    for (const item of getComponentNames()) {
                        if (id.includes(`/packages/components/${item}`)) {
                            return item;
                        }
                    }
                    return 'main';
                },
                chunkFileNames: () => {
                    if (isProd) return '[name].[hash].js';
                    return '[name].js';
                }
            }
        }
    }
});

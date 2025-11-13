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
    mcComponentNames
} from './utils.ts';
import type { PluginOption } from 'vite';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            outDir: 'dist/types',
            tsconfigPath: './tsconfig.build.json'
        }) as PluginOption,
        terser({
            compress: {
                sequences: isProd,
                arguments: isProd,
                drop_console: isProd && ['log', 'warn'],
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
        }),
        useRollupPlugin({
            name: 'es-rollup-plugin',
            beforeBuild: () => removeOldFiles(),
            afterBuild: () => {
                moveESStyleFiles();
                touchGlobalTypesFile();
            }
        })
    ],
    build: {
        outDir: 'dist/es',
        cssCodeSplit: true,
        cssMinify: true,
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
                    console.log(assetInfo);
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'styles/[name].[ext]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
                manualChunks: id => {
                    // console.log(id);
                    if (id.includes('node_modules')) return 'vendor';
                    else if (id.includes('/packages/hooks')) return 'hooks';
                    else if (id.includes('/packages/utils')) return 'utils';
                    else if (id.includes('/packages/components')) {
                        const names = mcComponentNames.map(n => n.replace(/(nue-)/g, ''));
                        for (const name of names) {
                            if (id.includes(name)) return name;
                        }
                        return 'index';
                    }
                },
                chunkFileNames: () => {
                    if (isProd) return '[name].[hash].js';
                    return '[name].js';
                }
            }
        }
    }
});

import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { existsSync, readdirSync } from 'fs';
import type { PluginOption } from 'vite';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const componentsRoot = resolve(__dirname, '../components');

// 每个组件目录作为一个独立入口（按需引入：nue-ui/es/<name>.js）
const componentEntries = readdirSync(componentsRoot, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('__') && !d.name.startsWith('.'))
    .map(d => d.name)
    .filter(name => existsSync(resolve(componentsRoot, name, 'index.ts')))
    .reduce<Record<string, string>>((acc, name) => {
        acc[name] = resolve(componentsRoot, name, 'index.ts');
        return acc;
    }, {});

// 全量入口（保留 `import { X } from 'nue-ui'` 的既有用法）
const entries = { ...componentEntries, index: resolve(__dirname, './index.ts') };

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
        })
    ],
    build: {
        outDir: 'dist/es',
        cssCodeSplit: true,
        cssMinify: true,
        lib: {
            entry: entries,
            name: 'nue-ui',
            fileName: (_format, entryName) => `${entryName}.js`,
            formats: ['es']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                assetFileNames: assetInfo => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'styles/[name].[ext]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
                chunkFileNames: isProd ? '[name]-[hash].js' : '[name].js'
            }
        }
    }
});
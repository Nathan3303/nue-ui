import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./test-setup.ts'],
        include: ['packages/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        exclude: [
            'node_modules/',
            'dist/',
            '.vitepress/',
            'apps/histoire/',
            '**/*.d.ts',
            '**/types.ts',
            '**/constants.ts',
            '**/index.ts',
            '**/utils.ts',
            'test-setup.ts',
            'vitest.config.ts'
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            exclude: [
                'node_modules/',
                'apps/',
                'dist/',
                '**/*.d.ts',
                '**/*.test.ts',
                '**/*.test.tsx',
                '**/*.spec.ts',
                '**/*.spec.tsx',
                '**/types.ts',
                '**/constants.ts',
                '**/index.ts',
                '**/utils.ts',
                'test-setup.ts',
                'vitest.config.ts'
            ]
        }
    },
    resolve: {
        alias: {
            '@nue-ui/components': resolve(__dirname, './packages/components'),
            '@nue-ui/hooks': resolve(__dirname, './packages/hooks'),
            '@nue-ui/utils': resolve(__dirname, './packages/utils')
        }
    }
});

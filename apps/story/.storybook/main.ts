import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
    stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    framework: '@storybook/vue3-vite',
    docs: {},
    addons: []
};

export default config;

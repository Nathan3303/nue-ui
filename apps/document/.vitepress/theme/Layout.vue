<script setup>
import DefaultTheme from 'vitepress/theme';
import ThemeSwitch from './ThemeSwitch.vue';

const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <template #nav-bar-content-after>
            <ThemeSwitch />
        </template>
    </Layout>
</template>
<template>
    <demo title="基础">
        <nue-breadcrumb>
            <nue-breadcrumb-item>Home</nue-breadcrumb-item>
            <nue-breadcrumb-item>Components</nue-breadcrumb-item>
        </nue-breadcrumb>
    </demo>
    <demo title="整体替换分割符">
        <nue-breadcrumb separator="arrow-right-more">
            <nue-breadcrumb-item>Home</nue-breadcrumb-item>
            <nue-breadcrumb-item>Components</nue-breadcrumb-item>
            <nue-breadcrumb-item>Breadcrumb</nue-breadcrumb-item>
        </nue-breadcrumb>
    </demo>
    <demo title="单一替换分割符">
        <nue-breadcrumb>
            <nue-breadcrumb-item>Home</nue-breadcrumb-item>
            <nue-breadcrumb-item separator="arrow-right-circle"> Components</nue-breadcrumb-item>
            <nue-breadcrumb-item>Breadcrumb</nue-breadcrumb-item>
        </nue-breadcrumb>
    </demo>
    <demo title="引入下拉列表">
        <nue-breadcrumb separator="arrow-right-more">
            <nue-breadcrumb-item>
                <nue-dropdown placement="bottom-center" size="small">
                    <template #trigger="{ trigger }">
                        <li @click="trigger">
                            Home
                            <nue-icon class="state-icon" name="arrow-down" />
                        </li>
                    </template>
                    <nue-link class="nue-dropdown-item" href="/component/button">Button</nue-link>
                    <nue-link class="nue-dropdown-item" href="/component/link">Link</nue-link>
                </nue-dropdown>
            </nue-breadcrumb-item>
            <nue-breadcrumb-item>Breadcrumb</nue-breadcrumb-item>
        </nue-breadcrumb>
    </demo>
    <demo title="路由链接">
        <nue-breadcrumb>
            <nue-breadcrumb-item>
                <nue-link route="/">Index</nue-link>
            </nue-breadcrumb-item>
            <nue-breadcrumb-item>
                <nue-link route="/component/breadcrumb">Breadcrumb</nue-link>
            </nue-breadcrumb-item>
        </nue-breadcrumb>
    </demo>
</template>

<script lang="ts" setup>
import {
    NueIcon,
    NueDropdown,
    NueLink,
    NueBreadcrumb,
    NueBreadcrumbItem
} from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

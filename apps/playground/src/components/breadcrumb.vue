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
            <nue-breadcrumb-item separator="arrow-right-circle">
                Components
            </nue-breadcrumb-item>
            <nue-breadcrumb-item>Breadcrumb</nue-breadcrumb-item>
        </nue-breadcrumb>
    </demo>
    <demo title="引入下拉列表">
        <nue-breadcrumb separator="arrow-right-more">
            <nue-breadcrumb-item>
                <nue-dropdown placement="bottom-start" size="small">
                    <template #default="{ clickTrigger }">
                        <nue-button
                            style="
                                font-size: var(--nue-text-sm);
                                color: var(--nue-primary-color-600);
                                --icon-size: var(--nue-text-xs);
                                gap: 0.25rem;
                            "
                            theme="pure"
                            @click="clickTrigger"
                        >
                            Home
                            <template #append>
                                <nue-icon name="arrow-down" />
                            </template>
                        </nue-button>
                    </template>
                    <template #dropdown>
                        <li>Components</li>
                        <li>Breadcrumb</li>
                    </template>
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
                <nue-link route="/breadcrumb">Breadcrumb</nue-link>
            </nue-breadcrumb-item>
        </nue-breadcrumb>
    </demo>
</template>

<script lang="ts" setup>
import {
    NueIcon,
    NueButton,
    NueDropdown,
    NueLink,
    NueBreadcrumb,
    NueBreadcrumbItem
} from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<template>
    <demo title="基础">
        <nue-div>
            <nue-icon name="setting" />
            <nue-icon name="theme" />
        </nue-div>
    </demo>
    <demo title="大小">
        <nue-div align="center" style="font-size: 1.25rem">
            <nue-icon name="theme" />
            <nue-icon name="theme" style="--nue-icon-size: 1.5rem" />
            <nue-icon name="theme" size="1.75rem" />
            <nue-icon name="theme" size="2rem" />
        </nue-div>
    </demo>
    <demo title="旋转 & 旋转动画时长">
        <nue-div>
            <nue-icon name="loading" spin />
            <nue-icon name="loading" spin spin-speed="5s" />
        </nue-div>
    </demo>
    <demo title="所有图标">
        <nue-div align="center">
            <nue-div
                v-for="name in IconNames"
                :key="name"
                align="center"
                gap="0.5rem"
                width="11rem"
            >
                <nue-icon :name="name" size="1.25rem" />
                <nue-text color="gray" size="0.75rem">
                    {{ name }}
                </nue-text>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueText, NueIcon } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const IconNames = [
    'blank',
    'arrow-right-more',
    'arrow-left-more',
    'menu',
    'time',
    'projects',
    'board',
    'files',
    'drive',
    'history',
    'chat',
    'subscribe',
    'theme',
    'mail',
    'clear-circle',
    'clear',
    'arrow-left-circle',
    'clear-circle-fill',
    'arrow-down-circle',
    'arrow-up-circle',
    'arrow-right-circle',
    'inbox',
    'archive',
    'inbox-fill',
    'square-check-fill',
    'square-check',
    'square',
    'check',
    'priority-1',
    'priority-2',
    'priority-3',
    'select',
    'connection',
    'logo',
    'lock',
    'plus',
    'location',
    'download',
    'upload',
    'picture',
    'refresh',
    'warning',
    'setting',
    'loading',
    'eye',
    'fail',
    'tag',
    'more-vertical',
    'heart',
    'edit',
    'help',
    'success',
    'more',
    'share',
    'calendar',
    'calendar-wrap',
    'filter',
    'delete',
    'search',
    'circle',
    'ring',
    'plus-circle',
    'heart-fill',
    'success-fill',
    'completed',
    'invoices',
    'plus-circle-fill',
    'more2',
    'scan',
    'eye-close',
    'arrow-right',
    'arrow-left',
    'arrow-down',
    'arrow-up'
];
</script>

<style scoped>
.icon-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: 1px solid var(--nue-border-color);
    border-radius: var(--nue-primary-radius);
    line-height: 1;
}
</style>

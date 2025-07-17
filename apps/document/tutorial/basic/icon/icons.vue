<template>
    <nue-div align="stretch" vertical>
        <nue-input v-model="filterText" clearable icon="filter" placeholder="筛选" />
        <div class="icons">
            <nue-div v-for="icon in filteredIcons" :key="icon" class="icon-block">
                <nue-icon size="1.75rem" :name="icon" />
                <nue-text size=".875rem">{{ icon }}</nue-text>
            </nue-div>
        </div>
    </nue-div>
</template>

<script setup>
import { computed, ref } from 'vue';

const filterText = ref('');
const icons = [
    'archive',
    'inbox-fill',
    'inbox',
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
    'files',
    'menu',
    'arrow-right-more',
    'arrow-left-more',
    'projects',
    'board',
    'drive',
    'plus',
    'location',
    'download',
    'upload',
    'picture',
    'history',
    'chat',
    'subscribe',
    'refresh',
    'warning',
    'setting',
    'loading',
    'eye',
    'clear',
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
    'plus-circle-fill',
    'more2',
    'mail',
    'theme',
    'scan',
    'eye-close',
    'arrow-right',
    'arrow-left',
    'arrow-down',
    'arrow-up'
];

const filteredIcons = computed(() => {
    return icons.filter(icon => icon.includes(filterText.value));
});
</script>

<style scoped>
.icons {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    box-sizing: border-box;
    overflow: hidden;

    .icon-block {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        gap: 0.5rem;
        height: 96px;
        background-color: white;
    }
}
</style>

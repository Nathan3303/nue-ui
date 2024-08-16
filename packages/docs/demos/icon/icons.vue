<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="filterText"
            placeholder="Filter icons by name"
            icon="filter"
            clearable></nue-input>
        <div class="icons">
            <nue-div v-for="icon in filteredIcons" :key="icon" class="icon">
                <nue-icon :name="icon"></nue-icon>
                <nue-text>{{ icon }}</nue-text>
            </nue-div>
        </div>
    </nue-div>
</template>

<script setup>
import { computed, ref } from "vue";

const filterText = ref("");
const icons = [
    "archive",
    "archive2",
    "inbox-fill",
    "menu-open",
    "menu-close",
    "inbox",
    "square-check-fill",
    "square-check",
    "square",
    "check",
    "priority-1",
    "priority-2",
    "priority-3",
    "timer",
    "select",
    "switch",
    "connection",
    "in-progress",
    "logo",
    "time",
    "lock",
    "files",
    "menu",
    "arrow-right-more",
    "arrow-left-more",
    "projects",
    "board",
    "drive",
    "plus",
    "todo",
    "write",
    "location",
    "download",
    "upload",
    "picture",
    "history",
    "chat",
    "subscribe",
    "refresh",
    "warning",
    "setting",
    "loading",
    "eye",
    "clear",
    "fail",
    "tag",
    "more-vertical",
    "heart",
    "edit",
    "help",
    "success",
    "more",
    "share",
    "calendar",
    "calendar-wrap",
    "filter",
    "delete",
    "search",
    "circle",
    "ring",
    "plus-circle",
    "heart-fill",
    "success-fill",
    "completed",
    "invoices",
    "plus-circle-fill",
    "more2",
    "mail",
    "theme",
    "scan",
    "eye-close",
    "arrow-right",
    "arrow-left",
    "arrow-down",
    "arrow-up",
];

const filteredIcons = computed(() => {
    return icons.filter((icon) => icon.includes(filterText.value));
});
</script>

<style scoped>
.icons {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
    gap: 1px;
    align-content: center;
    border-radius: var(--primary-radius);
    border: 1px solid var(--divider-color);
    box-sizing: border-box;
    background-color: var(--divider-color);
    overflow: hidden;

    .icon {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        gap: 4px;
        height: 96px;
        background-color: white;

        .nue-icon {
            font-size: var(--text-xxl);
        }

        .nue-text {
            font-size: var(--text-xs);
        }
    }
}
</style>

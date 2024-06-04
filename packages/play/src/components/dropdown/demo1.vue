<template>
    <nue-div align="center">
        <nue-dropdown trigger="hover" text="Hover">
            <template #dropdown>
                <li>trigger="hover"</li>
                <li>text="Hover"</li>
            </template>
        </nue-dropdown>
        <nue-dropdown trigger="click" text="Click">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Click"</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

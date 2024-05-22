<template>
    <nue-div align="center">
        <nue-dropdown text="Open dropdown (left)" align="left">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Open dropdown (left)"</li>
                <li>align="left"</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="Open dropdown (center)" align="center">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Open dropdown (center)"</li>
                <li>align="center"</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="Open dropdown (right)" align="right">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Open dropdown (right)"</li>
                <li>align="right"</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

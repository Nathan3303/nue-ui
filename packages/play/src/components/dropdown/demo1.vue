<template>
    <nue-div align="center">
        <nue-dropdown trigger="hover" text="Open dropdown (hover)">
            <template #dropdown>
                <li>trigger="hover"</li>
                <li>text="Open dropdown (hover)"</li>
            </template>
        </nue-dropdown>
        <nue-dropdown trigger="click" text="Open dropdown (click)">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Open dropdown (click)"</li>
                <li>shape="no-shape"</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

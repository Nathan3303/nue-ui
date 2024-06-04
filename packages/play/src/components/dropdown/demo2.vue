<template>
    <nue-div align="center">
        <nue-dropdown text="Lefty" align="left">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Lefty"</li>
                <li>align="left"</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="Centered" align="center">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Centered"</li>
                <li>align="center"</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="Righty" align="right">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Righty"</li>
                <li>align="right"</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<template>
    <nue-div vertical align="stretch">
        <nue-progress :percentage="10"></nue-progress>
        <nue-progress :percentage="30" :stroke-width="12"></nue-progress>
        <nue-progress
            :percentage="50"
            :stroke-width="18"
            color="#579"></nue-progress>
        <nue-progress
            :percentage="70"
            :stroke-width="24"
            color="#975"
            show-inner-text></nue-progress>
        <nue-progress type="circle" :percentage="90"></nue-progress>
    </nue-div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

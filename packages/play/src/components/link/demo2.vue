<template>
    <nue-div>
        <nue-link theme="btnlike" icon="icon-target">Button Link</nue-link>
        <nue-link :theme="['actived', 'btnlike']" icon="icon-target">
            Actived Button Link
        </nue-link>
    </nue-div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

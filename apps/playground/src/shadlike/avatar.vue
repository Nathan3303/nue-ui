<template>
    <demo title="默认主题">
        <nue-div align="center">
            <nue-avatar src="https://placehold.co/36" />
        </nue-div>
    </demo>
    <demo title="圆角主题" sub-title="round">
        <nue-div align="center">
            <nue-avatar theme="round" src="https://placehold.co/36" />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueAvatar } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

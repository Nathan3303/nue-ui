<template>
    <demo title="基础">
        <nue-progress />
    </demo>
    <demo title="进度">
        <nue-progress :percentage="10" />
    </demo>
    <demo title="粗细">
        <nue-progress :percentage="20" :stroke-width="12" />
    </demo>
    <demo title="颜色">
        <nue-progress :percentage="30" color="#579" />
    </demo>
    <demo title="内联百分比文本">
        <nue-progress :percentage="40" :stroke-width="24" show-inner-text />
    </demo>
    <demo title="环">
        <nue-progress :percentage="50" :scale="1.6" type="circle" />
    </demo>
</template>

<script lang="ts" setup>
import { NueProgress } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

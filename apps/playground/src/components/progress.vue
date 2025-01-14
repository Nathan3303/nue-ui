<template>
    <demo title="Progress 进度">
        <nue-div align="stretch" vertical>
            <nue-progress :percentage="10" />
            <nue-progress :percentage="30" :stroke-width="12" />
            <nue-progress :percentage="50" :stroke-width="18" color="#579" />
            <nue-progress
                :percentage="70"
                :stroke-width="24"
                color="#975"
                show-inner-text
            />
            <nue-progress :percentage="90" type="circle" />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueProgress } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<template>
    <nue-container height="512px">
        <nue-main>
            <nue-aside max-width="32%" min-width="16%" width="24%">左侧栏</nue-aside>
            <nue-separator :disabled="disabled" op-target="previous" />
            <nue-content fill>
                <nue-div style="padding: 1rem">
                    <nue-button theme="small" @click="disabled = !disabled">
                        {{ disabled ? '启用' : '禁用' }}拖拽变宽
                    </nue-button>
                </nue-div>
            </nue-content>
        </nue-main>
    </nue-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const disabled = ref(false);
</script>

<style scoped>
.nue-header,
.nue-main,
.nue-footer {
    color: var(--nue-primary-text-color);
    background-color: var(--nue-primary-color-100);
}
</style>

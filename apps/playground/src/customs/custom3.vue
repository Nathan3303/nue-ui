<script setup lang="ts">
import Demo from '../layouts/demo.vue';
import { NueDiv } from '@nue-ui/components';
</script>

<template>
    <demo title="主色">
        <nue-div wrap="wrap">
            <i class="color-block" style="background-color: var(--nue-primary-color-100)" />
            <i class="color-block" style="background-color: var(--nue-primary-color-200)" />
            <i class="color-block" style="background-color: var(--nue-primary-color-300)" />
            <i class="color-block" style="background-color: var(--nue-primary-color-400)" />
            <i class="color-block" style="background-color: var(--nue-primary-color-500)" />
            <i class="color-block" style="background-color: var(--nue-primary-color-600)" />
            <i class="color-block" style="background-color: var(--nue-primary-color-700)" />
            <i class="color-block" style="background-color: var(--nue-primary-color-800)" />
            <i class="color-block" style="background-color: var(--nue-primary-color-900)" />
        </nue-div>
    </demo>
    <demo title="成功">
        <nue-div wrap="wrap">
            <i class="color-block" style="background-color: var(--nue-success-color-10)" />
            <i class="color-block" style="background-color: var(--nue-success-color-20)" />
            <i class="color-block" style="background-color: var(--nue-success-color-30)" />
            <i class="color-block" style="background-color: var(--nue-success-color-40)" />
            <i class="color-block" style="background-color: var(--nue-success-color-50)" />
        </nue-div>
    </demo>
    <demo title="警告">
        <nue-div wrap="wrap">
            <i
                class="color-block"
                v-for="i in 5"
                :key="i"
                :style="{ backgroundColor: `var(--nue-warning-color-${i}0)` }"
            />
        </nue-div>
    </demo>
    <demo title="错误">
        <nue-div wrap="wrap">
            <i
                class="color-block"
                v-for="i in 5"
                :key="i"
                :style="{ backgroundColor: `var(--nue-error-color-${i}0)` }"
            />
        </nue-div>
    </demo>
    <demo title="阴影">
        <nue-div wrap="wrap">
            <i class="color-block" style="box-shadow: var(--nue-primary-shadow)" />
            <i class="color-block" style="box-shadow: var(--nue-secondary-shadow)" />
        </nue-div>
    </demo>
</template>

<style scoped>
.color-block {
    width: 2rem;
    height: 2rem;
    border-radius: var(--nue-primary-radius);
}
</style>

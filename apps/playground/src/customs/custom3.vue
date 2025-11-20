<script setup lang="ts">
import Demo from '../layouts/demo.vue';
import { NueDiv } from '@nue-ui/components';
</script>

<template>
    <demo title="主色">
        <nue-div wrap="wrap" gap="var(--nue-gap-sm)">
            <i
                class="color-block"
                v-for="(i, idx) in 11"
                :key="i"
                :style="{ backgroundColor: `var(--nue-primary-color-${idx ? idx + '00' : 0})` }"
            />
        </nue-div>
    </demo>
    <demo title="成功">
        <nue-div wrap="wrap" gap="var(--nue-gap-sm)">
            <i
                class="color-block"
                v-for="(i, idx) in 11"
                :key="i"
                :style="{ backgroundColor: `var(--nue-success-color-${idx ? idx + '0' : 0})` }"
            />
        </nue-div>
    </demo>
    <demo title="警告">
        <nue-div wrap="wrap" gap="var(--nue-gap-sm)">
            <i
                class="color-block"
                v-for="(i, idx) in 11"
                :key="i"
                :style="{ backgroundColor: `var(--nue-warning-color-${idx ? idx + '0' : 0})` }"
            />
        </nue-div>
    </demo>
    <demo title="错误">
        <nue-div wrap="wrap" gap="var(--nue-gap-sm)">
            <i
                class="color-block"
                v-for="(i, idx) in 11"
                :key="i"
                :style="{ backgroundColor: `var(--nue-error-color-${idx ? idx + '0' : 0})` }"
            />
        </nue-div>
    </demo>
    <demo title="阴影">
        <nue-div wrap="wrap" gap="var(--nue-gap-sm)">
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

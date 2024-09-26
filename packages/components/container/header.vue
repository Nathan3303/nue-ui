<template>
    <header class="nue-header" :style="styles">
        <div v-if="$slots.logo" class="nue-header__logo">
            <slot name="logo"></slot>
        </div>
        <div v-if="$slots.nav" class="nue-header__navigators">
            <slot name="nav"></slot>
        </div>
        <div v-if="$slots.default" class="nue-header__default">
            <slot></slot>
        </div>
        <div v-if="$slots.ops" class="nue-header__operations">
            <slot name="ops"></slot>
        </div>
        <div v-if="$slots.user" class="nue-header__user">
            <slot name="user"></slot>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { NueHeaderProps } from "./types";

defineOptions({ name: "NueHeader" });
const props = defineProps<NueHeaderProps>();

const styles = computed(() => {
    const { height } = props;
    return {
        "--nue-header-height": height,
    };
});
</script>

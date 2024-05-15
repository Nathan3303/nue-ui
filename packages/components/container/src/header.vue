<template>
    <header class="nue-header" :style="style">
        <div v-if="$slots.logo || $slots.nav" class="nue-header__left">
            <!-- Logo -->
            <div class="nue-header__logo-slot" v-if="$slots.logo">
                <slot name="logo"></slot>
            </div>
            <!-- Navigation -->
            <div class="nue-header__nav-slot" v-if="$slots.nav">
                <slot name="nav"></slot>
            </div>
        </div>
        <slot />
        <div v-if="$slots.ops || $slots.user" class="nue-header__right">
            <!-- Operation -->
            <div class="nue-header__ops-slot" v-if="$slots.ops">
                <slot name="ops"></slot>
            </div>
            <!-- User -->
            <div class="nue-header__user-slot" v-if="$slots.user">
                <slot name="user"></slot>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { parseWidthAndHeight } from "@nue-ui/utils";
import "../style/header.css";

defineOptions({
    name: "NueHeader",
});

const props = defineProps({
    height: {
        type: String,
        default: "60px",
    },
});

const height = parseWidthAndHeight(props.height);
const style = computed(() => {
    return {
        height,
    };
});

defineExpose({
    height,
});
</script>

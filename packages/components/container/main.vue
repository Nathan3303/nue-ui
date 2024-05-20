<template>
    <main class="nue-main" :style="style">
        <!-- Aside -->
        <div v-if="$slots.aside" class="nue-main__aside">
            <slot name="aside"></slot>
        </div>
        <!-- Content -->
        <div v-if="$slots.content" class="nue-main__content">
            <slot name="content"></slot>
        </div>
        <!-- Default slot -->
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
import { useSlots, computed } from "vue";
import "./main.css";

defineOptions({
    name: "NueMain",
});

const props = withDefaults(
    defineProps<{
        asideWidth?: string;
        contentPadding?: string;
    }>(),
    {
        asideWidth: "256px",
        contentPadding: "16px",
    }
);

const slots = useSlots();

const asideWidth = computed(() => {
    if (slots.aside) {
        return props.asideWidth;
    } else {
        return "0px";
    }
});

const style = computed(() => {
    return {
        "--aside-width": asideWidth.value,
        "--content-padding": props.contentPadding,
    };
});
</script>

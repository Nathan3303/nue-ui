<template>
    <footer class="nue-footer" :style="style">
        <slot></slot>
    </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "./footer.css";

defineOptions({ name: "NueFooter" });

const props = defineProps({
    height: {
        type: String,
        default: "60px",
    },
});

const style = computed(() => {
    return { height: props.height };
});
</script>

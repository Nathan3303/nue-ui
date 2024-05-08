<template>
    <div class="nue-collapse">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import type { CollapsePropsType } from "./collapse";
import { useCollapse } from "./collapse";
import "../style/collapse.css";

defineOptions({ name: "NueCollapse" });

const props = withDefaults(defineProps<CollapsePropsType>(), {
    accordion: false,
});

const emit = defineEmits(["update:modelValue"]);

const { activeItems, registActiveItem } = useCollapse(props, emit);

defineExpose({ activeItems, registActiveItem });
</script>

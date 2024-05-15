<template>
    <div class="nue-collapse">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import type { CollapseEmitType, CollapsePropsType } from "./types";
import { useCollapse } from "./collapse";

defineOptions({ name: "NueCollapse" });

const props = withDefaults(defineProps<CollapsePropsType>(), {
    accordion: false,
});

const emit = defineEmits<CollapseEmitType>();

const { activedItems, pushActivedItem } = useCollapse(props, emit);

defineExpose({ activedItems, pushActivedItem });
</script>

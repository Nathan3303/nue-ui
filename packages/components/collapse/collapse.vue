<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CollapseEmitType, CollapsePropsType } from "./types";
import { useCollapse } from "./collapse";
import { parseTheme } from "@nue-ui/utils";

defineOptions({ name: "NueCollapse" });

const emit = defineEmits<CollapseEmitType>();
const props = withDefaults(defineProps<CollapsePropsType>(), {
    accordion: false,
});

const { activedItems, pushActivedItem } = useCollapse(props, emit);

const classes = computed(() => {
    const { theme } = props;
    let list: string[] = [];
    const prefix = "nue-collapse";
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

defineExpose({ activedItems, pushActivedItem });
</script>

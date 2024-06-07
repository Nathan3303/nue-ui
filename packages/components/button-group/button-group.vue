<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { provide, reactive, computed } from "vue";
import type { ButtonGroupProps, ButtonGroupCtxType } from "./types";
import { BUTTON_GROUP_CTX_KEY } from "./constants";
import "./button-group.css";
import { parseTheme } from "@nue-ui/utils";

defineOptions({ name: "NueButtonGroup" });

const props = defineProps<ButtonGroupProps>();

const ButtonGroupCtx = reactive<ButtonGroupCtxType>({
    size: props.size,
    disabled: props.disabled,
});

const classes = computed(() => {
    const { theme } = props;
    let list: string[] = [];
    const prefix = "nue-button-group";
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

provide(BUTTON_GROUP_CTX_KEY, ButtonGroupCtx);
</script>

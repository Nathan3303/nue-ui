<template>
    <div class="nue-button-group">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import "./button-group.css";
import type { ButtonGroupPropsType, ButtonGroupCtxType } from "./types";
import { BUTTON_GROUP_CTX_KEY } from "./constants";
import { provide, reactive } from "vue";

defineOptions({ name: "NueButtonGroup" });

const props = defineProps<ButtonGroupPropsType>();

const ButtonGroupCtx = reactive<ButtonGroupCtxType>({
    size: props.size,
    disabled: props.disabled,
});

provide(BUTTON_GROUP_CTX_KEY, ButtonGroupCtx);
</script>

<template>
    <button
        :title="title"
        :disabled="disabled || loading"
        :style="buttonStyles"
        :class="buttonClasses"
        @click="handleClick">
        <nue-icon
            v-if="iconName"
            :name="iconName"
            :class="{ 'loading-icon': loading }" />
        <div v-if="$slots.default" class="nue-button__text">
            <slot></slot>
        </div>
        <slot name="append"></slot>
    </button>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import type { ButtonPropsType, ButtonEmitsType } from "./types";
import type { ButtonGroupCtxType } from "../button-group/types";
import { parseTheme, parseFlex, throttle } from "@nue-ui/utils";
import { BUTTON_GROUP_CTX_KEY } from "../button-group/constants";
import { NueIcon } from "../icon";
import "./button.css";

defineOptions({ name: "NueButton" });

const ButtonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, {} as ButtonGroupCtxType);
const props = withDefaults(defineProps<ButtonPropsType>(), {
    shape: "square",
    disabled: false,
    loading: false,
    loadingIcon: "loading",
    useThrottle: false,
    throttleDuration: 200,
});
const emit = defineEmits<ButtonEmitsType>();

const iconName = computed(() => {
    const { loading, loadingIcon, icon } = props;
    return loading ? loadingIcon : icon;
});

const size = computed(() => {
    return ButtonGroupCtx?.size || props?.size || undefined;
});

const disabled = computed(() => {
    return ButtonGroupCtx?.disabled || props.disabled || false;
});

const buttonStyles = computed(() => {
    const { flex, align } = props;
    return {
        "--align-y": align,
        "--font-size": size.value,
        "--flex": flex && parseFlex(flex),
    };
});

const buttonClasses = computed(() => {
    const { theme, shape, flat } = props;
    let list: string[] = [];
    let themeList: string[] = [];
    const prefix = "nue-button";
    if (theme) themeList = parseTheme(theme, prefix);
    list = [prefix, ...themeList];
    list.push(`${prefix}--${shape}`);
    if (disabled.value) list.push(`${prefix}--disabled`);
    if (flat) list.push(`${prefix}--flag`);
    return list;
});

const throttledClick = throttle((e: MouseEvent) => {
    emit("click", e);
}, props.throttleDuration);

function handleClick(e: MouseEvent) {
    if (props.useThrottle) {
        throttledClick(e);
    } else {
        emit("click", e);
    }
}
</script>

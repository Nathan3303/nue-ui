<template>
    <div :class="classList" :style="wrapperStyle" :title="title">
        <img
            v-if="src && !loadError"
            :src="src"
            @error="errorHandler($event)"
            :style="imageStyle" />
        <nue-icon v-else-if="icon" :name="icon" :size="iconSize" />
        <slot v-else></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { parseTheme, isString } from "@nue-ui/utils";
import type { AvatarPropsType, AvatarEmitsType } from "./types";
import { AVATAR_SIZE_STRINGS_VALUE } from "./constants";
import { NueIcon } from "../icon";
import "./avatar.css";

defineOptions({ name: "NueAvatar" });

const props = withDefaults(defineProps<AvatarPropsType>(), {
    size: "normal",
    theme: "default",
    shape: "square",
    fit: "cover",
});
const emit = defineEmits<AvatarEmitsType>();

const loadError = ref(false);

const size = computed(() => {
    const { size } = props;
    const normalValue = AVATAR_SIZE_STRINGS_VALUE.normal;
    let result = normalValue;
    if (isString(size) && AVATAR_SIZE_STRINGS_VALUE.hasOwnProperty(size)) {
        result = AVATAR_SIZE_STRINGS_VALUE[size];
    } else {
        result = size as number;
    }
    return result;
});

const wrapperStyle = computed(() => ({ "--size": size.value + "px" }));
const imageStyle = computed(() => ({ objectFit: props.fit }));
const iconSize = computed(() => size.value / 2.5 + "px");

const classList = computed(() => {
    const prefix = "nue-avatar";
    const { theme, shape } = props;
    let classArray: string[] = [];
    classArray = [prefix, ...parseTheme(theme, prefix)];
    classArray.push(`${prefix}--${shape}`);
    return classArray;
});

function errorHandler(e: Event): void {
    loadError.value = true;
    emit("error", e);
}
</script>

<template>
    <div :class="classes">
        <slot name="picture">
            <img
                class="nue-empty__image"
                :style="imageStyle"
                :src="imageSrc"
                alt="Empty image" />
        </slot>
        <nue-text class="nue-empty__description">
            <slot name="description">
                {{ description }}
            </slot>
        </nue-text>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import NueText from "../text/text.vue";
import type { NueEmptyProps } from "./types";
import emptyImage from "./empty.png";
import "./empty.css";
import { parseTheme } from "@nue-ui/utils";

defineOptions({ name: "NueEmpty" });
const props = withDefaults(defineProps<NueEmptyProps>(), {
    imageSrc: emptyImage,
    imageSize: "96px",
    description: "暂无数据",
});

const classes = computed(() => {
    const { theme } = props;
    const prefix = "nue-empty";
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

const imageStyle = computed(() => {
    const { imageSize } = props;
    return {
        "--image-size": imageSize,
    };
});
</script>

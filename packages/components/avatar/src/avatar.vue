<template>
    <div :class="classList" :style="wrapperStyle" :title="title">
        <img
            v-if="src && !loadError"
            :src="src"
            @error="errorHandler($event)"
            :style="imageStyle" />
        <i v-else-if="icon" :class="`iconfont ${icon}`" :style="iconStyle"></i>
        <slot v-else />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { parseTheme, isNumber, addUnit } from "@nue-ui/utils";
import "../style/avatar.css";

defineOptions({ name: "NueAvatar" });

type fitPropType = "fill" | "cover" | "contain" | "none" | "scale-down";

const props = withDefaults(
    defineProps<{
        src?: string;
        icon?: string;
        size?: string | number;
        theme?: string | string[];
        shape?: "square" | "round";
        title?: string;
        fit?: fitPropType;
    }>(),
    {
        size: "normal",
        theme: "default",
        shape: "square",
        fit: "cover",
    }
);

const emit = defineEmits(["error"]);

const sizeStrValues: { [key: string]: number } = {
    small: 24,
    normal: 32,
    medium: 40,
    large: 48,
};
const loadError = ref(false);

const size = computed(() => {
    if (props.size) {
        if (isNumber(props.size)) {
            return addUnit(props.size as number);
        } else {
            return addUnit(sizeStrValues[props.size as string] as number);
        }
    }
});

const wrapperStyle = computed(() => ({ "--size": size.value }));
const imageStyle = computed(() => ({ objectFit: props.fit }));
const iconStyle = computed(() => ({ fontSize: `calc(${size.value} / 2.5)` }));

const classList = computed(() => {
    const prefix = "nue-avatar";
    const { theme, shape } = props;
    let classArray: string[] = [];
    classArray = [prefix, ...parseTheme(theme, prefix)];
    classArray.push(`${prefix}--${shape}`);
    // console.log(classArray);
    return classArray;
});

function errorHandler(e: Event): void {
    loadError.value = true;
    emit("error", e);
}
</script>

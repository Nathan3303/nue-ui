<template>
    <component
        :is="disabled ? 'a' : tag"
        :class="classes"
        :href="disabled || !href ? undefined : href"
        :title="href || undefined"
        :to="to"
        :active-class="activeClass"
        v-bind="$attrs"
        :style="style">
        <i v-if="icon" :class="['iconfont', icon]"></i>
        <span>
            <slot>{{ href }}</slot>
        </span>
        <div v-if="$slots.append" class="nue-link__append">
            <slot name="append"></slot>
        </div>
    </component>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { parseFlexProp, parseTheme } from "@nue-ui/utils";
import "../style/link.css";

defineOptions({ name: "NueLink" });

type RoutePropType = string | { name: string; params?: any } | undefined;

const props = withDefaults(
    defineProps<{
        theme?: string | string[];
        href?: string;
        disabled?: boolean;
        icon?: string;
        route?: RoutePropType;
        flex?: string;
        align?: string;
        size?: string;
    }>(),
    { disabled: false }
);

const tag = ref("a");
const to = ref<RoutePropType>("");
const activeClass = ref("");

watch(
    () => props.route,
    (newValue) => {
        if (newValue) {
            tag.value = "router-link";
            to.value = newValue;
            activeClass.value = "nue-link--actived";
        }
    },
    { immediate: true }
);

const classes = computed(() => {
    let list: string[] = [];
    let themeList: string[] = [];
    const prefix = "nue-link";
    if (props.theme) themeList = parseTheme(props.theme, prefix);
    list = [prefix, ...themeList];
    if (props.disabled) list.push(`${prefix}--disabled`);
    return list;
});

const style = computed(() => {
    const { flex, align, size } = props;
    let styleObj: { [key: string]: string | number } = {};
    if (flex !== undefined) styleObj["--flex"] = parseFlexProp(flex);
    if (align !== undefined) styleObj["--text-align"] = align;
    if (size !== undefined) styleObj["--font-size"] = size;
    return styleObj;
});
</script>

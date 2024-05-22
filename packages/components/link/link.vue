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
        <nue-icon v-if="icon" :name="icon"></nue-icon>
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
import { parseFlex, parseTheme } from "@nue-ui/utils";
import { NueIcon } from "../icon";
import type { LinkPropsType, RoutePropType } from "./types";
import "./link.css";

defineOptions({ name: "NueLink" });

const props = withDefaults(defineProps<LinkPropsType>(), { disabled: false });

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
    return {
        "--flex": flex ? parseFlex(flex) : undefined,
        "--text-align": align,
        "--font-size": size,
    };
});
</script>

<template>
    <component
        :is="disabled ? 'a' : tag"
        :class="classes"
        :href="disabled || !href ? undefined : href"
        :title="href || undefined"
        :to="to"
        :active-class="activeClass"
        v-bind="$attrs"
        :style="styles">
        <nue-icon v-if="icon" :name="icon"></nue-icon>
        <span class="nue-link__content">
            <slot>{{ href }}</slot>
        </span>
        <!-- <div v-if="$slots.append" class="nue-link__append">
        </div> -->
        <slot name="append"></slot>
    </component>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { parseFlex, parseTheme } from "@nue-ui/utils";
import { NueIcon } from "../icon";
import type { LinkProps, RoutePropType } from "./types";
import "./link.css";

defineOptions({ name: "NueLink" });

const props = withDefaults(defineProps<LinkProps>(), {});

const tag = ref("a");
const to = ref<RoutePropType>();
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
    const { theme, disabled } = props;
    const prefix = "nue-link";
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (disabled) list.push(`${prefix}--disabled`);
    return list;
});

const styles = computed(() => {
    const { flex, align, size } = props;
    return {
        "--flex": flex ? parseFlex(flex) : void 0,
        "--text-align": align,
        "--font-size": size,
    };
});
</script>

<template>
    <div :class="classes" :style="styles" :title="title">
        <img v-if="src && !loadError" :src="src" @error="handleError($event)" />
        <nue-icon v-else-if="icon" :name="icon" />
        <slot v-else></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { parseTheme } from "@nue-ui/utils";
import type { AvatarProps, AvatarEmits } from "./types";
import { NueIcon } from "../icon";
import "./avatar.css";

defineOptions({ name: "NueAvatar" });

const emit = defineEmits<AvatarEmits>();
const props = withDefaults(defineProps<AvatarProps>(), {});

const loadError = ref(false);

const styles = computed(() => {
    const { size, fit, rounded } = props;
    return {
        "--size": size,
        "--object-fit": fit,
        "--border-radius": rounded ? "50%" : void 0,
    };
});

const classes = computed(() => {
    const { theme } = props;
    let list: string[] = [];
    const prefix = "nue-avatar";
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

const handleError = (e: Event) => {
    loadError.value = true;
    emit("error", e);
};
</script>

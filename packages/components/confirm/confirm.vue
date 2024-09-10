<template>
    <div :class="classes" ref="confirmRef">
        <div class="nue-confirm__header">
            <nue-text>{{ title }}</nue-text>
            <nue-button icon="clear" theme="pure" @click.stop="close(false)" />
        </div>
        <div class="nue-confirm__content">
            <nue-text>{{ content }}</nue-text>
        </div>
        <div class="nue-confirm__footer">
            <nue-button @click.stop="close(false)">
                {{ cancelButtonText }}
            </nue-button>
            <nue-button theme="primary" @click.stop="close(true)">
                {{ confirmButtonText }}
            </nue-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import NueButton from "../button/button.vue";
import NueText from "../text/text.vue";
import type { ConfirmPropsType } from "./types";
import { parseTheme } from "@nue-ui/utils";

defineOptions({ name: "NueConfirmNodeInner" });
const props = withDefaults(defineProps<ConfirmPropsType>(), {
    title: "Confirm",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
});

const classes = computed(() => {
    const { theme } = props;
    const prefix = "nue-confirm";
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});
</script>

<template>
    <div ref="confirmRef" class="nue-confirm">
        <div class="nue-confirm__header">
            <nue-text>{{ title }}</nue-text>
            <nue-button
                icon="clear"
                theme="pure"
                @click.stop="close(false)" />
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
import { NueButton, NueText } from "../index";
import type { ConfirmPropsType } from "./types";

defineOptions({ name: "NueConfirmNodeInner" });
withDefaults(defineProps<ConfirmPropsType>(), {
    title: "Confirm",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
});
</script>

<template>
    <div ref="confirmRef" class="nue-confirm">
        <div class="nue-confirm__header">
            <nue-text>{{ title }}</nue-text>
            <nue-button
                icon="clear"
                theme="pure"
                @click.stop="handleClose(false)" />
        </div>
        <div class="nue-confirm__content">
            <nue-text>{{ content }}</nue-text>
        </div>
        <div class="nue-confirm__footer">
            <nue-button
                class="nue-confirm__cancel-btn"
                @click.stop="handleClose(false)">
                {{ cancelButtonText }}
            </nue-button>
            <nue-button
                theme="primary"
                class="nue-confirm__confirm-btn"
                @click.stop="handleClose(true)">
                {{ confirmButtonText }}
            </nue-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NueButton, NueText } from "../index";
import type { ConfirmPropsType } from "./types";

defineOptions({ name: "NueConfirmNodeInner" });

const props = withDefaults(defineProps<ConfirmPropsType>(), {
    title: "Confirm",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
});

const confirmRef = ref<HTMLDivElement>();

function handleClose(isPositive: boolean = false) {
    props.callback(isPositive, undefined);
}

onMounted(() => {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            confirmRef.value!.style.marginTop = "0px";
            confirmRef.value!.style.opacity = "1";
        });
    });
});
</script>

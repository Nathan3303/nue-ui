<template>
    <div ref="confirmRef" class="nue-confirm">
        <div class="nue-confirm__header">
            <span>{{ title }}</span>
            <nue-button
                icon="clear"
                theme="icon-only"
                shape="no-border"
                @click.stop="handleClose()" />
        </div>
        <div class="nue-confirm__content">{{ content }}</div>
        <div class="nue-confirm__footer">
            <nue-button
                class="nue-confirm__cancel-btn"
                @click.stop="handleClose()">
                {{ cancelButtonText }}
            </nue-button>
            <nue-button
                class="nue-confirm__confirm-btn"
                @click.stop="handleClose(true)">
                {{ confirmButtonText }}
            </nue-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NueButton } from "../button/index";
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

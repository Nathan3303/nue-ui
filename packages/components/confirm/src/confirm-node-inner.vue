<template>
    <div ref="confirmInner" class="nue-confirm-inner">
        <div class="nue-confirm__header">
            <slot name="header">
                <text>{{ title }}</text>
                <nue-button
                    icon="icon-clear"
                    theme="icon-only"
                    shape="no-border"
                    @click.stop="handleClose()" />
            </slot>
        </div>
        <div class="nue-confirm__content">
            <slot>
                <text>{{ content }}</text>
            </slot>
        </div>
        <div class="nue-confirm__footer">
            <slot name="footer">
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
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NueButton } from "../../index";
import type { ConfirmNodePropsType } from "./types";

defineOptions({ name: "NueConfirmNodeInner" });

const props = withDefaults(defineProps<ConfirmNodePropsType>(), {
    title: "Confirm",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
});

const confirmInner = ref<HTMLDivElement>();

function handleClose(isPositive: boolean = false) {
    props.callback(isPositive, undefined);
}

onMounted(() => {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            confirmInner.value!.style.marginTop = "0px";
            confirmInner.value!.style.opacity = "1";
        });
    });
});
</script>

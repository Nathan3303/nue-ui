<template>
    <teleport to="body">
        <div
            v-if="modelValue"
            class="nue-dialog-wrapper"
            @click.stop="handleCancel"
            ref="dialogWrapperRef"
            :style="styles">
            <div class="nue-dialog" @click.stop>
                <div class="nue-dialog__header">
                    <slot name="header" :close="handleCancel">
                        <nue-text>{{ title }}</nue-text>
                        <nue-button
                            icon="clear"
                            theme="pure"
                            @click="handleCancel" />
                    </slot>
                </div>
                <div class="nue-dialog__content">
                    <slot></slot>
                </div>
                <div class="nue-dialog__footer">
                    <slot
                        name="footer"
                        :cancel="handleCancel"
                        :confirm="handleConfirm"></slot>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, computed } from "vue";
import { NueButton, NueText } from "../";
import type { DialogPropsType, DialogEmitsType } from "./types";
import { isFunction } from "@nue-ui/utils";
import "./dialog.css";

defineOptions({ name: "NueDialog" });

const props = withDefaults(defineProps<DialogPropsType>(), {
    title: "Dialog Title",
});
const emit = defineEmits<DialogEmitsType>();

const dialogWrapperRef = ref<HTMLDivElement>();

const styles = computed(() => {
    const { width, minWidth } = props;
    return {
        "--aside-width": width,
        "--aside-min-width": minWidth,
    };
});

function handleOpenAnimataion() {
    // console.log("open animation", dialogWrapperRef.value);
    requestAnimationFrame(() => {
        if (!dialogWrapperRef.value) return;
        dialogWrapperRef.value.classList.add("nue-dialog-wrapper--open");
    });
}

function handleCloseAnimation(): Promise<boolean> {
    // console.log("close animation", dialogWrapperRef.value);
    return new Promise((resolve) => {
        if (!dialogWrapperRef.value) return;
        dialogWrapperRef.value.classList.remove("nue-dialog-wrapper--open");
        setTimeout(() => resolve(true), 300);
    });
}

function handleCancel() {
    handleCloseAnimation().then(() => {
        emit("update:modelValue", false);
    });
}

async function handleConfirm() {
    if (!isFunction(props.beforeConfirm)) {
        emit("update:modelValue", false);
        return;
    }
    try {
        await new Promise((resolve) => {
            const done = () => resolve(null);
            props.beforeConfirm?.call(null, done);
        });
    } catch (e) {
        e;
    }
    emit("confirm");
    handleCancel();
}

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue) {
            nextTick(() => {
                handleOpenAnimataion();
            });
        }
    }
);
</script>

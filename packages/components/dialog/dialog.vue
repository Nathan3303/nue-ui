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
                        <span>{{ title }}</span>
                        <nue-button
                            theme="icon-only"
                            icon="icon-clear"
                            @click.stop="handleCancel" />
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
import { NueButton } from "../button/index";
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

function handleConfirm() {
    handleCloseAnimation()
        .then(() => {
            if (!isFunction(props.beforeConfirm)) return;
            return new Promise((resolve, reject) => {
                const done = () => resolve("done");
                const back = () => reject("back");
                props.beforeConfirm?.call(null, done, back);
            });
        })
        .catch(() => {})
        .then(() => {
            emit("update:modelValue", false);
        });
}

function handleCancel() {
    handleCloseAnimation().then(() => {
        emit("update:modelValue", false);
    });
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

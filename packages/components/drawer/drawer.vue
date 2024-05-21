<template>
    <transition name="nue-drawer-fade">
        <div
            v-if="visible"
            class="nue-drawer-wrapper"
            @click.stop="handleClickWrapper"
            ref="drawerWrapperRef">
            <div ref="drawerRef" class="nue-drawer" @click.stop>
                <nue-container>
                    <nue-header>
                        <slot name="header" :close="handleClose">
                            <nue-text
                                size="medium"
                                class="nue-drawer__title"
                                flex
                                weight="bold">
                                {{ title }}
                            </nue-text>
                            <nue-button
                                class="edit-button"
                                icon="clear"
                                theme="icon-only"
                                @click.stop="handleClose" />
                        </slot>
                    </nue-header>
                    <nue-main>
                        <template #content>
                            <slot></slot>
                        </template>
                    </nue-main>
                    <nue-footer v-if="$slots.footer">
                        <slot name="footer"></slot>
                    </nue-footer>
                </nue-container>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { nextTick, ref, watchEffect } from "vue";
import {
    NueContainer,
    NueHeader,
    NueMain,
    NueFooter,
    NueText,
    NueButton,
} from "../index";
import type { DrawerPropsType } from "./types";
import { useDrawerZIndex } from "./drawer";
import "./drawer.css";

defineOptions({ name: "NueDrawer" });

const visible = defineModel("visible");
const props = withDefaults(defineProps<DrawerPropsType>(), {
    span: "36%",
    minSpan: "240px",
    closeByButtonOnly: false,
    openFrom: "right",
});

const drawerWrapperRef = ref<HTMLDivElement>();
const drawerRef = ref<HTMLDivElement>();

async function handleClose() {
    const { beforeClose } = props;
    if (!visible.value) return;
    if (beforeClose) {
        await new Promise((resolve) => {
            beforeClose(() => resolve(true));
        });
    }
    visible.value = false;
}

function handleClickWrapper() {
    if (props.closeByButtonOnly) return;
    handleClose();
}

function animateFromTop(
    visible: boolean,
    drawer: HTMLDivElement,
    span: string,
    minSpan: string
) {
    if (visible) {
        drawer.style.width = "100%";
        drawer.style.height = span;
        drawer.style.minHeight = minSpan;
        drawer.style.top = `-${drawer.offsetHeight}px`;
        drawer.offsetHeight;
        drawer.style.top = "0px";
    } else {
        drawer.style.top = `-${drawer.offsetHeight}px`;
    }
}

function animateFromRight(
    visible: boolean,
    drawer: HTMLDivElement,
    span: string,
    minSpan: string
) {
    if (visible) {
        drawer.style.height = "100%";
        drawer.style.width = span;
        drawer.style.minWidth = minSpan;
        drawer.style.top = "0px";
        drawer.style.right = `-${drawer.offsetWidth}px`;
        drawer.offsetWidth;
        drawer.style.right = "0px";
    } else {
        drawer.style.right = `-${drawer.offsetWidth}px`;
    }
}

function animateFromLeft(
    visible: boolean,
    drawer: HTMLDivElement,
    span: string,
    minSpan: string
) {
    if (visible) {
        drawer.style.height = "100%";
        drawer.style.width = span;
        drawer.style.minWidth = minSpan;
        drawer.style.top = "0px";
        drawer.style.left = `-${drawer.offsetWidth}px`;
        drawer.offsetWidth;
        drawer.style.left = "0px";
    } else {
        drawer.style.left = `-${drawer.offsetWidth}px`;
    }
}

function animateFromBottom(
    visible: boolean,
    drawer: HTMLDivElement,
    span: string,
    minSpan: string
) {
    if (visible) {
        drawer.style.width = "100%";
        drawer.style.height = span;
        drawer.style.minHeight = minSpan;
        drawer.style.left = "0px";
        drawer.style.bottom = `-${drawer.offsetHeight}px`;
        drawer.offsetHeight;
        drawer.style.bottom = "0px";
    } else {
        drawer.style.bottom = `-${drawer.offsetHeight}px`;
    }
}

function handleAnimation() {
    const { span, minSpan, openFrom } = props;
    const _visible = visible.value as boolean;
    const _drawer = drawerRef.value as HTMLDivElement;
    if (!_drawer) return;
    switch (openFrom) {
        case "top":
            animateFromTop(_visible, _drawer, span, minSpan);
            break;
        case "right":
            animateFromRight(_visible, _drawer, span, minSpan);
            break;
        case "left":
            animateFromLeft(_visible, _drawer, span, minSpan);
            break;
        case "bottom":
            animateFromBottom(_visible, _drawer, span, minSpan);
            break;
    }
}

watchEffect(() => {
    if (visible.value) {
        nextTick(() => {
            const zIndex = useDrawerZIndex();
            drawerWrapperRef.value.style.zIndex = zIndex.toString();
            handleAnimation();
        });
    } else {
        handleAnimation();
    }
});
</script>

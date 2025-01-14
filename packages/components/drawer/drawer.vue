<template>
    <transition name="nue-drawer-fade">
        <div
            v-if="visible"
            ref="drawerWrapperRef"
            class="nue-drawer-wrapper"
            @click.stop="handleClickWrapper"
        >
            <div ref="drawerRef" class="nue-drawer" @click.stop>
                <nue-container class="vertical,inner">
                    <nue-header class="nue-drawer__header">
                        <slot :close="handleClose" name="header">
                            <nue-text class="nue-drawer__title">
                                {{ title }}
                            </nue-text>
                            <nue-button
                                icon="clear"
                                theme="pure"
                                @click.stop="handleClose"
                            />
                        </slot>
                    </nue-header>
                    <nue-main>
                        <template #content>
                            <slot />
                        </template>
                    </nue-main>
                    <nue-footer v-if="$slots.footer">
                        <slot name="footer" />
                    </nue-footer>
                </nue-container>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { nextTick, ref, watchEffect } from 'vue';
import { NueContainer, NueFooter, NueHeader, NueMain } from '../container';
import NueButton from '../button/button.vue';
import NueText from '../text/text.vue';
import type { DrawerPropsType } from './types';
import { useDrawer } from './drawer';
import './drawer.css';

defineOptions({ name: 'NueDrawer' });

const visible = defineModel('visible');
const props = withDefaults(defineProps<DrawerPropsType>(), {
    span: '36%',
    minSpan: '240px',
    closeByButtonOnly: false,
    openFrom: 'right'
});

const drawerWrapperRef = ref<HTMLDivElement>();
const drawerRef = ref<HTMLDivElement>();
const { setOpened, setClosed } = useDrawer();

async function handleClose() {
    const { beforeClose } = props;
    if (!visible.value) return;
    if (beforeClose) {
        await new Promise(resolve => {
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
        drawer.style.width = '100%';
        drawer.style.height = span;
        drawer.style.minHeight = minSpan;
        drawer.style.top = `-${drawer.offsetHeight}px`;
        drawer.style.left = '0px';
        drawer.offsetHeight;
        drawer.style.top = '0px';
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
        drawer.style.height = '100%';
        drawer.style.width = span;
        drawer.style.minWidth = minSpan;
        drawer.style.right = `-${drawer.clientWidth}px`;
        drawer.style.top = '0px';
        drawer.clientWidth;
        drawer.style.right = '0px';
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
        drawer.style.height = '100%';
        drawer.style.width = span;
        drawer.style.minWidth = minSpan;
        drawer.style.left = `-${drawer.offsetWidth}px`;
        drawer.style.top = '0px';
        drawer.offsetWidth;
        drawer.style.left = '0px';
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
        drawer.style.width = '100%';
        drawer.style.height = span;
        drawer.style.minHeight = minSpan;
        drawer.style.bottom = `-${drawer.offsetHeight}px`;
        drawer.style.left = '0px';
        drawer.offsetHeight;
        drawer.style.bottom = '0px';
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
        case 'top':
            animateFromTop(_visible, _drawer, span, minSpan);
            break;
        case 'right':
            animateFromRight(_visible, _drawer, span, minSpan);
            break;
        case 'left':
            animateFromLeft(_visible, _drawer, span, minSpan);
            break;
        case 'bottom':
            animateFromBottom(_visible, _drawer, span, minSpan);
            break;
    }
}

watchEffect(() => {
    if (!drawerWrapperRef.value) return;
    if (visible.value) {
        nextTick(() => {
            setOpened(drawerWrapperRef.value!);
            handleAnimation();
        });
    } else {
        setClosed(drawerWrapperRef.value!);
        handleAnimation();
    }
});
</script>

<template>
    <teleport v-if="modelValue" :disabled="teleportDisabled" :to="teleportTo">
        <nue-overlay
            :closing="closing"
            :theme="theme"
            class="nue-drawer-overlay"
            @click="handleOverlayClick"
        >
            <div ref="nueDrawerRef" :class="classes" @click.stop>
                <nue-container class="vertical,inner">
                    <nue-header class="nue-drawer__header">
                        <slot :close="handleClose" name="header">
                            <span class="nue-drawer__title">{{ title }}</span>
                            <nue-button icon="clear" theme="pure" @click="() => handleClose()" />
                        </slot>
                    </nue-header>
                    <nue-main>
                        <slot />
                    </nue-main>
                    <nue-footer v-if="$slots.footer">
                        <slot name="footer" />
                    </nue-footer>
                </nue-container>
            </div>
        </nue-overlay>
    </teleport>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch, onUnmounted } from 'vue';
import { NueContainer, NueFooter, NueHeader, NueMain } from '../container';
import NueButton from '../button/button.vue';
import NueOverlay from '../overlay/overlay.vue';
import { generateElementId, parseAnimationDurationToNumber, parseTheme } from '@nue-ui/utils';
import { usePopupPoolV2 } from '../popup-pool-v2';
import { isFunction } from 'lodash-es';
import { playDrawerAnimation } from './animation';
import type { NueDrawerProps, NueDrawerEmits, NueDrawerHandleClose } from './types';
import './drawer.css';

defineOptions({ name: 'NueDrawer' });

const props = withDefaults(defineProps<NueDrawerProps>(), {
    span: '36%',
    minSpan: '240px',
    openFrom: 'right'
});
const emit = defineEmits<NueDrawerEmits>();

const popupPool = usePopupPoolV2();

const nueDrawerRef = ref<HTMLDivElement>();
const drawerAnchor = document.createElement('div');
drawerAnchor.classList.add('nue-drawer-anchor');
drawerAnchor.id = generateElementId();

const closing = ref(false);
const teleportTo = ref('body');
const teleportDisabled = ref(true);

const classes = computed(() => {
    const prefix = 'nue-drawer';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

watch(
    () => props.modelValue,
    newValue => {
        const newVisible = !!newValue;
        nextTick(() => (newVisible ? handleOpen() : handleClose()));
    }
);

const waitForAnimation = (visible: boolean) => {
    if (!nueDrawerRef.value) return;
    nextTick(() => {
        playDrawerAnimation({
            elementRef: nueDrawerRef.value!,
            openFrom: props.openFrom,
            minSpan: props.minSpan,
            span: props.span,
            visible
        });
    });
    const timeout = parseAnimationDurationToNumber(
        window.getComputedStyle(nueDrawerRef.value).transitionDuration
    );
    return new Promise(resolve => setTimeout(() => resolve(1), timeout));
};

const handleOpen = () => {
    closing.value = false;
    emit('update:modelValue', true);
    if (!popupPool.element) return;
    popupPool.element.appendChild(drawerAnchor);
    try {
        teleportTo.value = props.teleportTo || '#' + drawerAnchor.id;
        teleportDisabled.value = false;
        popupPool.setZIndex();
        waitForAnimation(true);
    } catch (err) {
        console.log('[NueDialog] Open Error:', err);
    }
};

const handleClose: NueDrawerHandleClose = async afterAnimation => {
    closing.value = true;
    await waitForAnimation(false);
    if (afterAnimation && isFunction(afterAnimation)) afterAnimation();
    emit('update:modelValue', false);
};

const handleOverlayClick = () => {
    if (!props.allowCloseByOverlay) return;
    handleClose();
};

onUnmounted(() => {
    const drawerAnchorElement = document.getElementById(drawerAnchor.id);
    if (!drawerAnchorElement) return;
    drawerAnchorElement.parentElement?.removeChild(drawerAnchorElement);
});

defineExpose({ open: handleOpen, close: handleClose });
</script>

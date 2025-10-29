<template>
    <teleport v-if="modelValue" :disabled="tpState.disabled" :to="tpState.to">
        <nue-overlay
            class="nue-drawer-overlay"
            :visible="visible"
            :theme="theme"
            @mousedown="handleCloseDrawer"
            @escape="handleCloseDrawer"
        >
            <nue-container
                :class="classes"
                :data-visible="visible"
                :data-direction="openFrom"
                @animationstart="handleAnimationStart"
                @animationend="handleAnimationEnd"
                @mousedown.stop
            >
                <nue-header class="nue-drawer__header">
                    <slot name="header" :close="handleCloseDrawer">
                        <nue-text class="nue-drawer__title" :clamped="1" style="flex: 1">
                            {{ title }}
                        </nue-text>
                        <nue-button
                            icon="clear"
                            theme="icon,ghost,small"
                            :loading="loading"
                            @click="handleCloseDrawer"
                        />
                    </slot>
                </nue-header>
                <nue-main class="nue-drawer__main">
                    <nue-content fill class="nue-drawer__content">
                        <slot :close="handleCloseDrawer" />
                    </nue-content>
                </nue-main>
                <nue-footer class="nue-drawer__footer" v-if="$slots.footer">
                    <slot name="footer" :close="handleCloseDrawer" />
                </nue-footer>
            </nue-container>
        </nue-overlay>
    </teleport>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { NueContainer, NueFooter, NueHeader, NueMain, NueContent } from '../container';
import NueText from '../text/text.vue';
import NueButton from '../button/button.vue';
import NueOverlay from '../overlay/overlay.vue';
import { parseTheme } from '@nue-ui/utils';
import { usePopupAnchor } from '@nue-ui/hooks';
import type { NueDrawerProps, NueDrawerEmits } from './types';
import './drawer.css';

defineOptions({ name: 'NueDrawer' });

const props = withDefaults(defineProps<NueDrawerProps>(), {
    span: '36%',
    minSpan: '240px',
    openFrom: 'right'
});
const emit = defineEmits<NueDrawerEmits>();

const { tpState, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor();
const visible = ref(false);
const loading = ref(false);

const classes = computed(() => {
    const prefix = 'nue-drawer';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const handleOpenDrawer = () => {
    mountPopupAnchor();
    visible.value = true;
};

const onCloseExecutor = () => {
    return new Promise((resolve, reject) => {
        if (!props.onClose) {
            resolve(true);
            return;
        }
        const onCloseRes = props.onClose(() => resolve(true));
        if (!(onCloseRes instanceof Promise)) return;
        onCloseRes.then(isDone => resolve(isDone)).catch(reject);
    });
};

const handleCloseDrawer = async () => {
    if (visible.value === false) return;
    loading.value = true;
    onCloseExecutor()
        .then(isDone => {
            console.log(isDone);
            visible.value = !isDone;
        })
        .catch(e => console.error('[NueDrawer] Close error:', e))
        .finally(() => (loading.value = false));
};

const handleAnimationStart = () => {
    if (visible.value) {
        emit('beforeOpen');
    } else {
        emit('beforeClose');
    }
};

const handleAnimationEnd = () => {
    if (visible.value) {
        emit('afterOpen');
    } else {
        emit('afterClose');
        emit('update:modelValue', false);
        unmountPopupAnchor();
    }
};

watch(
    () => props.modelValue,
    newValue => {
        if (newValue) {
            handleOpenDrawer();
        } else {
            handleCloseDrawer();
        }
    }
);

defineExpose({ open: handleOpenDrawer, close: handleCloseDrawer });
</script>

<template>
    <teleport v-if="modelValue" :disabled="tpState.disabled" :to="tpState.to">
        <nue-overlay
            class="nue-drawer-overlay"
            :visible="visible"
            :theme="theme"
            @mousedown="handleCloseDrawerByOverlay"
            @escape="handleCloseDrawerByOverlay"
        >
            <nue-container
                :class="classes"
                :style="styles"
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
                            @click.stop="handleCloseDrawer"
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
    openFrom: 'right',
    allowCloseByOverlay: false
});
const emit = defineEmits<NueDrawerEmits>();

const { tpState, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor();
const visible = ref(false);
const loading = ref(false);

// @computed 抽屉的类名
const classes = computed(() => {
    const prefix = 'nue-drawer';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

// @computed 抽屉的样式
const styles = computed(() => ({
    '--nue-drawer-span': props.span,
    '--nue-drawer-min-span': props.minSpan
}));

// @method 打开抽屉
const handleOpenDrawer = () => {
    mountPopupAnchor();
    visible.value = true;
};

// @method 抽屉的关闭回调函数执行器
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

// @method 关闭抽屉
const handleCloseDrawer = async () => {
    if (visible.value === false) return;
    loading.value = true;
    onCloseExecutor()
        .then(isDone => (visible.value = !isDone))
        .catch(e => console.error('[NueDrawer] Close error:', e))
        .finally(() => (loading.value = false));
};

// @method 抽屉动画开始时的回调函数
const handleAnimationStart = () => {
    if (visible.value) {
        emit('beforeOpen');
    } else {
        emit('beforeClose');
    }
};

// @method 抽屉动画结束时的回调函数
const handleAnimationEnd = () => {
    if (visible.value) {
        emit('afterOpen');
    } else {
        emit('afterClose');
        emit('update:modelValue', false);
        unmountPopupAnchor();
    }
};

// @method 抽屉点击遮罩层关闭抽屉
const handleCloseDrawerByOverlay = () => {
    if (!props.allowCloseByOverlay) return;
    handleCloseDrawer();
};

// @watch 监听抽屉的显示状态 - 打开或关闭抽屉
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

// @expose 暴露抽屉的打开和关闭方法
defineExpose({ open: handleOpenDrawer, close: handleCloseDrawer });
</script>

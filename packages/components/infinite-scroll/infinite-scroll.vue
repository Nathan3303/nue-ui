<template>
    <div ref="wrapperRef" :style="styles" class="nue-infinite-scroll-wrapper">
        <div class="nue-infinite-scroll">
            <slot />
            <div ref="triggerBarRef" class="nue-infinite-scroll__trigger-bar" />
            <div v-if="loading" class="nue-infinite-scroll__loading-bar">
                <slot name="loading">
                    <nue-icon name="loading" spin />
                    <nue-text size=".875rem">数据加载中...</nue-text>
                </slot>
            </div>
            <div v-if="disabled && !loading" class="nue-infinite-scroll__disable-bar">
                <slot name="disabled">
                    <nue-text color="var(--nue-disabled-color)" size=".875rem">
                        没有更多数据了
                    </nue-text>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import NueText from '../text/text.vue';
import NueIcon from '../icon/icon.vue';
import type { NueInfiniteScrollProps, NueInfiniteScrollEmits } from './types';
import './infinite-scroll.css';

defineOptions({ name: 'NueInfiniteScroll' });
const props = withDefaults(defineProps<NueInfiniteScrollProps>(), {
    triggerHeight: '0px',
    viewport: null,
    root: 'wrapper'
});
const emit = defineEmits<NueInfiniteScrollEmits>();

const wrapperRef = ref<HTMLDivElement>();
const triggerBarRef = ref<HTMLDivElement>();
const observer = ref<IntersectionObserver>();

const styles = computed(() => {
    return {
        '--nue-infinite-scroll-wrapper-height': props.height,
        '--nue-infinite-scroll-trigger-bar-height': props.triggerHeight
    };
});

onMounted(() => {
    if (!triggerBarRef.value) return;
    const { root, rootMargin, threshold } = props;
    observer.value = new IntersectionObserver(
        entries => {
            if (props.disabled) return;
            if (!entries[0].isIntersecting) return;
            emit('loadMore');
        },
        {
            root: root === 'wrapper' ? wrapperRef.value : root,
            rootMargin,
            threshold
        }
    );
    observer.value.observe(triggerBarRef.value);
});
</script>

<template>
    <div ref="wrapperRef" :style="styles" class="infinite-scroll-wrapper">
        <div class="infinite-scroll">
            <slot />
            <div ref="triggerBarRef" class="infinite-scroll__trigger-bar"></div>
            <div v-if="loading" class="infinite-scroll__loading">
                <slot name="loading">
                    <nue-text>数据加载中...</nue-text>
                </slot>
            </div>
            <div v-if="disabled && !loading" class="infinite-scroll__disabled">
                <slot name="disabled">
                    <nue-text color="var(--nue-ui-disabled-color)">
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
import type { InfiniteScrollEmitsType, InfiniteScrollPropsType } from './types';
import './infinite-scroll.css';

defineOptions({ name: 'NueInfiniteScroll' });

const props = withDefaults(defineProps<InfiniteScrollPropsType>(), {
    triggerHeight: '150px',
    disabled: false,
    loading: false,
    viewport: null
});

const emit = defineEmits<InfiniteScrollEmitsType>();

const wrapperRef = ref<HTMLDivElement>();
const triggerBarRef = ref<HTMLDivElement>();
const observer = ref<IntersectionObserver>();

const styles = computed(() => {
    return {
        '--height': props.height,
        '--trigger-bar-height': props.triggerHeight
    };
});

onMounted(() => {
    const triggerBar = triggerBarRef.value;
    const { root, rootMargin, threshold } = props;
    if (triggerBar) {
        observer.value = new IntersectionObserver(
            entries => {
                if (props.disabled) return;
                if (!entries[0].isIntersecting) return;
                emit('loadMore');
                console.log('loadMore');
            },
            {
                root: root === 'wrapper' ? wrapperRef.value : root,
                rootMargin,
                threshold
            }
        );
        observer.value.observe(triggerBar);
    }
});
</script>

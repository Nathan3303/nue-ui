<template>
    <div
        ref="wrapperRef"
        :class="wrapperClasses"
        :data-vertical="verticalState"
        :data-horizontal="horizontalState"
        data-scrollbar-mode="hover"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <div ref="viewportRef" class="nue-scroll-bar__viewport" @scroll="handleScroll">
            <slot />
        </div>
        <!-- 垂直滚动条 -->
        <div
            v-if="verticalState"
            ref="verticalTrackRef"
            class="nue-scroll-bar__track nue-scroll-bar__track--vertical"
            :data-both="bothState"
            @mousedown.prevent="handleTrackClick('vertical', $event)"
        >
            <div
                ref="verticalThumbRef"
                class="nue-scroll-bar__thumb"
                :style="{
                    height: verticalThumbSize,
                    transform: `translateY(${verticalThumbTranslate}px)`
                }"
                @mousedown.stop="startDrag('vertical', $event)"
            />
        </div>
        <!-- 水平滚动条 -->
        <div
            v-if="horizontalState"
            ref="horizontalTrackRef"
            class="nue-scroll-bar__track nue-scroll-bar__track--horizontal"
            :data-both="bothState"
            @mousedown.prevent="handleTrackClick('horizontal', $event)"
        >
            <div
                ref="horizontalThumbRef"
                class="nue-scroll-bar__thumb"
                :style="{
                    width: horizontalThumbSize,
                    transform: `translateX(${horizontalThumbTranslate}px)`
                }"
                @mousedown.stop="startDrag('horizontal', $event)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueScrollBarProps, NueScrollBarEmits } from './types';

defineOptions({ name: 'NueScrollBar' });

const props = withDefaults(defineProps<NueScrollBarProps>(), {
    mode: 'hover',
    vertical: false,
    horizontal: false,
    thumbSize: 'default',
    minThumbSize: 20
});

const emit = defineEmits<NueScrollBarEmits>();

// Refs
const wrapperRef = ref<HTMLDivElement>();
const viewportRef = ref<HTMLDivElement>();
const verticalTrackRef = ref<HTMLDivElement>();
const verticalThumbRef = ref<HTMLDivElement>();
const horizontalTrackRef = ref<HTMLDivElement>();
const horizontalThumbRef = ref<HTMLDivElement>();

// State
const hovering = ref(false);
const dragging = ref<'vertical' | 'horizontal' | null>(null);
/** 滚动滴答计数器 — 每次滚动/尺寸变化时自增，驱动计算属性重新求值 */
const scrollTick = ref(0);

/** 强制触发计算属性重新求值 */
function tick() {
    scrollTick.value++;
}

// Computed
const wrapperClasses = computed(() => {
    const prefix = 'nue-scroll-bar';
    return [
        prefix,
        `nue-scroll-bar--${props.mode}`,
        `nue-scroll-bar--thumb-${props.thumbSize}`,
        ...parseTheme(props.theme, prefix)
    ];
});

const verticalState = computed(() => {
    return props.vertical;
});

const horizontalState = computed(() => {
    return props.horizontal;
});

const bothState = computed(() => {
    return verticalState.value && horizontalState.value;
});

// Size calculations
const verticalThumbSize = computed(() => {
    void scrollTick.value;
    if (!viewportRef.value || !wrapperRef.value || !verticalState.value) return '0px';
    const viewport = viewportRef.value;
    const trackHeight = verticalTrackRef.value?.offsetHeight ?? 0;
    const ratio = viewport.clientHeight / viewport.scrollHeight;
    const size = Math.max(ratio * trackHeight, props.minThumbSize);
    // Ensure thumb doesn't exceed track
    const clamped = Math.min(size, trackHeight);
    return `${clamped}px`;
});

const verticalThumbTranslate = computed(() => {
    void scrollTick.value;
    if (!viewportRef.value || !verticalTrackRef.value || !verticalState.value) return 0;
    const viewport = viewportRef.value;
    const track = verticalTrackRef.value;
    const thumbH = parseFloat(verticalThumbSize.value);
    const maxTranslate = track.offsetHeight - thumbH;
    const ratio = viewport.scrollTop / (viewport.scrollHeight - viewport.clientHeight);
    return ratio * maxTranslate || 0;
});

const horizontalThumbSize = computed(() => {
    void scrollTick.value;
    if (!viewportRef.value || !horizontalState.value) return '0px';
    const viewport = viewportRef.value;
    const trackWidth = horizontalTrackRef.value?.offsetWidth ?? 0;
    const ratio = viewport.clientWidth / viewport.scrollWidth;
    const size = Math.max(ratio * trackWidth, props.minThumbSize);
    const clamped = Math.min(size, trackWidth);
    return `${clamped}px`;
});

const horizontalThumbTranslate = computed(() => {
    void scrollTick.value;
    if (!viewportRef.value || !horizontalTrackRef.value || !horizontalState.value) return 0;
    const viewport = viewportRef.value;
    const track = horizontalTrackRef.value;
    const thumbW = parseFloat(horizontalThumbSize.value);
    const maxTranslate = track.offsetWidth - thumbW;
    const ratio = viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth);
    return ratio * maxTranslate || 0;
});

// Scroll handling
const handleScroll = (evt: Event) => {
    tick();
    emit('scroll', evt);
};

// Drag logic
const dragStartData = ref<{ startPos: number; startScroll: number }>({
    startPos: 0,
    startScroll: 0
});

const startDrag = (direction: 'vertical' | 'horizontal', evt: MouseEvent) => {
    dragging.value = direction;
    // const el = evt.currentTarget as HTMLElement;
    // const rect = el.getBoundingClientRect();
    const startPos = direction === 'vertical' ? evt.clientY : evt.clientX;
    const startScroll =
        direction === 'vertical' ? viewportRef.value!.scrollTop : viewportRef.value!.scrollLeft;
    dragStartData.value = { startPos, startScroll };
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
};

const handleDragMove = (evt: MouseEvent) => {
    if (!dragging.value || !viewportRef.value) return;
    const dir = dragging.value;
    const delta =
        dir === 'vertical'
            ? evt.clientY - dragStartData.value.startPos
            : evt.clientX - dragStartData.value.startPos;
    const track = dir === 'vertical' ? verticalTrackRef.value! : horizontalTrackRef.value!;
    const thumb = dir === 'vertical' ? verticalThumbRef.value! : horizontalThumbRef.value!;
    const trackSize = dir === 'vertical' ? track.clientHeight : track.clientWidth;
    const thumbSize = dir === 'vertical' ? thumb.clientHeight : thumb.clientWidth;
    const maxTranslate = trackSize - thumbSize;
    const translateRatio = delta / maxTranslate;
    const viewport = viewportRef.value;
    const maxScroll =
        dir === 'vertical'
            ? viewport.scrollHeight - viewport.clientHeight
            : viewport.scrollWidth - viewport.clientWidth;
    if (dir === 'vertical') {
        viewport.scrollTop = dragStartData.value.startScroll + translateRatio * maxScroll;
    } else {
        viewport.scrollLeft = dragStartData.value.startScroll + translateRatio * maxScroll;
    }
};

const handleDragEnd = () => {
    dragging.value = null;
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
};

// Click on track to jump
const handleTrackClick = (direction: 'vertical' | 'horizontal', evt: MouseEvent) => {
    if ((evt.target as HTMLElement).classList.contains('nue-scroll-bar__thumb')) return;
    const track = direction === 'vertical' ? verticalTrackRef.value! : horizontalTrackRef.value!;
    const thumb = direction === 'vertical' ? verticalThumbRef.value! : horizontalThumbRef.value!;
    const trackRect = track.getBoundingClientRect();
    const trackSize = direction === 'vertical' ? trackRect.height : trackRect.width;
    const thumbSize = direction === 'vertical' ? thumb.clientHeight : thumb.clientWidth;
    const clickPos =
        direction === 'vertical' ? evt.clientY - trackRect.top : evt.clientX - trackRect.left;
    const ratio = (clickPos - thumbSize / 2) / (trackSize - thumbSize);
    if (!viewportRef.value) return;
    const maxScroll =
        direction === 'vertical'
            ? viewportRef.value.scrollHeight - viewportRef.value.clientHeight
            : viewportRef.value.scrollWidth - viewportRef.value.clientWidth;
    if (direction === 'vertical') {
        viewportRef.value.scrollTop = ratio * maxScroll;
    } else {
        viewportRef.value.scrollLeft = ratio * maxScroll;
    }
};

// Hover logic
const handleMouseEnter = () => {
    if (props.mode === 'hover') hovering.value = true;
};

const handleMouseLeave = () => {
    if (props.mode === 'hover') hovering.value = false;
};

// Recalculate when content changes (via MutationObserver)
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
    if (viewportRef.value) {
        resizeObserver = new ResizeObserver(() => {
            tick();
        });
        resizeObserver.observe(viewportRef.value);
    }
});

onUnmounted(() => {
    resizeObserver?.disconnect();
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
});
</script>

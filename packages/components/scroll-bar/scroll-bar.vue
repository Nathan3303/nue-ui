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

// --- 轨道 padding 缓存（仅 mount/resize 时通过 getComputedStyle 读取，避免滚动热点路径开销） ---
const vTrackPadding = ref({ top: 0, bottom: 0 });
const hTrackPadding = ref({ left: 0, right: 0 });

function readTrackPadding() {
    if (verticalTrackRef.value) {
        const s = window.getComputedStyle(verticalTrackRef.value);
        vTrackPadding.value = {
            top: parseFloat(s.paddingTop) || 0,
            bottom: parseFloat(s.paddingBottom) || 0
        };
    }
    if (horizontalTrackRef.value) {
        const s = window.getComputedStyle(horizontalTrackRef.value);
        hTrackPadding.value = {
            left: parseFloat(s.paddingLeft) || 0,
            right: parseFloat(s.paddingRight) || 0
        };
    }
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

/** 获取轨道 content 区尺寸（clientHeight/Width 减去已缓存的 padding） */
function contentSize(el: HTMLElement, padding: { top: number; bottom: number }) {
    return Math.max(0, el.clientHeight - padding.top - padding.bottom);
}
function contentSizeH(el: HTMLElement, padding: { left: number; right: number }) {
    return Math.max(0, el.clientWidth - padding.left - padding.right);
}

// Size calculations
const verticalThumbSize = computed(() => {
    void scrollTick.value;
    if (!viewportRef.value || !wrapperRef.value || !verticalState.value) return '0px';
    const viewport = viewportRef.value;
    const track = verticalTrackRef.value!;
    const pad = vTrackPadding.value;
    const contentH = contentSize(track, pad);
    if (contentH <= 0) return '0px';
    const ratio = viewport.clientHeight / viewport.scrollHeight;
    const size = Math.max(ratio * contentH, props.minThumbSize);
    const clamped = Math.min(size, contentH);
    return `${clamped}px`;
});

const verticalThumbTranslate = computed(() => {
    void scrollTick.value;
    if (!viewportRef.value || !verticalTrackRef.value || !verticalState.value) return 0;
    const viewport = viewportRef.value;
    const track = verticalTrackRef.value;
    const thumbH = parseFloat(verticalThumbSize.value);
    const pad = vTrackPadding.value;
    const contentH = contentSize(track, pad);
    const maxTranslate = Math.max(0, contentH - thumbH);
    const maxScroll = viewport.scrollHeight - viewport.clientHeight;
    const ratio = maxScroll > 0 ? viewport.scrollTop / maxScroll : 0;
    return ratio * maxTranslate || 0;
});

const horizontalThumbSize = computed(() => {
    void scrollTick.value;
    if (!viewportRef.value || !horizontalState.value) return '0px';
    const viewport = viewportRef.value;
    const track = horizontalTrackRef.value!;
    const pad = hTrackPadding.value;
    const contentW = contentSizeH(track, pad);
    if (contentW <= 0) return '0px';
    const ratio = viewport.clientWidth / viewport.scrollWidth;
    const size = Math.max(ratio * contentW, props.minThumbSize);
    const clamped = Math.min(size, contentW);
    return `${clamped}px`;
});

const horizontalThumbTranslate = computed(() => {
    void scrollTick.value;
    if (!viewportRef.value || !horizontalTrackRef.value || !horizontalState.value) return 0;
    const viewport = viewportRef.value;
    const track = horizontalTrackRef.value;
    const thumbW = parseFloat(horizontalThumbSize.value);
    const pad = hTrackPadding.value;
    const contentW = contentSizeH(track, pad);
    const maxTranslate = Math.max(0, contentW - thumbW);
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const ratio = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0;
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
    const padV = vTrackPadding.value;
    const padH = hTrackPadding.value;
    const trackSize =
        dir === 'vertical'
            ? track.clientHeight - padV.top - padV.bottom
            : track.clientWidth - padH.left - padH.right;
    const thumbSize = dir === 'vertical' ? thumb.clientHeight : thumb.clientWidth;
    const maxTranslate = Math.max(0, trackSize - thumbSize);
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
    const padV = vTrackPadding.value;
    const padH = hTrackPadding.value;
    const trackRect = track.getBoundingClientRect();
    const trackSize = direction === 'vertical' ? trackRect.height : trackRect.width;
    const thumbSize = direction === 'vertical' ? thumb.clientHeight : thumb.clientWidth;
    const clickPos =
        direction === 'vertical' ? evt.clientY - trackRect.top : evt.clientX - trackRect.left;
    let contentSize: number;
    let clickOffset: number;
    if (direction === 'vertical') {
        contentSize = trackSize - padV.top - padV.bottom;
        clickOffset = clickPos - padV.top;
    } else {
        contentSize = trackSize - padH.left - padH.right;
        clickOffset = clickPos - padH.left;
    }
    const ratio =
        contentSize > thumbSize ? (clickOffset - thumbSize / 2) / (contentSize - thumbSize) : 0;
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
    readTrackPadding();
    if (viewportRef.value) {
        resizeObserver = new ResizeObserver(() => {
            readTrackPadding();
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

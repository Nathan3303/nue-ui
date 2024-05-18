<template>
    <div class="infinite-scroll" :style="styles">
        <slot></slot>
        <div ref="triggerBarRef" class="infinite-scroll__trigger-bar"></div>
        <div v-if="loading" class="infinite-scroll__loading">
            <slot name="loading">
                <span>Loading...</span>
            </slot>
        </div>
        <div v-if="disabled" class="infinite-scroll__disabled">
            <slot name="disabled">
                <span>No more data</span>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { InfiniteScrollPropsType, InfiniteScrollEmitsType } from "./types";
import "./infinite-scroll.css";

defineOptions({ name: "NueInfiniteScroll" });

const props = withDefaults(defineProps<InfiniteScrollPropsType>(), {
    triggerHeight: "150px",
    disabled: false,
    loading: false,
});

const emit = defineEmits<InfiniteScrollEmitsType>();

const triggerBarRef = ref<HTMLDivElement>();
const observer = ref<IntersectionObserver>();

const styles = computed(() => {
    return {
        height: props.height,
        "--trigger-bar-height": props.triggerHeight,
    };
});

onMounted(() => {
    const triggerBar = triggerBarRef.value;
    if (triggerBar) {
        observer.value = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log(entry);
                if (props.disabled) return;
                if (entry.isIntersecting) {
                    emit("loadMore");
                }
            });
        });
        observer.value.observe(triggerBar);
    }
});
</script>

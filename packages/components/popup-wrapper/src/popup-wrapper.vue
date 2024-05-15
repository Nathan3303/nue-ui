<template>
    <div ref="popupWrapperRef" class="nue-popup-wrapper"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { registerPopupWrapper } from "./popup-wrapper";
import "../style/popup-wrapper.css";

defineOptions({ name: "NuePopupWrapper" });

const props = defineProps<{
    id?: string;
}>();

const popupWrapperRef = ref<HTMLDivElement>();

onMounted(() => {
    registerPopupWrapper(popupWrapperRef.value!, props.id);
});
</script>

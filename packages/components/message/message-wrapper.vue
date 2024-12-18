<template>
    <div ref="messageRef" class="nue-message"></div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useMessageWrapper } from './message';
import './message-wrapper.css';

defineOptions({ name: 'NueMessageWrapper' });

const messageRef = ref<HTMLDivElement>();
const clearFn = ref(() => {});

onMounted(() => {
    clearFn.value = useMessageWrapper(messageRef.value!);
});

onBeforeUnmount(() => {
    clearFn.value.call(undefined);
});
</script>

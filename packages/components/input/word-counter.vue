<template>
    <div class="word-counter">{{ wordCounterText }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { WordCounterProps } from './types';

defineOptions({ name: 'WordCounter' });

const props = withDefaults(defineProps<WordCounterProps>(), {
    mode: 'both',
    maxlength: 0
});

const wordCounterText = computed(() => {
    const { mode, maxlength, length } = props;
    if (mode === 'off') return false;
    let result = '';
    const max = maxlength !== -1 && maxlength;
    if (mode !== 'word-left') result += `${length} / ${max || '-'}`;
    if (mode === 'both') result += ' , ';
    if (mode !== 'word-limit') result += max ? max - length : '-';
    return result;
});
</script>

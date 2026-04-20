<script setup lang="ts">
import { computed } from 'vue';
import type { NueDatePickerYearProps, NueDatePickerYearEmits } from './types';

const props = defineProps<NueDatePickerYearProps>();
const emit = defineEmits<NueDatePickerYearEmits>();

// 计算当前十年的起始年份
const decadeStart = computed(() => {
    return Math.floor(props.year / 10) * 10;
});

// 生成十年视图的年份数组
const years = computed(() => {
    const years: { value: number; isCurrent: boolean }[] = [];
    for (let i = 0; i < 10; i++) {
        const yearValue = decadeStart.value + i;
        years.push({
            value: yearValue,
            isCurrent: yearValue === new Date().getFullYear()
        });
    }
    return years;
});

// 点击年份
function handleYearClick(year: number) {
    emit('select', year);
    emit('update:view', 'date');
}
</script>

<template>
    <div class="nue-date-picker-year">
        <div class="year-grid">
            <div
                v-for="y in years"
                :key="y.value"
                class="year-cell"
                :class="{ selected: y.value === props.year }"
                @click="handleYearClick(y.value)"
            >
                {{ y.value }}
            </div>
        </div>
    </div>
</template>


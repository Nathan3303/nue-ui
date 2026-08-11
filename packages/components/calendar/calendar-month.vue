<script setup lang="ts">
import { computed } from 'vue';
import { MONTHS } from './calendar-constants';
import type { NueCalendarMonthProps, NueCalendarMonthEmits } from './calendar-types';

defineOptions({ name: 'NueCalendarMonth' });

const props = defineProps<NueCalendarMonthProps>();
const emit = defineEmits<NueCalendarMonthEmits>();

// 生成月份数组 (1-12)
const months = computed(() => {
    const currentYear = new Date().getFullYear();
    return MONTHS.map((name, index) => ({
        value: index + 1,
        name,
        isCurrent: props.year === currentYear && index + 1 === new Date().getMonth() + 1
    }));
});

// 点击月份
function handleMonthClick(month: number) {
    emit('select', month);
    emit('update:view', 'date');
}
</script>

<template>
    <div class="nue-calendar-month">
        <div class="month-grid">
            <div
                v-for="m in months"
                :key="m.value"
                class="month-cell"
                :class="{ selected: m.value === month }"
                @click="handleMonthClick(m.value)"
            >
                {{ m.name }}
            </div>
        </div>
    </div>
</template>
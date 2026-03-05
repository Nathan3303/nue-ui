<template>
    <div class="date-picker-header">
        <div class="date-picker-header__row">
            <!-- 年份视图: 上十年按钮 -->
            <nue-button
                v-if="currentView === 'year'"
                title="上十年"
                icon="arrow-left-more"
                @click="handlePrevDecade"
            />

            <!-- 月份视图: 上一年按钮 -->
            <nue-button
                v-if="currentView === 'month'"
                title="上一年"
                icon="arrow-left-more"
                @click="handlePrevYear"
            />

            <!-- 日期视图: 上一年按钮 -->
            <nue-button
                v-if="currentView === 'date'"
                title="上一年"
                icon="arrow-left-more"
                @click="handlePrevYear"
            />

            <!-- 日期视图: 上个月按钮 -->
            <nue-button
                v-if="currentView === 'date'"
                title="上个月"
                icon="arrow-left"
                @click="handlePrevMonth"
            />

            <!-- 当前年月显示 -->
            <div class="date-picker-header__current">
                <span
                    class="date-picker-header__year"
                    :class="{ clickable: currentView === 'date' }"
                    @click="handleYearClick"
                >
                    {{ displayYear }}
                </span>
                <span
                    v-if="currentView === 'date'"
                    class="date-picker-header__month clickable"
                    @click="handleMonthClick"
                >
                    {{ currentMonth }}
                </span>
            </div>

            <!-- 日期视图: 下个月按钮 -->
            <nue-button
                v-if="currentView === 'date'"
                title="下个月"
                icon="arrow-right"
                @click="handleNextMonth"
            />

            <!-- 日期视图: 下一年按钮 -->
            <nue-button
                v-if="currentView === 'date'"
                title="下一年"
                icon="arrow-right-more"
                @click="handleNextYear"
            />

            <!-- 月份视图: 下一年按钮 -->
            <nue-button
                v-if="currentView === 'month'"
                title="下一年"
                icon="arrow-right-more"
                @click="handleNextYear"
            />

            <!-- 年份视图: 下十年按钮 -->
            <nue-button
                v-if="currentView === 'year'"
                title="下十年"
                icon="arrow-right-more"
                @click="handleNextDecade"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import NueButton from '../button/button.vue';
import { MONTHS } from './constants';

defineOptions({ name: 'NueDatePickerHeader' });

export type DatePickerViewMode = 'date' | 'month' | 'year';

const props = defineProps<{
    year: number;
    month: number;
    mode?: DatePickerViewMode;
}>();

const emit = defineEmits<{
    'update:year': [year: number];
    'update:month': [month: number];
    'update:view': [view: DatePickerViewMode];
}>();

const currentView = computed(() => props.mode || 'date');

const currentMonth = computed(() => {
    return MONTHS[props.month - 1];
});

// 显示的年份文本
const displayYear = computed(() => {
    if (currentView.value === 'year') {
        const startYear = Math.floor(props.year / 10) * 10;
        return `${startYear}-${startYear + 9}`;
    }
    return `${props.year}年`;
});

// 切换到年份视图
function handleYearClick() {
    if (currentView.value === 'date') {
        emit('update:view', 'year');
    }
}

// 切换到月份视图
function handleMonthClick() {
    if (currentView.value === 'date') {
        emit('update:view', 'month');
    }
}

// 年份导航
function handlePrevYear() {
    emit('update:year', props.year - 1);
}

function handleNextYear() {
    emit('update:year', props.year + 1);
}

// 十年导航
function handlePrevDecade() {
    emit('update:year', props.year - 10);
}

function handleNextDecade() {
    emit('update:year', props.year + 10);
}

// 月份导航
function handlePrevMonth() {
    let newMonth = props.month - 1;
    let newYear = props.year;
    if (newMonth < 1) {
        newMonth = 12;
        newYear--;
    }
    emit('update:year', newYear);
    emit('update:month', newMonth);
}

function handleNextMonth() {
    let newMonth = props.month + 1;
    let newYear = props.year;
    if (newMonth > 12) {
        newMonth = 1;
        newYear++;
    }
    emit('update:year', newYear);
    emit('update:month', newMonth);
}
</script>

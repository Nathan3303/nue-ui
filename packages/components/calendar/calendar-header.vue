<template>
    <div class="nue-calendar-header">
        <nue-button-group :size="calendarCtx.size">
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
        </nue-button-group>
        <!-- 当前年月显示 -->
        <div class="nue-calendar-header__current">
            <nue-button
                class="nue-calendar-header__year"
                :class="{ clickable: currentView === 'date' }"
                :size="calendarCtx.size"
                theme="ghost"
                @click="handleYearClick"
            >
                {{ displayYear }}
            </nue-button>
            <nue-button
                v-if="currentView === 'date'"
                class="nue-calendar-header__month clickable"
                :size="calendarCtx.size"
                theme="ghost"
                @click="handleMonthClick"
            >
                {{ currentMonth }}
            </nue-button>
        </div>
        <nue-button-group :size="calendarCtx.size">
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
        </nue-button-group>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import NueButton from '../button/button.vue';
import NueButtonGroup from '../button-group/button-group.vue';
import { MONTHS, NUE_CALENDAR_CTX_KEY } from './calendar-constants';
import type {
    NueCalendarHeaderProps,
    NueCalendarHeaderEmits,
    NueCalendarContext
} from './calendar-types';

defineOptions({ name: 'NueCalendarHeader' });

const props = defineProps<NueCalendarHeaderProps>();

const emit = defineEmits<NueCalendarHeaderEmits>();

const calendarCtx = inject<NueCalendarContext>(NUE_CALENDAR_CTX_KEY)!;

const currentView = computed(() => props.mode || 'date');

const currentMonth = computed(() => MONTHS[props.month - 1]);

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
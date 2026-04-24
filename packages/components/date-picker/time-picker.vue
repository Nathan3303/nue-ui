<script setup lang="ts">
import { NueButton } from '../button';
import { ref, watch, nextTick } from 'vue';
import type { NueDatePickerTimeProps, NueDatePickerTimeEmits } from './types';

const props = withDefaults(defineProps<NueDatePickerTimeProps>(), {
    hour: () => new Date().getHours(),
    minute: () => new Date().getMinutes()
});

const emit = defineEmits<NueDatePickerTimeEmits>();

// 本地状态，确保初始值有效
const localHour = ref(
    isNaN(props.hour) || props.hour < 0 || props.hour > 23 ? new Date().getHours() : props.hour
);
const localMinute = ref(
    isNaN(props.minute) || props.minute < 0 || props.minute > 59
        ? new Date().getMinutes()
        : props.minute
);

// 编辑状态
const editingHour = ref(false);
const editingMinute = ref(false);
const hourInput = ref<HTMLInputElement | null>(null);
const minuteInput = ref<HTMLInputElement | null>(null);

// 监听外部变化，增加安全检查
watch(
    () => props.hour,
    val => {
        localHour.value = isNaN(val) || val < 0 || val > 23 ? new Date().getHours() : val;
    }
);

watch(
    () => props.minute,
    val => {
        localMinute.value = isNaN(val) || val < 0 || val > 59 ? new Date().getMinutes() : val;
    }
);

// 增加小时
function increaseHour() {
    if (localHour.value < 23) {
        localHour.value++;
    } else {
        localHour.value = 0;
    }
    emitHourChange();
}

// 减少小时
function decreaseHour() {
    if (localHour.value > 0) {
        localHour.value--;
    } else {
        localHour.value = 23;
    }
    emitHourChange();
}

// 增加分钟
function increaseMinute() {
    if (localMinute.value < 59) {
        localMinute.value++;
    } else {
        localMinute.value = 0;
    }
    emitMinuteChange();
}

// 减少分钟
function decreaseMinute() {
    if (localMinute.value > 0) {
        localMinute.value--;
    } else {
        localMinute.value = 59;
    }
    emitMinuteChange();
}

function emitHourChange() {
    emit('update:hour', localHour.value);
    emit('change', { hour: localHour.value, minute: localMinute.value });
}

function emitMinuteChange() {
    emit('update:minute', localMinute.value);
    emit('change', { hour: localHour.value, minute: localMinute.value });
}

// 开始编辑小时
function startEditHour() {
    editingHour.value = true;
    nextTick(() => {
        hourInput.value?.focus();
        hourInput.value?.select();
    });
}

// 开始编辑分钟
function startEditMinute() {
    editingMinute.value = true;
    nextTick(() => {
        minuteInput.value?.focus();
        minuteInput.value?.select();
    });
}

// 提交小时编辑
function commitHourEdit(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = parseInt(target.value, 10);

    if (isNaN(value)) {
        value = localHour.value;
    } else {
        value = Math.max(0, Math.min(23, value));
    }

    localHour.value = value;
    editingHour.value = false;
    emitHourChange();
}

// 提交分钟编辑
function commitMinuteEdit(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = parseInt(target.value, 10);

    if (isNaN(value)) {
        value = localMinute.value;
    } else {
        value = Math.max(0, Math.min(59, value));
    }

    localMinute.value = value;
    editingMinute.value = false;
    emitMinuteChange();
}

// 取消编辑
function cancelEdit() {
    editingHour.value = false;
    editingMinute.value = false;
}

// 处理键盘事件
function handleKeydown(event: KeyboardEvent, type: 'hour' | 'minute') {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (type === 'hour') {
            commitHourEdit(event);
        } else {
            commitMinuteEdit(event);
        }
    } else if (event.key === 'Escape') {
        cancelEdit();
    }
}
</script>

<template>
    <div class="nue-time-picker" @click.self="cancelEdit">
        <!-- 小时 -->
        <div class="nue-time-picker__item">
            <span class="nue-time-picker__label">小时</span>
            <div class="nue-time-picker__controls">
                <nue-button size="small" icon="arrow-left" @click="decreaseHour" />
                <span
                    v-if="!editingHour"
                    class="nue-time-picker__value nue-time-picker__value--editable"
                    @click="startEditHour"
                >
                    {{ String(localHour).padStart(2, '0') }}
                </span>
                <input
                    v-else
                    ref="hourInput"
                    type="number"
                    class="nue-time-picker__input"
                    :value="localHour"
                    min="0"
                    max="23"
                    @blur="commitHourEdit"
                    @keydown="handleKeydown($event, 'hour')"
                />
                <nue-button size="small" icon="arrow-right" @click="increaseHour" />
            </div>
        </div>
        <span class="nue-time-picker__separator">:</span>
        <!-- 分钟 -->
        <div class="nue-time-picker__item">
            <span class="nue-time-picker__label">分钟</span>
            <div class="nue-time-picker__controls">
                <nue-button size="small" icon="arrow-left" @click="decreaseMinute" />
                <span
                    v-if="!editingMinute"
                    class="nue-time-picker__value nue-time-picker__value--editable"
                    @click="startEditMinute"
                >
                    {{ String(localMinute).padStart(2, '0') }}
                </span>
                <input
                    v-else
                    ref="minuteInput"
                    type="number"
                    class="nue-time-picker__input"
                    :value="localMinute"
                    min="0"
                    max="59"
                    @blur="commitMinuteEdit"
                    @keydown="handleKeydown($event, 'minute')"
                />
                <nue-button size="small" icon="arrow-right" @click="increaseMinute" />
            </div>
        </div>
    </div>
</template>

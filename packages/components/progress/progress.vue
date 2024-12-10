<template>
    <div :class="classes" :style="progressStyle">
        <template v-if="type === 'line'">
            <div class="nue-progress--line">
                <div class="nue-progress__outer-bar">
                    <div
                        :style="{ width: percentage }"
                        class="nue-progress__inner-bar"
                    >
                        <nue-text v-if="showInnerText && !hideText">
                            {{ percentage }}
                        </nue-text>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="type === 'circle'">
            <svg
                :style="circleStyles"
                class="nue-progress--circle"
                viewBox="0 0 100 100"
            >
                <circle
                    class="nue-progress--circle__circle nue-progress__outer-path"
                    cx="50"
                    cy="50"
                    r="50"
                ></circle>
                <circle
                    class="nue-progress--circle__circle nue-progress__inner-path"
                    cx="50"
                    cy="50"
                    r="50"
                ></circle>
            </svg>
        </template>
        <nue-text v-if="!showInnerText && !hideText" class="nue-progress__text">
            {{ formatter(percentage) }}
        </nue-text>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { isArray, parseTheme } from '@nue-ui/utils';
import { NueText } from '../text';
import type { ProgressEmits, ProgressProps } from './types';
import './progress.css';

defineOptions({ name: 'NueProgress' });
const props = withDefaults(defineProps<ProgressProps>(), {
    type: 'line',
    percentage: 0,
    strokeWidth: 6,
    formatter: (p: string) => p,
    showInnerText: false,
    hideText: false,
    scale: 1,
    color: 'var(--nue-ui-primary-color-600)'
});
const emit = defineEmits<ProgressEmits>();

const percentage = computed(() => {
    const { percentage } = props;
    if (percentage < 0) return '0%';
    if (percentage === 100) emit('full');
    if (percentage > 100) return '100%';
    return percentage + '%';
});

const strokeWidth = computed(() => {
    return props.strokeWidth * props.scale + 'px';
});

const classes = computed(() => {
    const { theme } = props;
    const prefix = 'nue-progress';
    const list: string[] = [];
    list.push(prefix);
    if (theme) list.concat(parseTheme(theme, prefix));
    return list;
});

const color = computed<string | undefined>(() => {
    const { type, color } = props;
    switch (type) {
        case 'line':
            return isArray(color)
                ? `linear-gradient(to right, ${(color as string[]).join(', ')})`
                : (color as string);
        case 'circle':
            return isArray(color) ? color[0] : (color as string);
        default:
            return void 0;
    }
});

const progressStyle = computed(() => {
    const { type } = props;
    return {
        '--stroke-width': strokeWidth.value,
        '--flex': type === 'line' ? 'auto' : 'none',
        '--inner-bar-background-color': color.value
    };
});

const strokeDashArray = computed(() => {
    return Math.ceil(2 * Math.PI * 50);
});

const circleStyles = computed(() => {
    return {
        '--circle-size': `${props.scale * 100}px`,
        '--stroke-dash-array': strokeDashArray.value,
        '--stroke-dash-offset': Math.ceil(
            (1 - parseInt(percentage.value) / 100) * strokeDashArray.value
        )
    };
});
</script>

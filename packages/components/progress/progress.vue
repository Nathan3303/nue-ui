<template>
    <div :class="classes" :style="progressStyle">
        <template v-if="type === 'line'">
            <div class="nue-progress__bar">
                <div class="nue-progress__outer-bar">
                    <div :style="{ width: percentage }" class="nue-progress__inner-bar">
                        <nue-text v-if="showInnerText && !hideText">
                            {{ percentage }}
                        </nue-text>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="type === 'circle'">
            <svg :style="circleStyles" class="nue-progress__circle" viewBox="0 0 100 100">
                <circle
                    class="nue-progress__circle-path nue-progress__outer-path"
                    cx="50"
                    cy="50"
                    r="50"
                ></circle>
                <circle
                    class="nue-progress__circle-path nue-progress__inner-path"
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
import type { NueProgressProps, NueProgressEmits } from './types';
import './progress.css';

defineOptions({ name: 'NueProgress' });
const props = withDefaults(defineProps<NueProgressProps>(), {
    type: 'line',
    scale: 1,
    color: '#757575',
    percentage: 0,
    strokeWidth: 6,
    formatter: (p: string) => p
});
const emit = defineEmits<NueProgressEmits>();

const percentage = computed(() => {
    if (props.percentage < 0) return '0%';
    if (props.percentage === 100) emit('full');
    if (props.percentage > 100) return '100%';
    return props.percentage + '%';
});

const strokeWidth = computed(() => {
    return props.strokeWidth * props.scale + 'px';
});

const classes = computed(() => {
    const prefix = 'nue-progress';
    return [prefix, ...parseTheme(props.theme, prefix)];
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
        '--nue-progress-stroke-width': strokeWidth.value,
        '--nue-progress-flex': type === 'line' ? 'auto' : 'none',
        '--nue-progress-innerbar-background-color': color.value
    };
});

const strokeDashArray = computed(() => {
    return Math.ceil(2 * Math.PI * 50);
});

const circleStyles = computed(() => {
    return {
        '--nue-progress-circle-size': `${props.scale * 100}px`,
        '--nue-progress-stroke-dash-array': strokeDashArray.value,
        '--nue-progress-stroke-dash-offset': Math.ceil(
            (1 - parseInt(percentage.value) / 100) * strokeDashArray.value
        )
    };
});
</script>

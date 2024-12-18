<template>
    <div :class="classes">
        <slot name="picture">
            <img
                :src="imageSrc"
                :style="imageStyle"
                alt="Empty image"
                class="nue-empty__image"
            />
        </slot>
        <nue-text class="nue-empty__description">
            <slot name="description">
                {{ description }}
            </slot>
        </nue-text>
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import NueText from '../text/text.vue';
import emptyImage from './empty.png';
import type { NueEmptyProps } from './types';
import './empty.css';

defineOptions({ name: 'NueEmpty' });
const props = withDefaults(defineProps<NueEmptyProps>(), {
    imageSrc: emptyImage,
    imageSize: '96px',
    description: '暂无数据'
});

const classes = computed(() => {
    const prefix = 'nue-empty';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const imageStyle = computed(() => {
    return {
        '--image-size': props.imageSize
    };
});
</script>

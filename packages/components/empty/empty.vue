<template>
    <nue-div :class="classes" :style="styles">
        <slot name="image">
            <img v-if="imageSrc" :src="imageSrc" class="nue-empty__image" />
        </slot>
        <nue-text class="nue-empty__description">
            <slot name="description">
                {{ description }}
            </slot>
        </nue-text>
        <slot />
    </nue-div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { NueText, NueDiv } from '@nue-ui/components';
// @ts-expect-error 忽略空图片的类型错误
import EmptyImage from './empty.png';
import type { NueEmptyProps } from './types';

defineOptions({ name: 'NueEmpty' });
const props = withDefaults(defineProps<NueEmptyProps>(), {
    imageSrc: EmptyImage
});

const classes = computed(() => {
    const prefix = 'nue-empty';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const styles = computed(() => ({
    '--nue-empty-image-size': props.imageSize
}));
</script>

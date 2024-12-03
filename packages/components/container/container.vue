<template>
    <section :class="classes" :id="id" :style="styles">
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
    import { computed, provide } from 'vue';
    import { generateId, parseTheme } from '@nue-ui/utils';
    import { nueContainerContext } from './contants';
    import type { NueContainerProps, NueContainerContext } from './types';
    import './container.css';

    defineOptions({ name: 'NueContainer' });
    const props = withDefaults(defineProps<NueContainerProps>(), {
        id: generateId(),
        theme: 'vertical'
    });

    const classes = computed(() => {
        const { theme } = props;
        const prefix = 'nue-container';
        let list: string[] = [prefix];
        if (theme) list = list.concat(parseTheme(theme, prefix));
        return list;
    });

    const styles = computed(() => {
        const { height, width } = props;
        return {
            '--nue-container-width': width,
            '--nue-container-height': height
        };
    });

    provide<NueContainerContext>(nueContainerContext, {
        containerId: computed(() => props.id)
    });
</script>

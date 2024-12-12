<template>
    <main ref="mainRef" :class="classes" :style="style">
        <nue-aside
            v-if="$slots.aside"
            ref="menuAsideRef"
            :max-width="asideMaxWidth"
            :min-width="asideMinWidth"
            :width="asideWidth"
            class="nue-main__aside"
        >
            <slot name="aside" />
        </nue-aside>
        <nue-separator v-if="$slots.aside" op-target="previous" />
        <div v-if="$slots.default || $slots.content" class="nue-main__content">
            <slot />
            <slot name="content" />
        </div>
        <nue-separator v-if="$slots.outline" op-target="next" />
        <nue-aside
            v-if="$slots.outline"
            ref="outlineAsideRef"
            :max-width="outlineMaxWidth"
            :min-width="outlineMinWidth"
            :width="outlineWidth"
            class="nue-main__outline"
        >
            <slot name="outline" />
        </nue-aside>
    </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useSlots } from 'vue';
import { debounce, parseTheme } from '@nue-ui/utils';
import NueAside from './aside.vue';
import NueSeparator from './separator.vue';
import { useWindowResize } from '@nue-ui/hooks';
import type { NueMainProps } from './types';
import './main.css';

defineOptions({ name: 'NueMain' });
const props = withDefaults(defineProps<NueMainProps>(), {
    asideTitle: '菜单',
    outlineTitle: '大纲'
});

const slots = useSlots();
const { addCallback } = useWindowResize();

const mainRef = ref<HTMLElement>();
const menuAsideRef = ref<InstanceType<typeof NueAside>>();
const outlineAsideRef = ref<InstanceType<typeof NueAside>>();
const menuAsideFloat = ref(false);
const outlineAsideFloat = ref(false);

const classes = computed(() => {
    const { theme } = props;
    const prefix = 'nue-main';
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

const style = computed(() => ({
    '--nue-main-aside-width': props.asideWidth,
    '--nue-main-aside-min-width': props.asideMinWidth,
    '--nue-main-aside-max-width': props.asideMaxWidth,
    '--nue-main-outline-width': props.outlineWidth,
    '--nue-main-outline-min-width': props.outlineMinWidth,
    '--nue-main-outline-max-width': props.outlineMaxWidth
}));

const debounceFloatListener = debounce(() => {
    if (!mainRef.value) return;
    const parentElement = mainRef.value.parentElement;
    if (!parentElement) return;
    const clientWidth = parentElement.clientWidth;
    outlineAsideFloat.value = clientWidth <= 1024;
    menuAsideFloat.value = clientWidth <= 768;
}, 64);

if (props.responsive && (slots.aside || slots.outline)) {
    addCallback(debounceFloatListener);
}

onMounted(() => {
    if (props.responsive && (slots.aside || slots.outline)) {
        debounceFloatListener();
    }
});
</script>

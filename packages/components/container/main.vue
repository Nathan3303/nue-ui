<template>
    <main ref="mainRef" :class="classes" :style="style">
        <nue-aside
            v-if="$slots.aside"
            ref="menuAsideRef"
            :allow-collapse="allowCollapseAside"
            :allow-hide="false"
            :allow-resize="allowResizeAside"
            :float="menuAsideFloat"
            :max-width="asideMaxWidth"
            :min-width="asideMinWidth"
            :width="asideWidth"
            class="nue-main__aside"
            resizer-placement="right"
            title="Menu"
        >
            <slot name="aside" />
        </nue-aside>
        <div v-if="$slots.default || $slots.content" class="nue-main__content">
            <nue-div
                v-if="menuAsideFloat || outlineAsideFloat"
                class="nue-main__aside-visible-controller-bar"
            >
                <nue-button
                    v-if="menuAsideFloat"
                    icon="menu"
                    theme="pure"
                    @click.stop="menuAsideRef?.toggleVisible()"
                >
                    Menu
                </nue-button>
                <nue-button
                    v-if="outlineAsideFloat"
                    icon="more2"
                    theme="pure"
                    @click.stop="outlineAsideRef?.toggleVisible()"
                >
                    Outline
                </nue-button>
            </nue-div>
            <slot />
            <slot name="content" />
        </div>
        <nue-aside
            v-if="$slots.outline"
            ref="outlineAsideRef"
            :allow-collapse="allowCollapseOutline"
            :allow-hide="allowHideOutline"
            :allow-resize="allowResizeOutline"
            :float="outlineAsideFloat"
            :max-width="outlineMaxWidth"
            :min-width="outlineMinWidth"
            :width="outlineWidth"
            class="nue-main__outline"
            resizer-placement="left"
            title="Outline"
        >
            <slot name="outline" />
        </nue-aside>
    </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useSlots } from 'vue';
import { debounce, parseTheme } from '@nue-ui/utils';
import NueAside from './aside.vue';
import { NueButton, NueDiv } from '..';
import { useWindowResize } from '@nue-ui/hooks';
import type { NueMainProps } from './types';
import './main.css';

defineOptions({ name: 'NueMain' });
const props = withDefaults(defineProps<NueMainProps>(), {
    asideWidth: '256px',
    asideMinWidth: '128px',
    asideMaxWidth: '512px',
    allowResizeAside: true,
    allowCollapseAside: true,
    allowHideAside: false,
    outlineWidth: '256px',
    outlineMinWidth: '128px',
    outlineMaxWidth: '512px',
    allowResizeOutline: true,
    allowCollapseOutline: true,
    allowHideOutline: true
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

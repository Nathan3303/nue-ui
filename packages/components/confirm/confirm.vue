<template>
    <div :class="classes" ref="confirmRef">
        <div class="nue-confirm__header">
            <nue-text>{{ title }}</nue-text>
            <nue-button
                :disabled="loading"
                icon="clear"
                theme="pure"
                @click.stop="handleConfirm(false)"
            />
        </div>
        <div class="nue-confirm__content">
            <nue-text>{{ content }}</nue-text>
        </div>
        <div class="nue-confirm__footer">
            <nue-button :disabled="loading" @click.stop="handleConfirm(false)">
                {{ cancelButtonText }}
            </nue-button>
            <nue-button
                theme="primary"
                :loading="loading"
                @click.stop="handleConfirm(true)"
            >
                {{ confirmButtonText }}
            </nue-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import NueButton from '../button/button.vue';
    import NueText from '../text/text.vue';
    import type { ConfirmPropsType } from './types';
    import { parseTheme } from '@nue-ui/utils';

    defineOptions({ name: 'NueConfirmNodeInner' });
    const props = withDefaults(defineProps<ConfirmPropsType>(), {
        title: 'Confirm',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    });

    const loading = ref(false);

    const classes = computed(() => {
        const { theme } = props;
        const prefix = 'nue-confirm';
        let list: string[] = [prefix];
        if (theme) list = list.concat(parseTheme(theme, prefix));
        return list;
    });

    const handleConfirm = async (isConfirmed: boolean) => {
        const { onConfirm, close } = props;
        if (!isConfirmed) return close(false);
        if (!onConfirm) return close(true);
        try {
            loading.value = true;
            const onConfirmResult = await onConfirm();
            close(onConfirmResult);
        } catch (e) {
            const onConfirmResult =
                e instanceof Error ? e : new Error(e as string);
            close(onConfirmResult);
        } finally {
            loading.value = false;
        }
    };
</script>

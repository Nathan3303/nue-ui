<script setup lang="ts">
import { ref } from 'vue';
import Demo from '@/components/demo.vue';
import { NueScrollBar, NueDiv, NueSelect, NueSelectOption } from '@nue-ui/components';

const scrollBarMode = ref<'hover' | 'always' | 'hidden'>('hover');
</script>

<template>
    <demo title="垂直滚动条">
        <nue-scroll-bar vertical theme="demo">
            <nue-div vertical>
                <nue-div theme="block" v-for="i in 10" :key="i" style="height: 5rem">
                    {{ i }}
                </nue-div>
            </nue-div>
        </nue-scroll-bar>
    </demo>
    <demo title="水平滚动条">
        <nue-scroll-bar horizontal theme="demo">
            <nue-div>
                <nue-div theme="block" v-for="i in 10" :key="i" style="width: 5rem">
                    {{ i }}
                </nue-div>
            </nue-div>
        </nue-scroll-bar>
    </demo>
    <demo title="垂直+水平滚动条">
        <nue-scroll-bar vertical horizontal theme="demo">
            <nue-div vertical>
                <nue-div theme="block2" v-for="i in 10" :key="i">
                    {{ i }}
                </nue-div>
            </nue-div>
        </nue-scroll-bar>
    </demo>
    <demo title="滚动条显示模式">
        <nue-div vertical>
            <nue-select v-model="scrollBarMode" theme="demo" size="small">
                <nue-select-option value="hover" label="hover" />
                <nue-select-option value="always" label="always" />
                <nue-select-option value="hidden" label="hidden" />
            </nue-select>
            <nue-scroll-bar vertical theme="demo" :mode="scrollBarMode">
                <nue-div vertical>
                    <nue-div theme="block" v-for="i in 10" :key="i" style="height: 5rem">
                        {{ i }}
                    </nue-div>
                </nue-div>
            </nue-scroll-bar>
        </nue-div>
    </demo>
    <demo title="自定义样式">
        <nue-scroll-bar vertical horizontal theme="demo,custom">
            <nue-div vertical>
                <nue-div theme="block2" v-for="i in 10" :key="i">
                    {{ i }}
                </nue-div>
            </nue-div>
        </nue-scroll-bar>
    </demo>
</template>

<style scoped>
.nue-scroll-bar--demo {
    height: 200px;
    border: 1px solid var(--nue-border-color);
    border-radius: var(--nue-primary-radius);
}

.nue-div--block {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--nue-primary-color-100);
    border-radius: var(--nue-primary-radius);
}

.nue-div--block2 {
    width: 120%;
    height: 5rem;
    align-items: center;
    justify-content: center;
    background-color: var(--nue-primary-color-100);
    border-radius: var(--nue-primary-radius);
}

.nue-scroll-bar--custom {
    --nue-scroll-bar-size: 12px;

    &:deep(.nue-scroll-bar__track) {
        border-radius: 0;
        padding: 4px;
        box-sizing: border-box;

        &.nue-scroll-bar__track--vertical {
            background-color: var(--nue-warning-color-50);
        }

        &.nue-scroll-bar__track--horizontal {
            background-color: var(--nue-error-color-60);
        }

        .nue-scroll-bar__thumb {
            background-color: white;
            border-radius: 0;
        }
    }
}
</style>
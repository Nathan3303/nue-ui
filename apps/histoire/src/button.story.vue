<template>
    <Story :layout="{ type: 'grid', width: '96%' }" title="NueButton">
        <Variant title="Basic">
            <nue-button>{{ data.content }}</nue-button>
            <template #controls>
                <HstText v-model="data.content" title="Content" />
            </template>
        </Variant>
        <Variant title="Icon">
            <nue-button :icon="data.icon">Button</nue-button>
            <template #controls>
                <HstText v-model="data.icon" title="Icon" />
            </template>
        </Variant>
        <Variant title="Disabled">
            <nue-button :disabled="data.disabled">Button</nue-button>
            <template #controls>
                <HstCheckbox v-model="data.disabled" title="Disabled" />
            </template>
        </Variant>
        <Variant title="Loading & LoadingIcon">
            <nue-button :loading="data.loading">Button</nue-button>
            <nue-button
                :loading="data.loading"
                :loading-icon="data.loadingIcon"
                style="margin-left: 20px"
            >
                Button
            </nue-button>
            <template #controls>
                <HstCheckbox v-model="data.loading" title="Loading" />
                <HstText v-model="data.loadingIcon" title="LoadingIcon" />
            </template>
        </Variant>
        <Variant title="Throttle">
            <nue-button
                :throttle-duration="data.throttleDuration"
                :use-throttle="data.useThrottle"
                @click="count++"
            >
                Count: {{ count }}
            </nue-button>
            <template #controls>
                <HstCheckbox v-model="data.useThrottle" title="UseThrottle" />
                <HstNumber
                    v-model="data.throttleDuration"
                    :step="1"
                    title="ThrottleDuration"
                />
            </template>
        </Variant>
        <Variant title="Size">
            <nue-button :size="data.size">Button</nue-button>
            <template #controls>
                <HstSelect
                    v-model="data.size"
                    :options="['small', 'normal', 'large']"
                    title="Size"
                />
            </template>
        </Variant>
        <Variant title="Theme">
            <nue-button :icon="data.icon" :theme="data.theme">
                Button
            </nue-button>
            <template #controls>
                <HstSelect
                    v-model="data.theme"
                    :options="[
                        'round',
                        'icon',
                        'primary',
                        'secondary',
                        'destructive',
                        'ghost',
                        'pure'
                    ]"
                    title="Theme"
                />
            </template>
        </Variant>
        <Variant title="Slot: #append">
            <nue-button>
                后置插槽
                <template #append>
                    <nue-icon name="arrow-right-more" />
                </template>
            </nue-button>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const count = ref(0);
const data = reactive({
    content: 'Button',
    icon: 'theme',
    disabled: true,
    loading: true,
    loadingIcon: 'scan',
    useThrottle: true,
    throttleDuration: 4000,
    size: 'normal',
    theme: 'round'
});
</script>

<style scoped></style>

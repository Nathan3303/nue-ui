<template>
    <demo title="Checkbox 复选框">
        <nue-div>
            <nue-div align="center">
                <nue-checkbox v-model="checkbox1" label="基础复选框" />
                <nue-checkbox v-model="checkbox1" disabled label="禁用状态" />
            </nue-div>
            <nue-div align="center">
                <nue-checkbox
                    v-model="checkbox4"
                    label="大型复选框"
                    size="large"
                />
                <nue-checkbox v-model="checkbox4" label="复选框" />
                <nue-checkbox
                    v-model="checkbox4"
                    label="小型复选框"
                    size="small"
                />
            </nue-div>
            <nue-div align="center">
                <nue-checkbox
                    v-model="checkbox3"
                    label="复选框（边框主题）"
                    theme="large,bordered"
                />
                <nue-checkbox
                    v-model="checkbox3"
                    label="复选框（边框主题）"
                    theme="bordered"
                />
                <nue-checkbox
                    v-model="checkbox3"
                    label="复选框（边框主题）"
                    theme="small,bordered"
                />
            </nue-div>
            <nue-div align="center">
                <nue-checkbox
                    v-model="checkbox2"
                    :before-check="handleBeforeCheck"
                    :loading="loading"
                    theme="custom"
                >
                    {{ loading ? '正在选中...' : '复选框（带有选择前的回调）' }}
                </nue-checkbox>
            </nue-div>
        </nue-div>
    </demo>
    <demo title="CheckboxGroup 复选框组">
        <nue-checkbox-group
            v-model="activeNames"
            :controller-label="controllerLabel"
            :max="4"
            :min="1"
            use-controller
        >
            <nue-div align="center">
                <nue-checkbox
                    v-for="cbName in checkboxes"
                    :key="cbName"
                    :label="uppercaseFirst(cbName)"
                    :name="cbName"
                />
            </nue-div>
        </nue-checkbox-group>
    </demo>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { NueDiv, NueCheckbox, NueCheckboxGroup } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const checkbox1 = ref(false);
const checkbox2 = ref(false);
const checkbox3 = ref(false);
const checkbox4 = ref(false);
const checkboxes = ['game', 'music', 'movie', 'sport', 'travel'];
const activeNames = ref<string[]>(['game', 'music']);
const loading = ref(false);

const controllerLabel = computed(() => {
    const len = activeNames.value.length;
    return `Hobbies (Select 3 of 5, at lease 1, now ${len >= 4 ? 'full' : len})`;
});

const uppercaseFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleBeforeCheck = async () => {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    loading.value = false;
    return Math.random() >= 0.3;
};
</script>

<style scoped>
.nue-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.nue-checkbox--custom.nue-checkbox--checked {
    --check-icon-color: #3c3ce8;
    --check-label-color: #3c3ce8;
}
</style>

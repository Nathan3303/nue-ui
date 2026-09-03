<template>
    <nue-div direction="column" gap="var(--nue-gap-df)">
        <nue-table :data="emptyData" :columns="columns" />
        <nue-table :data="emptyData" :columns="columns">
            <template #empty>
                <nue-empty description="没有可展示的数据">
                    <nue-button theme="primary" size="small" @click="refresh">重新加载</nue-button>
                </nue-empty>
            </template>
        </nue-table>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NueMessage } from 'nue-ui';

const columns = [
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄' }
];

const data = ref([{ name: '张三', age: 30 }]);
const emptyData = ref<unknown[]>([]);

const refresh = () => {
    emptyData.value = data.value;
    NueMessage.success('已加载 1 条数据');
};
</script>
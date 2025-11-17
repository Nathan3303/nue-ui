<template>
    <demo title="基础">
        <nue-switch />
    </demo>
    <demo title="值">
        <nue-div align="center">
            <nue-switch v-model="sw1" />
            {{ sw1 }}
        </nue-div>
    </demo>
    <demo title="禁用">
        <nue-div align="center">
            <nue-switch v-model="sw4.s1" />
            <nue-switch v-model="sw4.s2" />
        </nue-div>
    </demo>
    <demo title="显示 & 自定 内嵌文本">
        <nue-div>
            <nue-switch show-text />
            <nue-switch active-text="开" inactive-text="关" show-text />
            <nue-switch active-text="打开" inactive-text="现在是关闭状态" show-text />
        </nue-div>
    </demo>
    <demo title="大小">
        <nue-div align="center">
            <nue-switch size="small" />
            <nue-switch size="large" />
        </nue-div>
    </demo>
    <demo title="加载态 & 加载图标">
        <nue-div align="center">
            <nue-switch :loading="sw2.loading" />
            <nue-switch :loading="sw2.loading" loading-icon="scan" />
        </nue-div>
    </demo>
    <demo title="BeforeSwitch 方法">
        <nue-switch
            v-model="sw3.value"
            :before-switch="handleBeforeSwitch"
            :loading="sw3.loading"
        />
    </demo>
    <demo title="自定义主题">
        <nue-div>
            <nue-switch theme="custom1" />
            <nue-switch theme="custom2" />
            <nue-switch theme="custom3" />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { NueDiv, NueSwitch } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const sw1 = ref(false);
const sw2 = reactive({ loading: true });
const sw3 = reactive({ value: false, loading: false });
const sw4 = reactive({ s1: false, s2: true });

const handleBeforeSwitch = async () => {
    sw3.loading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    sw3.loading = false;
    return true;
};
</script>

<style scoped>
.nue-switch--custom1 {
    --nue-switch-background-active-color: var(--nue-success-color-50);
}

.nue-switch--custom2 {
    --nue-switch-background-active-color: var(--nue-warning-color-50);
}

.nue-switch--custom3 {
    --nue-switch-background-active-color: var(--nue-error-color-50);
}
</style>

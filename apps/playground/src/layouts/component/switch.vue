<template>
    <demo title="基础">
        <nue-div align="center">
            <nue-switch />
            <nue-switch icon="check" />
        </nue-div>
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
            <nue-switch size="small" show-text />
            <nue-switch size="large" show-text />
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
    <demo title="插槽">
        <nue-switch v-model="sw5">
            <template #circle>
                <img :src="`https://picsum.photos/32?t=${sw5}`" />
            </template>
            <template #text>
                {{ sw5 ? '开' : '关' }}
            </template>
        </nue-switch>
    </demo>
    <demo title="条件渲染">
        <nue-div align="center">
            <nue-button @click="showDemo = !showDemo" size="small">
                {{ showDemo ? '隐藏' : '显示' }}
            </nue-button>
            <template v-if="showDemo">
                <nue-switch
                    v-model="demoVal"
                    show-text
                    active-text="已开启"
                    inactive-text="已关闭"
                />
                <nue-text size="sm">圆圈位置正常 ✓</nue-text>
            </template>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { NueDiv, NueSwitch, NueButton, NueText } from '@nue-ui/components';
import Demo from '@/components/demo.vue';

const sw1 = ref(false);
const sw2 = reactive({ loading: true });
const sw3 = reactive({ value: false, loading: false });
const sw4 = reactive({ s1: false, s2: true });
const sw5 = ref(false);
const showDemo = ref(false);
const demoVal = ref(true);

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

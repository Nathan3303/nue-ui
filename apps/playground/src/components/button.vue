<template>
    <demo title="基础用法">
        <nue-div align="center">
            <nue-button icon="theme">中文 English</nue-button>
            <nue-button disabled>禁用状态</nue-button>
        </nue-div>
    </demo>
    <demo title="加载态">
        <nue-div align="center">
            <nue-button :loading="isSearching" @click="handleSearch">加载状态</nue-button>
            <nue-button :loading="isSearching" loading-icon="scan" @click="handleSearch">
                自定加载图标
            </nue-button>
        </nue-div>
    </demo>
    <demo title="节流">
        <nue-div align="center">
            <nue-button :throttle-duration="2000" use-throttle @click="count++">
                节流（点击次数 {{ count }}）
            </nue-button>
        </nue-div>
    </demo>
    <demo title="尺寸">
        <nue-div align="center">
            <nue-button icon="theme" size="small">小尺寸</nue-button>
            <nue-button icon="theme">普通尺寸</nue-button>
            <nue-button icon="theme" size="large">大尺寸</nue-button>
        </nue-div>
    </demo>
    <demo title="样式">
        <nue-div align="center">
            <nue-button theme="round">圆角</nue-button>
            <nue-button icon="search" theme="icon" title="图标主题" />
            <nue-button theme="primary">主要</nue-button>
            <nue-button theme="secondary">次要</nue-button>
            <nue-button theme="destructive">破坏</nue-button>
            <nue-button theme="ghost">幽灵</nue-button>
            <nue-button theme="pure">纯净</nue-button>
            <nue-button :theme="{ round: true, primary: true }">多主题应用：主要+圆角</nue-button>
        </nue-div>
    </demo>
    <demo title="后置插槽">
        <nue-button>
            后置插槽
            <template #append>
                <nue-icon name="arrow-right-more" />
            </template>
        </nue-button>
    </demo>
    <demo title="ButtonGroup 按钮组">
        <nue-div>
            <nue-button-group>
                <nue-button icon="plus">添加</nue-button>
                <nue-button disabled icon="search">搜索</nue-button>
                <nue-button icon="more">更多</nue-button>
            </nue-button-group>
            <nue-button-group disabled>
                <nue-button icon="plus">添加</nue-button>
                <nue-button disabled icon="search">搜索</nue-button>
                <nue-button icon="more">更多</nue-button>
            </nue-button-group>
            <nue-button-group size="small">
                <nue-button icon="plus">添加</nue-button>
                <nue-button disabled icon="search">搜索</nue-button>
                <nue-button icon="more">更多</nue-button>
            </nue-button-group>
            <nue-button-group>
                <nue-button theme="round">圆角</nue-button>
                <nue-button icon="search" theme="icon" />
                <nue-button theme="primary">主要</nue-button>
                <nue-button theme="secondary">次要</nue-button>
                <nue-button theme="destructive">破坏</nue-button>
                <nue-button theme="ghost">幽灵</nue-button>
            </nue-button-group>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueIcon, NueButton, NueButtonGroup } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const isSearching = ref(false);
const count = ref(0);

function handleSearch() {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 2400);
}
</script>

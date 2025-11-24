<template>
    <demo title="基础用法">
        <nue-div align="center">
            <nue-button>中文</nue-button>
            <nue-button>English</nue-button>
        </nue-div>
    </demo>
    <demo title="图标按钮">
        <nue-div align="center">
            <nue-button icon="theme">图标按钮</nue-button>
            <nue-button icon="search">搜索</nue-button>
        </nue-div>
    </demo>
    <demo title="禁用状态">
        <nue-button disabled>禁用状态</nue-button>
    </demo>
    <demo title="加载态">
        <nue-div align="center">
            <nue-button loading>加载状态</nue-button>
            <nue-button loading loading-icon="scan">自定加载图标</nue-button>
        </nue-div>
    </demo>
    <demo title="节流">
        <nue-div align="center">
            <nue-button :throttle-duration="2000" use-throttle @click="count++">
                节流 - 点击 {{ count }}
            </nue-button>
        </nue-div>
    </demo>
    <demo title="尺寸">
        <nue-div align="center">
            <nue-button size="small" icon="priority-1">小尺寸</nue-button>
            <nue-button icon="priority-2">普通尺寸</nue-button>
            <nue-button size="large" icon="priority-3">大尺寸</nue-button>
        </nue-div>
    </demo>
    <demo title="样式">
        <nue-div wrap="wrap" align="center">
            <nue-button theme="primary" icon="theme">主要</nue-button>
            <nue-button theme="secondary" icon="theme">次要</nue-button>
            <nue-button theme="destructive" icon="theme">销毁</nue-button>
            <nue-button theme="success" icon="theme">成功</nue-button>
            <nue-button theme="warning" icon="theme">警告</nue-button>
            <nue-button theme="error" icon="theme">错误</nue-button>
            <nue-button theme="ghost" icon="theme">幽灵</nue-button>
            <nue-button theme="pure" icon="theme">纯净</nue-button>
            <nue-button theme="icon" icon="theme">图标</nue-button>
            <nue-button theme="round" icon="theme">胶囊</nue-button>
            <nue-button theme="round,primary" icon="search"
                >多主题复合使用（主要 + 胶囊）</nue-button
            >
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
        <nue-div wrap="wrap">
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
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueIcon, NueButton, NueButtonGroup } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const count = ref(0);
</script>

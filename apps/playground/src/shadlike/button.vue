<template>
    <demo title="默认主题">
        <nue-div align="center">
            <nue-button>Original</nue-button>
            <nue-button loading>Loading</nue-button>
            <nue-button disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="round 圆角主题">
        <nue-div align="center">
            <nue-button theme="round">Original</nue-button>
            <nue-button theme="round" loading>Loading</nue-button>
            <nue-button theme="round" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="icon 仅图标主题">
        <nue-div align="center">
            <nue-button icon="theme" theme="icon" />
            <nue-button icon="theme" theme="icon" loading />
            <nue-button icon="theme" theme="icon" disabled />
        </nue-div>
    </demo>
    <demo title="ghost 幽灵主题">
        <nue-div align="center">
            <nue-button theme="ghost">Original</nue-button>
            <nue-button theme="ghost" loading>Loading</nue-button>
            <nue-button theme="ghost" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="secondary 次要主题">
        <nue-div align="center">
            <nue-button theme="secondary">Original</nue-button>
            <nue-button theme="secondary" loading>Loading</nue-button>
            <nue-button theme="secondary" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="destructive 破坏性主题">
        <nue-div align="center">
            <nue-button theme="destructive">Original</nue-button>
            <nue-button theme="destructive" loading>Loading</nue-button>
            <nue-button theme="destructive" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="success 成功主题">
        <nue-div align="center">
            <nue-button theme="success">Original</nue-button>
            <nue-button theme="success" loading>Loading</nue-button>
            <nue-button theme="success" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="warning 警告主题">
        <nue-div align="center">
            <nue-button theme="warning">Original</nue-button>
            <nue-button theme="warning" loading>Loading</nue-button>
            <nue-button theme="warning" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="error 错误主题">
        <nue-div align="center">
            <nue-button theme="error">Original</nue-button>
            <nue-button theme="error" loading>Loading</nue-button>
            <nue-button theme="error" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueButton } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

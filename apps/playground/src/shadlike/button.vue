<template>
    <demo title="默认主题">
        <nue-div align="center">
            <nue-button>Original</nue-button>
            <nue-button loading>Loading</nue-button>
            <nue-button disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="圆角主题" sub-title="round">
        <nue-div align="center">
            <nue-button theme="round">Original</nue-button>
            <nue-button theme="round" loading>Loading</nue-button>
            <nue-button theme="round" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="仅图标主题" sub-title="icon">
        <nue-div align="center">
            <nue-button icon="theme" theme="icon" />
            <nue-button icon="theme" theme="icon" loading />
            <nue-button icon="theme" theme="icon" disabled />
        </nue-div>
    </demo>
    <demo title="幽灵主题" sub-title="ghost">
        <nue-div align="center">
            <nue-button theme="ghost">Original</nue-button>
            <nue-button theme="ghost" loading>Loading</nue-button>
            <nue-button theme="ghost" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="次要主题" sub-title="secondary">
        <nue-div align="center">
            <nue-button theme="secondary">Original</nue-button>
            <nue-button theme="secondary" loading>Loading</nue-button>
            <nue-button theme="secondary" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="破坏性主题" sub-title="destructive">
        <nue-div align="center">
            <nue-button theme="destructive">Original</nue-button>
            <nue-button theme="destructive" loading>Loading</nue-button>
            <nue-button theme="destructive" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="成功主题" sub-title="success">
        <nue-div align="center">
            <nue-button theme="success">Original</nue-button>
            <nue-button theme="success" loading>Loading</nue-button>
            <nue-button theme="success" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="警告主题" sub-title="warning">
        <nue-div align="center">
            <nue-button theme="warning">Original</nue-button>
            <nue-button theme="warning" loading>Loading</nue-button>
            <nue-button theme="warning" disabled>Disabled</nue-button>
        </nue-div>
    </demo>
    <demo title="错误主题" sub-title="error">
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

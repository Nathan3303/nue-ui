<template>
    <demo title="基础">
        <nue-button @click="basic.visible = true">打开抽屉</nue-button>
        <nue-drawer v-model="basic.visible" title="基础抽屉">这是一个基础抽屉</nue-drawer>
    </demo>
    <demo title="定义打开方向">
        <nue-div>
            <nue-button @click="direction.visible1 = true">打开抽屉（上）</nue-button>
            <nue-button @click="direction.visible2 = true">打开抽屉（左）</nue-button>
            <nue-button @click="direction.visible3 = true">打开抽屉（下）</nue-button>
        </nue-div>
        <nue-drawer v-model="direction.visible1" open-from="top" title="定义了打开方向的抽屉">
            这是一个从上往下打开的抽屉
        </nue-drawer>
        <nue-drawer v-model="direction.visible2" open-from="left" title="定义了打开方向的抽屉">
            这是一个从左往右打开的抽屉
        </nue-drawer>
        <nue-drawer v-model="direction.visible3" open-from="bottom" title="定义了打开方向的抽屉">
            这是一个从下往上打开的抽屉
        </nue-drawer>
    </demo>
    <demo title="点击背景层关闭抽屉">
        <nue-button @click="allowCloseByOverlay.visible = true">打开抽屉</nue-button>
        <nue-drawer
            v-model="allowCloseByOverlay.visible"
            allow-close-by-overlay
            title="允许通过背景层关闭抽屉"
        >
            这是一个能够通过点击背景层关闭的抽屉
        </nue-drawer>
    </demo>
    <demo title="同时打开多个抽屉">
        <nue-div>
            <nue-button @click="multiple.visible1 = true">打开抽屉 A</nue-button>
            <nue-button @click="multiple.visible2 = true">打开抽屉 B</nue-button>
        </nue-div>
        <nue-drawer v-model="multiple.visible1" title="抽屉 A">
            <nue-div vertical>
                <nue-text>通过下方按钮在抽屉 A 之上打开抽屉 B</nue-text>
                <nue-button @click="multiple.visible2 = true">打开抽屉 B</nue-button>
            </nue-div>
        </nue-drawer>
        <nue-drawer v-model="multiple.visible2" open-from="left" title="抽屉 B">
            <nue-div vertical>
                <nue-text>通过下方按钮在抽屉 B 之上打开抽屉 A</nue-text>
                <nue-button @click="multiple.visible1 = true">打开抽屉 A</nue-button>
            </nue-div>
        </nue-drawer>
    </demo>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { NueDiv, NueButton, NueDrawer, NueText } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const basic = reactive({ visible: false });
const direction = reactive({ visible1: false, visible2: false, visible3: false });
const allowCloseByOverlay = reactive({ visible: false });
const multiple = reactive({ visible1: false, visible2: false });
</script>

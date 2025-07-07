<template>
    <demo title="基础">
        <nue-link>链接</nue-link>
    </demo>
    <demo title="定义地址">
        <nue-div>
            <nue-link href="/button">去 Button 组件页面</nue-link>
            <nue-link href="https://www.baidu.com">去百度</nue-link>
        </nue-div>
    </demo>
    <demo title="图标">
        <nue-link icon="connection">链接</nue-link>
    </demo>
    <demo title="内联">
        <nue-text>
            使用
            <nue-link href="/infinite-scroll">InfiniteScroll</nue-link>
            组件时需要绑定事件 load-more 的执行函数，事件会在滚动到加载阈值时触发。
            加载阈值表示当前滚动位置与列表底部的距离，可以通过属性 trigger-height 设置，默认为 150px
            。 通过 height 属性设置可视区域的高度，默认为 100% 。
        </nue-text>
    </demo>
    <demo title="主题">
        <nue-div align="center">
            <nue-link theme="rl,rl-sm">链接</nue-link>
            <nue-link theme="rl" icon="connection">链接</nue-link>
            <nue-link theme="rl,rl-lg" icon="theme"></nue-link>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueLink, NueText } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

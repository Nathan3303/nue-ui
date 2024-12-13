<template>
    <demo title="Link 链接">
        <nue-div align="center">
            <nue-link href="https://www.baidu.com" icon="connection" />
        </nue-div>
        <nue-div align="center">
            <nue-link icon="board" theme="rl,rl-s">路由链接（小）</nue-link>
            <nue-link icon="board" theme="rl">路由链接</nue-link>
            <nue-link icon="board" theme="rl,rl-l">路由链接（大）</nue-link>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import Demo from '../layouts/demo.vue';
</script>

<template>
    <demo title="Link 链接">
        <nue-div vertical>
            <nue-div align="center">
                <nue-link href="#">基础文本链接</nue-link>
                <nue-link href="https://www.baidu.com" />
                <nue-link href="#" icon="connection">带图标文本链接</nue-link>
            </nue-div>
            <nue-div align="center">
                <nue-link icon="board" theme="rl,rl-l">大型路由链接</nue-link>
                <nue-link icon="board" theme="rl">基础路由链接</nue-link>
                <nue-link icon="board" theme="rl,rl-s">小型路由链接</nue-link>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import NueLink from '@nue-ui/components/link/link.vue';
import Demo from '../layouts/demo.vue';
</script>

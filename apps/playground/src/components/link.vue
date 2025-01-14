<template>
    <demo title="Link 链接">
        <nue-div vertical>
            <nue-div align="center">
                <nue-link href="#">文本链接</nue-link>
                <nue-link
                    href="https://www.baidu.com"
                    title="不含文本，显示链接"
                />
                <nue-link href="#" icon="connection">带前置图标</nue-link>
            </nue-div>
            <nue-div align="center">
                <nue-link icon="board" theme="rl,rl-lg">大型路由链接</nue-link>
                <nue-link icon="board" theme="rl">基础路由链接</nue-link>
                <nue-link icon="board" theme="rl,rl-sm">小型路由链接</nue-link>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueLink } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

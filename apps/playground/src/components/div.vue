<template>
    <demo title="水平方向">
        <nue-div>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
        </nue-div>
    </demo>
    <demo title="垂直方向">
        <nue-div vertical>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
        </nue-div>
    </demo>
    <demo title="水平居中">
        <nue-div justify="center">
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
        </nue-div>
    </demo>
    <demo title="垂直居中">
        <nue-div align="center" vertical>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
        </nue-div>
    </demo>
    <demo title="水平垂直居中">
        <nue-div
            vertical
            align="center"
            justify="center"
            height="128px"
            style="background-color: var(--nue-primary-color-100)"
        >
            <nue-button>按钮</nue-button>
        </nue-div>
    </demo>
    <demo title="换行">
        <nue-div wrap="wrap">
            <nue-button v-for="i in 12" :key="i">按钮</nue-button>
        </nue-div>
    </demo>
    <demo title="使用滚动">
        <nue-div vertical>
            <nue-div width="fit-content">
                <nue-button>按钮</nue-button>
            </nue-div>
            <nue-div overflow="auto">
                <nue-button v-for="i in 12" :key="i">按钮</nue-button>
            </nue-div>
        </nue-div>
    </demo>
    <demo title="水平嵌套自动适应">
        <nue-div auto-fit>
            <nue-button>按钮</nue-button>
            <nue-div flex="1">
                <nue-button>按钮</nue-button>
            </nue-div>
            <nue-button>按钮</nue-button>
        </nue-div>
    </demo>
    <demo title="垂直嵌套自动适应">
        <nue-div vertical auto-fit>
            <nue-div justify="space-between">
                <nue-text>Title</nue-text>
                <nue-button theme="pure">Close</nue-button>
            </nue-div>
            <nue-text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat eveniet, eaque iste
                iure atque, voluptatum sed laborum corporis quae, non soluta. Repellat odio eaque
                rem reprehenderit molestiae quod tenetur sunt!
            </nue-text>
            <nue-div justify="flex-end">
                <nue-button>按钮</nue-button>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import Demo from '../layouts/demo.vue';
import { NueDiv, NueButton, NueText } from '@nue-ui/components';
</script>

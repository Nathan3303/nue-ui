<template>
    <demo title="水平">
        <nue-div gap=".5rem" vertical>
            <nue-text color="gray" size="var(--nue-text-sm)">这是一段文字</nue-text>
            <nue-divider />
            <nue-text color="gray" size="var(--nue-text-sm)">这是一段文字</nue-text>
        </nue-div>
    </demo>
    <demo title="垂直">
        <nue-div align="center">
            <nue-button>按钮</nue-button>
            <nue-divider vertical />
            <nue-button>按钮</nue-button>
            <nue-divider vertical />
            <nue-button>按钮</nue-button>
        </nue-div>
    </demo>
    <demo title="定义线条颜色、类型以及粗细">
        <nue-div gap=".5rem" vertical>
            <nue-text color="gray" size="var(--nue-text-sm)">颜色</nue-text>
            <nue-divider line-color="red" />
            <nue-text color="gray" size="var(--nue-text-sm)">类型</nue-text>
            <nue-divider line-color="red" line-style="dashed" />
            <nue-text color="gray" size="var(--nue-text-sm)">粗细</nue-text>
            <nue-divider line-color="red" line-style="dashed" line-width="3px" />
        </nue-div>
    </demo>
    <demo title="定义文本或其他内容">
        <nue-div vertical>
            <nue-divider line-width="2px" text="这是一条 2px 的分界线" />
            <nue-divider line-width="2px" alignment="center">
                <nue-avatar size="3rem" theme="round" src="https://picsum.photos/200/300" />
            </nue-divider>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueButton, NueDivider, NueText, NueAvatar } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

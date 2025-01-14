<template>
    <demo title="Tooltip 文字提示">
        <nue-div vertical>
            <nue-div align="center">
                <nue-tooltip content="上方左对齐" placement="top-start">
                    <nue-button theme="small">上方左对齐</nue-button>
                </nue-tooltip>
                <nue-tooltip content="上方居中" placement="top-center">
                    <nue-button theme="small">上方居中</nue-button>
                </nue-tooltip>
                <nue-tooltip content="上方右对齐" placement="top-end">
                    <nue-button theme="small">上方右对齐</nue-button>
                </nue-tooltip>
                <nue-tooltip content="左方上对齐" placement="left-start">
                    <nue-button theme="small">左方上对齐</nue-button>
                </nue-tooltip>
                <nue-tooltip content="左方居中" placement="left-center">
                    <nue-button theme="small">左方居中</nue-button>
                </nue-tooltip>
                <nue-tooltip content="左方下对齐" placement="left-end">
                    <nue-button theme="small">左方下对齐</nue-button>
                </nue-tooltip>
                <nue-tooltip content="下方左对齐" placement="bottom-start">
                    <nue-button theme="small">下方左对齐</nue-button>
                </nue-tooltip>
                <nue-tooltip content="下方居中" placement="bottom-center">
                    <nue-button theme="small">下方居中</nue-button>
                </nue-tooltip>
                <nue-tooltip content="下方右对齐" placement="bottom-end">
                    <nue-button theme="small">下方右对齐</nue-button>
                </nue-tooltip>
                <nue-tooltip content="右方上对齐" placement="right-start">
                    <nue-button theme="small">右方上对齐</nue-button>
                </nue-tooltip>
                <nue-tooltip content="右方居中" placement="right-center">
                    <nue-button theme="small">右方居中</nue-button>
                </nue-tooltip>
                <nue-tooltip content="右方下对齐" placement="right-end">
                    <nue-button theme="small">右方下对齐</nue-button>
                </nue-tooltip>
            </nue-div>
            <nue-div align="center">
                <nue-tooltip content="小型文字提示" size="small">
                    <nue-button theme="small">小型文字提示</nue-button>
                </nue-tooltip>
                <nue-tooltip content="大型文字提示" size="large">
                    <nue-button theme="small">大型文字提示</nue-button>
                </nue-tooltip>
            </nue-div>
            <nue-div align="center">
                <nue-tooltip content="文字提示：自定主题 1" theme="custom">
                    <nue-button theme="small">文字提示：自定主题 1</nue-button>
                </nue-tooltip>
                <nue-tooltip content="文字提示：自定主题 2" theme="custom2">
                    <nue-button theme="small">文字提示：自定主题 2</nue-button>
                </nue-tooltip>
            </nue-div>
            <nue-div align="center">
                <nue-tooltip placement="right-start" theme="custom">
                    <nue-button theme="small">
                        自定义文本 - #content 插槽
                    </nue-button>
                    <template #content>
                        <nue-text
                            color="var(--nue-primary-color-100)"
                            size="var(--nue-text-sm)"
                        >
                            大家好！我是张伟，对技术、创新和持续学习充满热情。我拥有计算机科学背景，并对人工智能领域有着浓厚的兴趣，一直致力于探索技术如何解决现实世界的问题。
                            在职业方面，我在ABC科技公司担任软件工程师，专注于开发可扩展且高效的软件解决方案。我喜欢与跨职能团队合作，将创新想法变为现实，并总是寻找个人和职业成长的机会。
                            工作之余，我是一个热爱阅读的人，喜欢紧跟科技行业的最新动态。我也热衷于参与开源项目，通过实践来不断提升自己的技术能力。
                        </nue-text>
                    </template>
                </nue-tooltip>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueText, NueButton, NueTooltip } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<style>
.nue-tooltip--custom {
    background: linear-gradient(to right, #ff416c, #ff4b2b);
}

.nue-tooltip--custom2 {
    --nue-tooltip-font-color: #303a49;
    background: linear-gradient(to left, #3cff97, #2dc7ff);
}
</style>

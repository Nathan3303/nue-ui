<template>
    <demo title="基础">
        <nue-div theme="grid">
            <nue-tooltip
                v-for="tooltip in tooltips"
                :key="tooltip.placement"
                :content="tooltip.content"
                :placement="tooltip.placement"
                :style="{ gridArea: tooltip.placement }"
            >
                <nue-button>
                    {{ tooltip.buttonText }}
                </nue-button>
            </nue-tooltip>
        </nue-div>
    </demo>
    <demo title="大小">
        <nue-div align="center">
            <nue-tooltip content="小型文字提示" size="small">
                <nue-button>小型文字提示</nue-button>
            </nue-tooltip>
            <nue-tooltip content="大型文字提示" size="large">
                <nue-button>大型文字提示</nue-button>
            </nue-tooltip>
        </nue-div>
    </demo>
    <demo title="主题">
        <nue-div align="center">
            <nue-tooltip content="自定主题 1" theme="custom">
                <nue-button>主题 1</nue-button>
            </nue-tooltip>
            <nue-tooltip content="自定主题 2" theme="custom2">
                <nue-button>主题 2</nue-button>
            </nue-tooltip>
        </nue-div>
    </demo>
    <demo title="定义触发元素（插槽）">
        <nue-tooltip content="去往自定义演练页面" placement="right-center">
            <nue-link href="/custom">自定义演练</nue-link>
        </nue-tooltip>
    </demo>
    <demo title="定义弹出内容（插槽）">
        <nue-tooltip placement="right-start">
            <nue-button>内容插槽</nue-button>
            <template #content>
                <nue-text color="var(--nue-primary-color-100)" size="var(--nue-text-sm)">
                    🌙 在那遥远而神秘的夜晚，星辰如同细碎的钻石，点缀着深邃的天幕。
                    微风轻拂，带着一丝丝凉爽和花香，仿佛能穿透心灵的每一个角落。🔮
                    魔法在空气中悄然弥漫，每一盏路灯都似乎拥有了自己的故事，静静地诉说着过往与未来。
                    人们在这样的夜晚里，更容易沉醉于幻想，让心灵得到最纯粹的释放。🌌
                    抬头仰望，银河如练，让人不禁遐想，是否在那遥远的地方，也有同样的人在凝视着这片星空，
                    心中充满了对未知的渴望与向往。
                </nue-text>
            </template>
        </nue-tooltip>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueText, NueButton, NueTooltip, NueLink } from '@nue-ui/components';
import Demo from '@/components/demo.vue';

const tooltips = [
    { placement: 'top-start', content: '上方左对齐', buttonText: '上左' },
    { placement: 'top-center', content: '上方居中', buttonText: '上中' },
    { placement: 'top-end', content: '上方右对齐', buttonText: '上右' },
    { placement: 'left-start', content: '左方上对齐', buttonText: '左上' },
    { placement: 'left-center', content: '左方居中', buttonText: '左中' },
    { placement: 'left-end', content: '左方下对齐', buttonText: '左下' },
    { placement: 'bottom-start', content: '下方左对齐', buttonText: '下左' },
    { placement: 'bottom-center', content: '下方居中', buttonText: '下中' },
    { placement: 'bottom-end', content: '下方右对齐', buttonText: '下右' },
    { placement: 'right-start', content: '右方上对齐', buttonText: '右上' },
    { placement: 'right-center', content: '右方居中', buttonText: '右中' },
    { placement: 'right-end', content: '右方下对齐', buttonText: '右下' }
];
</script>

<style>
.nue-div--grid {
    display: grid;
    width: 40rem;
    grid-template-areas:
        '. top-start top-center top-end .'
        'left-start . . . right-start'
        'left-center . . . right-center'
        'left-end . . . right-end'
        '. bottom-start bottom-center bottom-end .';
}

.nue-tooltip--custom {
    background: linear-gradient(to right, #ff416c, #ff4b2b);
}

.nue-tooltip--custom2 {
    --nue-tooltip-font-color: #303a49;
    background: linear-gradient(to left, #3cff97, #2dc7ff);
}
</style>

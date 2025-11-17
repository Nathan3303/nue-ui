<template>
    <demo title="基础">
        <nue-text>在那遥远而神秘的夜晚，星辰如同细碎的钻石，点缀着深邃的天幕。</nue-text>
    </demo>
    <demo title="自定标签">
        <nue-div vertical>
            <nue-text tag="h1">一级标题(h1)</nue-text>
            <nue-text tag="h2">二级标题(h2)</nue-text>
            <nue-text tag="h3">三级标题(h3)</nue-text>
            <nue-text tag="h4">四级标题(h4)</nue-text>
            <nue-text tag="h5">五级标题(h5)</nue-text>
            <nue-text tag="h6">六级标题(h6)</nue-text>
            <nue-text tag="p">段落(p)</nue-text>
            <nue-text tag="strong">粗体(strong)</nue-text>
            <nue-text>默认(span)</nue-text>
        </nue-div>
    </demo>
    <demo title="颜色">
        <nue-div>
            <nue-text color="#F00">红色文本</nue-text>
            <nue-text color="var(--nue-success-color-50)">绿色文本</nue-text>
            <nue-text color="blue">蓝色文本</nue-text>
        </nue-div>
    </demo>
    <demo title="大小">
        <nue-div align="center">
            <nue-text size="1rem">1rem文本</nue-text>
            <nue-text size="xl">xlarge文本</nue-text>
        </nue-div>
    </demo>
    <demo title="装饰">
        <nue-div>
            <nue-text decoration="underline">下划线</nue-text>
            <nue-text decoration="line-through">删除线</nue-text>
            <nue-text decoration="overline">上划线</nue-text>
        </nue-div>
    </demo>
    <demo title="溢出隐藏">
        <nue-text :clamped="2">
            文本可显示的最大行数。当内容超过设置值则会隐藏超出的内容，并显示省略号。此时的属性值为 2
            。（填充文本：在那遥远而神秘的夜晚，星辰如同细碎的钻石，点缀着深邃的天幕。
            微风轻拂，带着一丝丝凉爽和花香，仿佛能穿透心灵的每一个角落。
            魔法在空气中悄然弥漫，每一盏路灯都似乎拥有了自己的故事，静静地诉说着过往与未来。）
        </nue-text>
    </demo>
    <demo title="嵌套">
        <nue-text tag="p">
            🌙 在那遥远而神秘的夜晚，星辰如同细碎的钻石，点缀着深邃的天幕。
            <nue-text weight="bold">
                微风轻拂，带着一丝丝凉爽和花香，仿佛能穿透心灵的每一个角落。
            </nue-text>
            <nue-text color="orange">
                🔮 魔法在空气中悄然弥漫，每一盏路灯都似乎拥有了自己的故事，静静地诉说着过往与未来。
            </nue-text>
            人们在这样的夜晚里，更容易沉醉于幻想，
            <nue-text decoration="line-through">让心灵得到最纯粹的释放。</nue-text>
            🌌
            抬头仰望，银河如练，让人不禁遐想，是否在那遥远的地方，也有同样的人在凝视着这片星空，心中充满了对未知的渴望与向往。
        </nue-text>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueText } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

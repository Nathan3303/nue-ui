<template>
    <demo title="Text 文本">
        <nue-div vertical>
            <nue-div align="end" gap="24px">
                <nue-text tag="h1">一级标题(h1)</nue-text>
                <nue-text tag="h2">二级标题(h2)</nue-text>
                <nue-text tag="h3">三级标题(h3)</nue-text>
                <nue-text tag="h4">四级标题(h4)</nue-text>
                <nue-text tag="p">段落(p)</nue-text>
                <nue-text tag="b">粗体(b)</nue-text>
                <nue-text>默认文本(span)</nue-text>
            </nue-div>
            <nue-div align="end" gap="24px">
                <nue-text decoration="underline">文本装饰：下划线</nue-text>
                <nue-text color="orange">文本颜色：橙色</nue-text>
                <nue-text size="xlarge">文本大小：xlarge</nue-text>
            </nue-div>
            <nue-text :clamped="1">
                文本可显示的最大行数。当内容超过设置值则会隐藏超出的内容，并显示省略号。此时的属性值为
                1 。填充文本：Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Beataevero ratione, eius, nostrum ad quos temporibus quod
                cum in minima, iste magni dolorem ullam nihil animi perferendis
                perspiciatis atque blanditiis!
            </nue-text>
        </nue-div>
    </demo>
    <demo title="文本示例">
        <nue-div vertical>
            <nue-text color="#34495e" decoration="underline" tag="h2">
                ✨ 梦幻之夜 ✨
            </nue-text>
            <nue-text color="#2c3e50" tag="p">
                🌙 在那遥远而神秘的夜晚，星辰如同细碎的钻石，点缀着深邃的天幕。
                <nue-text weight="bold">
                    微风轻拂，带着一丝丝凉爽和花香，仿佛能穿透心灵的每一个角落。
                </nue-text>
                <br />
                🔮
                魔法在空气中悄然弥漫，每一盏路灯都似乎拥有了自己的故事，静静地诉说着过往与未来。人们在这样的夜晚里，更容易沉醉于幻想，
                <nue-text decoration="line-through">
                    让心灵得到最纯粹的释放。
                </nue-text>
                <br />
                🌌
                抬头仰望，银河如练，让人不禁遐想，是否在那遥远的地方，也有同样的人在凝视着这片星空，心中充满了对未知的渴望与向往。<br />
            </nue-text>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueText } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

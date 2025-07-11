<template>
    <nue-div vertical>
        <nue-button @click="handleClick">{{ isClamped ? '禁用' : '启用' }}溢出隐藏</nue-button>
        <nue-text :clamped="isClamped">
            文本可显示的最大行数。当内容超过设置值则会隐藏超出的内容，并显示省略号。（填充文本：在那遥远而神秘的夜晚，
            星辰如同细碎的钻石，点缀着深邃的天幕。微风轻拂，带着一丝丝凉爽和花香，仿佛能穿透心灵的每一个角落。
            魔法在空气中悄然弥漫，每一盏路灯都似乎拥有了自己的故事，静静地诉说着过往与未来。）
        </nue-text>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isClamped = ref(0);

const handleClick = () => {
    isClamped.value = isClamped.value ? 0 : 2;
};
</script>

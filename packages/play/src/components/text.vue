<template>
    <nue-div vertical gap="4px">
        <nue-text size="normal" flex>
            Lorem ipsum dolor,
            <nue-text decoration="underline">下划线文本</nue-text>
            adipisicing elit. Aperiam animi maiores,commodi incidunt itaque
            <nue-text color="orange">橙色文本</nue-text>
            ullam ipsam temporibus.Eum, molestias.
            <nue-text size="xlarge">不同大小的文本</nue-text>
            id tenetur! Voluptate ea ipsum cumque.
        </nue-text>
    </nue-div>
    <nue-div vertical gap="0px">
        <nue-text tag="h1">一级标题</nue-text>
        <nue-text tag="h2">二级标题</nue-text>
        <nue-text tag="h3">三级标题</nue-text>
    </nue-div>
    <nue-div>
        <nue-text :clamped="2">
            最大行数，当内容超过设置值则会隐藏超出的内容，并显示省略号。 Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Beatae vero
            ratione, eius, nostrum ad quos temporibus quod cum in minima, iste
            magni dolorem ullam nihil animi perferendis perspiciatis atque
            blanditiis!
        </nue-text>
    </nue-div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

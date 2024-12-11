<template>
    <demo title="Text 文本">
        <nue-div vertical>
            <nue-text decoration="underline">下划线文本</nue-text>
            <nue-text color="orange">橙色文本</nue-text>
            <nue-text size="xlarge">不同大小的文本</nue-text>
            <nue-text :clamped="3">
                最大行数，当内容超过设置值则会隐藏超出的内容，并显示省略号。
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Beataevero ratione, eius, nostrum ad quos temporibus quod cum in
                minima, iste magni dolorem ullam nihil animi perferendis
                perspiciatis atque blanditiis!
            </nue-text>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import Demo from '../layouts/demo.vue';
</script>

<style scoped></style>

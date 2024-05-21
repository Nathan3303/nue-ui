<template>
    <nue-div vertical>
        <nue-div align="center">
            <nue-button theme="icon-only" icon="arrow-left" />
            <nue-divider direction="vertical" />
            <nue-avatar
                size="small"
                src="https://placehold.co/150x150"
                shape="round" />
            <nue-text style="margin-right: auto">Custom Title</nue-text>
            <nue-divider direction="vertical" />
            <nue-button theme="icon-only" icon="search" />
        </nue-div>
        <nue-div vertical>
            <nue-divider
                text="Lorem"
                border-width="2px"
                border-color="#34a853" />
            <nue-text size="small">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Veritatis magnam tempora doloremque iusto animi possimus nisi!
                Vitae aut eveniet eaque blanditiis modi iste nostrum
                perspiciatis. Nostrum veniam iure accusamus repellat!
            </nue-text>
            <nue-divider
                text="随机文字"
                border-width="2px"
                border-type="dashed" />
            <nue-text size="small">
                你上辈子一定是碳酸饮料吧，为什么我一看到你就能开心的冒泡？
            </nue-text>
        </nue-div>
    </nue-div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

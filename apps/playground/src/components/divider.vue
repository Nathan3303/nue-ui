<template>
    <demo title="Divider 分割线">
        <nue-div vertical>
            <nue-div align="center">
                <nue-button icon="arrow-left" theme="icon-only" />
                <nue-divider direction="vertical" />
                <nue-avatar
                    size="36px"
                    src="https://placehold.co/64x64?text=C"
                    theme="rounded"
                />
                <nue-text style="margin-right: auto">Custom Title</nue-text>
                <nue-divider direction="vertical" />
                <nue-button icon="search" theme="icon-only" />
            </nue-div>
            <nue-div vertical>
                <nue-divider
                    border-color="#34a853"
                    border-width="2px"
                    text="Lorem"
                />
                <nue-text size="small">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Veritatis magnam tempora doloremque iusto animi possimus
                    nisi! Vitae aut eveniet eaque blanditiis modi iste nostrum
                    perspiciatis. Nostrum veniam iure accusamus repellat!
                </nue-text>
                <nue-divider
                    border-type="dashed"
                    border-width="2px"
                    text="随机文字"
                />
                <nue-text size="small">
                    你上辈子一定是碳酸饮料吧，为什么我一看到你就能开心的冒泡？
                </nue-text>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import Demo from '../layouts/demo.vue';
</script>

<style scoped></style>

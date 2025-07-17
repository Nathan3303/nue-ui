<template>
    <nue-collapse>
        <nue-collapse-item title="自定标题">
            <nue-text>Lorem ipsum dolor sit amet, consectetur elit.</nue-text>
        </nue-collapse-item>
        <nue-collapse-item>
            <template #header="{ collapse, state }">
                <nue-div align="center" gap=".25rem">
                    <nue-icon
                        size=".875rem"
                        :name="state ? 'arrow-right' : 'arrow-down'"
                        @click="collapse"
                    />
                    <nue-text size=".875rem" @click="collapse">自定义头部</nue-text>
                </nue-div>
            </template>
            <nue-text>Lorem ipsum dolor sit amet, consectetur elit.</nue-text>
        </nue-collapse-item>
    </nue-collapse>
</template>
<script setup lang="ts"></script>

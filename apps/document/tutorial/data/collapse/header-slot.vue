<template>
    <nue-collapse>
        <nue-collapse-item title="自定标题">
            <nue-text>Lorem ipsum dolor sit amet, consectetur elit.</nue-text>
        </nue-collapse-item>
        <nue-collapse-item>
            <template #header="{ collapse, state }">
                <nue-button
                    :icon="`arrow-${state ? 'right' : 'down'}`"
                    theme="small"
                    @click="collapse"
                >
                    自定义头部
                </nue-button>
            </template>
            <nue-text>Lorem ipsum dolor sit amet, consectetur elit.</nue-text>
        </nue-collapse-item>
    </nue-collapse>
</template>

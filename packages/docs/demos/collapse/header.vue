<template>
    <nue-collapse>
        <nue-collapse-item title="折叠项 自定标题">
            <nue-text size="12px">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quibusdam voluptas harum velit, odit eaque aliquid optio
                excepturi quas! Deserunt sequi quisquam vero magni itaque
                assumenda facere dolore id tempora ab?
            </nue-text>
        </nue-collapse-item>
        <nue-collapse-item>
            <template #header="{ collapse, state }">
                <nue-div align="center" justify="space-between" @click.stop="collapse">
                    <nue-text size="14px">折叠项 自定义头部</nue-text>
                    <nue-text size="14px">
                        {{ state ? "展开" : "收起" }}
                    </nue-text>
                </nue-div>
            </template>
            <nue-text size="12px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                ullam iusto laudantium dignissimos repellendus delectus
                perferendis numquam quia quibusdam, et modi a. Ut cumque
                molestias quidem. Similique deserunt facilis labore.
            </nue-text>
        </nue-collapse-item>
    </nue-collapse>
</template>

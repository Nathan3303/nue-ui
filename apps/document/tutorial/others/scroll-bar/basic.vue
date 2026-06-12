<template>
    <nue-scroll-bar
        style="
            height: 180px;
            border: 1px solid var(--nue-border-color);
            border-radius: var(--nue-primary-radius);
        "
    >
        <div style="padding: 1rem">
            <p
                v-for="i in 10"
                :key="i"
                style="
                    margin: 0 0 1rem 0;
                    line-height: 1.6;
                    color: var(--nue-secondary-text-color);
                    font-size: var(--nue-text-sm);
                "
            >
                滚动内容行 {{ i }} ——
                这是一段用于演示滚动效果的示例文本，当内容超出容器高度时，自定义滚动条会自动出现。
            </p>
        </div>
    </nue-scroll-bar>
</template>

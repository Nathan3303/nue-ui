<template>
    <nue-div gap="1.5rem" vertical>
        <!-- theme 属性 -->
        <nue-div gap="0.5rem" vertical>
            <nue-text size=".875rem" color="gray" :weight="600">通过 theme 属性应用主题</nue-text>
            <nue-scroll-bar theme="primary" mode="always">
                <div style="padding: 1rem">
                    <p
                        v-for="i in 6"
                        :key="i"
                        style="
                            margin: 0 0 0.75rem 0;
                            font-size: var(--nue-text-sm);
                            color: var(--nue-secondary-text-color);
                            line-height: 1.6;
                        "
                    >
                        第 {{ i }} 行：通过 <code>theme="primary"</code> 为主题添加 primary 样式。
                    </p>
                </div>
            </nue-scroll-bar>
        </nue-div>
    </nue-div>
</template>

<style scoped>
.nue-scroll-bar--primary {
    height: 128px;
    border: 1px solid var(--nue-border-color);
    border-radius: var(--nue-primary-radius);

    &:deep(.nue-scroll-bar__track) {
        background-color: var(--nue-primary-color-200);

        &.nue-scroll-bar__track--vertical {
            height: 100%;
            width: 24px;
            box-sizing: border-box;
        }

        .nue-scroll-bar__thumb {
            width: 12px;
            background-color: var(--nue-primary-color-600);
            margin: var(--nue-padding-2xs);

            &:hover {
                background-color: var(--nue-primary-color-800);
            }
        }
    }
}

.custom-scrollbar-v2 {
    --nue-scroll-bar-thumb-radius: 0;
    --nue-scroll-bar-track-bg: rgba(52, 152, 219, 0.08);
}
</style>

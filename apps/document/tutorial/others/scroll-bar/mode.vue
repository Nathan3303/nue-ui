<template>
    <nue-div gap="1.5rem" vertical>
        <nue-div gap="0.5rem" vertical>
            <nue-text size=".875rem" color="gray">always — 常驻显示</nue-text>
            <nue-scroll-bar
                mode="always"
                style="
                    height: 120px;
                    border: 1px solid var(--nue-border-color);
                    border-radius: var(--nue-primary-radius);
                "
            >
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
                        第 {{ i }} 行：滚动条始终可见。
                    </p>
                </div>
            </nue-scroll-bar>
        </nue-div>

        <nue-div gap="0.5rem" vertical>
            <nue-text size=".875rem" color="gray">hover — 悬停显示（默认）</nue-text>
            <nue-scroll-bar
                mode="hover"
                style="
                    height: 120px;
                    border: 1px solid var(--nue-border-color);
                    border-radius: var(--nue-primary-radius);
                "
            >
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
                        第 {{ i }} 行：鼠标移入时显示滚动条，移出后自动隐藏。
                    </p>
                </div>
            </nue-scroll-bar>
        </nue-div>

        <nue-div gap="0.5rem" vertical>
            <nue-text size=".875rem" color="gray">hidden — 始终保持隐藏</nue-text>
            <nue-scroll-bar
                mode="hidden"
                style="
                    height: 120px;
                    border: 1px solid var(--nue-border-color);
                    border-radius: var(--nue-primary-radius);
                "
            >
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
                        第 {{ i }} 行：滚动条隐藏，但仍可通过滚轮或键盘滚动内容。
                    </p>
                </div>
            </nue-scroll-bar>
        </nue-div>
    </nue-div>
</template>

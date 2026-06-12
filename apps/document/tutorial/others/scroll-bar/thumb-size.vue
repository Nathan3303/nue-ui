<template>
    <nue-div gap="1.5rem" vertical>
        <nue-div gap="0.5rem" vertical>
            <nue-text size=".875rem" color="gray">small</nue-text>
            <nue-scroll-bar
                thumb-size="small"
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
                        第 {{ i }} 行：细拇指滚动条。
                    </p>
                </div>
            </nue-scroll-bar>
        </nue-div>

        <nue-div gap="0.5rem" vertical>
            <nue-text size=".875rem" color="gray">default</nue-text>
            <nue-scroll-bar
                thumb-size="default"
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
                        第 {{ i }} 行：默认粗细滚动条。
                    </p>
                </div>
            </nue-scroll-bar>
        </nue-div>

        <nue-div gap="0.5rem" vertical>
            <nue-text size=".875rem" color="gray">large</nue-text>
            <nue-scroll-bar
                thumb-size="large"
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
                        第 {{ i }} 行：粗拇指滚动条。
                    </p>
                </div>
            </nue-scroll-bar>
        </nue-div>
    </nue-div>
</template>

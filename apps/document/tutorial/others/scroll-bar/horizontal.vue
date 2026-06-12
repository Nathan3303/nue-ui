<template>
    <nue-scroll-bar
        :horizontal="true"
        style="
            height: 120px;
            border: 1px solid var(--nue-border-color);
            border-radius: var(--nue-primary-radius);
        "
    >
        <div style="display: flex; gap: 1rem; padding: 1rem; width: max-content">
            <div
                v-for="i in 8"
                :key="i"
                style="
                    flex-shrink: 0;
                    width: 160px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--nue-primary-color-100);
                    border-radius: var(--nue-primary-radius);
                    color: var(--nue-primary-color-600);
                    font-size: var(--nue-text-sm);
                "
            >
                卡片 {{ i }}
            </div>
        </div>
    </nue-scroll-bar>
</template>

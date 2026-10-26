<template>
    <nue-container id="PlaygroundAppContainer">
        <nue-header class="pg-header">
            <nue-div flex="1" align="center" gap=".75rem" class="pg-header__brand">
                <nue-text size="lg" :clamped="1">
                    NueUI<span class="pg-title__suffix"> Playground</span>
                </nue-text>
                <nue-text
                    v-if="currentTitle"
                    size="sm"
                    :clamped="1"
                    class="pg-header__current"
                    color="var(--nue-secondary-text-color)"
                >
                    {{ currentTitle }}
                </nue-text>
            </nue-div>

            <nue-div width="fit-content" align="center" gap=".75rem" class="pg-header__actions">
                <nue-button
                    v-if="isNarrow"
                    theme="ghost"
                    :icon="asideOpen ? 'menu-close' : 'menu'"
                    aria-controls="pg-component-aside"
                    aria-label="组件列表"
                    :aria-expanded="asideOpen"
                    :title="asideOpen ? '收起组件列表' : '展开组件列表'"
                    @click="toggleAside"
                />
                <nue-div width="fit-content" align="center" class="pg-header__nav">
                    <nue-link
                        route="/component"
                        :theme="isNarrow ? 'route,route-small' : 'route'"
                        :icon="isNarrow ? 'board' : undefined"
                        :aria-label="isNarrow ? '组件' : undefined"
                        :title="isNarrow ? '组件' : undefined"
                    >
                        <template v-if="!isNarrow">组件</template>
                    </nue-link>
                    <nue-link
                        route="/custom"
                        :theme="isNarrow ? 'route,route-small' : 'route'"
                        :icon="isNarrow ? 'files' : undefined"
                        :aria-label="isNarrow ? '自由' : undefined"
                        :title="isNarrow ? '自由' : undefined"
                    >
                        <template v-if="!isNarrow">自由</template>
                    </nue-link>
                </nue-div>
                <nue-divider vertical class="pg-header__divider" />
                <nue-div width="fit-content" align="center" gap=".75rem" class="pg-header__meta">
                    <nue-text size="xs" color="var(--nue-secondary-text-color)">
                        {{ componentCount }} 个演示 · v{{ version }}
                    </nue-text>
                    <nue-link
                        href="https://github.com/Nathan3303/nue-ui"
                        icon="share"
                        size="sm"
                        title="打开 GitHub 仓库"
                    >
                        GitHub
                    </nue-link>
                </nue-div>
                <nue-divider vertical class="pg-header__divider" />
                <nue-button
                    theme="ghost"
                    icon="theme"
                    class="pg-dark-toggle"
                    :class="{ 'pg-dark-toggle--on': isDark }"
                    aria-label="暗色模式"
                    :aria-pressed="isDark ? 'true' : 'false'"
                    :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
                    @click="toggleDark"
                >
                    <template v-if="!isNarrow">暗色</template>
                </nue-button>
            </nue-div>
        </nue-header>
        <router-view />
    </nue-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
    NueContainer,
    NueHeader,
    NueLink,
    NueText,
    NueDiv,
    NueButton,
    NueDivider
} from '@nue-ui/components';
import { componentCount, componentLinks, customLayoutAsideLinks } from './constants.ts';
import { useShell } from './composables/use-shell.ts';

const route = useRoute();
const { isNarrow, asideOpen, isDark, toggleAside, toggleDark } = useShell();

/** 构建期注入（见 vite.config.ts）：与已发布包一致，不在外壳里再写一份版本号。 */
// eslint-disable-next-line no-undef -- 由 vite define 注入，声明在 src/vite-env.d.ts
const version = __NUE_UI_VERSION__;

/** 当前位置：header 直接显示组件名（Issue #85 P0-3）。 */
const currentTitle = computed(() => {
    const hit =
        componentLinks.find(link => link.route === route.path) ??
        customLayoutAsideLinks.find(link => link.route === route.path);
    return hit?.text ?? '';
});
</script>

<style scoped>
.pg-header {
    gap: var(--nue-gap-df);
}

.pg-header__current::before {
    content: '/';
    margin-right: 0.5rem;
    color: var(--nue-divider-color);
}

.pg-header__actions {
    flex: none;
}

/* 暗色开关：ghost 按钮本身没有「已开启」的视觉态，这里用主题 token 补一层按下态 */
.pg-dark-toggle--on {
    color: var(--nue-primary-color-900);
    background-color: var(--nue-primary-color-100);
    box-shadow: inset 0 0 0 1px var(--nue-border-color);
}

@media (max-width: 1180px) {
    .pg-header__meta {
        display: none;
    }
}

@media (max-width: 900px) {
    .pg-header__current,
    .pg-header__divider {
        display: none;
    }

    .pg-header__brand {
        flex: none;
        min-width: 0;
        /* 标题可截断，保证导航与开关永远优先（不同主题的按钮内边距不一致） */
        max-width: 38%;
        overflow: hidden;
    }

    /* 窄屏让标题退一档，把宽度留给导航与开关 */
    .pg-header__brand > .nue-text {
        font-size: var(--nue-text-df);
    }

    .pg-header {
        gap: var(--nue-gap-sm);
    }
}

@media (max-width: 700px) {
    /* 窄屏只留品牌词，把宽度让给导航与开关 */
    .pg-title__suffix {
        display: none;
    }
}
#PlaygroundAppContainer {
    /* 外壳锁全屏高度：页面不滚，滚动落在 content / aside 内部（0.2.2 滚动契约） */
    height: 100vh;
    min-height: 100vh;
    background-color: var(--nue-primary-color-0);
}
</style>
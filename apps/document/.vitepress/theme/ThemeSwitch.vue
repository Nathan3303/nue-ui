<script setup>
import { onMounted, ref } from 'vue';
import {
    THEMES,
    THEME_STORAGE_KEY,
    applyThemeCss,
    isDocTheme,
    readStoredTheme
} from './theme-css.mjs';

const LABELS = { shadlike: 'Shadlike', glass: 'Glass' };
const base = import.meta.env.BASE_URL;
const current = ref('shadlike');

onMounted(() => {
    // 引导脚本已在首屏写好 data-nue-theme；以它为准，避免按钮初态与真实样式不一致。
    const boot = document.documentElement.getAttribute('data-nue-theme');
    current.value = isDocTheme(boot) ? boot : readStoredTheme(window.localStorage);
});

/** @param {'shadlike' | 'glass'} theme */
function select(theme) {
    if (theme === current.value) return;
    current.value = theme;
    applyThemeCss(document, theme, base);
    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        /* 存储不可用：本次会话内仍然生效，只是不持久化 */
    }
}
</script>

<template>
    <div class="nue-doc-theme" role="group" aria-label="文档主题">
        <button
            v-for="theme in THEMES"
            :key="theme"
            type="button"
            class="nue-doc-theme__btn"
            :class="{ 'nue-doc-theme__btn--active': current === theme }"
            :aria-pressed="current === theme"
            :title="`切换到 ${LABELS[theme]} 主题`"
            @click="select(theme)"
        >
            {{ LABELS[theme] }}
        </button>
    </div>
</template>

<style scoped>
.nue-doc-theme {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    background-color: var(--vp-c-bg-soft);
}

.nue-doc-theme__btn {
    font-family: var(--vp-font-family-base);
    font-size: 12px;
    line-height: 1;
    font-weight: 400;
    padding: 5px 8px;
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition: color 0.18s ease;
}

.nue-doc-theme__btn:hover {
    color: var(--vp-c-text-1);
}

.nue-doc-theme__btn:focus-visible {
    outline: 2px solid var(--vp-c-brand-1);
    outline-offset: 2px;
}

.nue-doc-theme__btn--active {
    background-color: var(--vp-c-bg);
    /* 品牌色文字：暗色下 bg / bg-soft 太接近，靠颜色补足状态可读性 */
    color: var(--vp-c-brand-1);
    box-shadow: inset 0 0 0 1px var(--vp-c-divider);
}

@media (max-width: 767px) {
    .nue-doc-theme {
        margin-left: 4px;
    }

    .nue-doc-theme__btn {
        font-size: 11px;
        padding: 4px 6px;
    }
}
</style>
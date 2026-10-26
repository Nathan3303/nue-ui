/**
 * Playground 外壳状态（单例）。
 *
 * 只为外壳服务：窄屏断点、侧栏开合、暗色开关。
 * 用模块级单例而不是 provide/inject：App.vue（header 的按钮）与
 * views/component/index.vue（aside 宽度）是兄弟，单例比跨层注入更直白。
 */
import { computed, ref } from 'vue';

/** 与 CSS 断点保持一致（Issue #85 P0-2）。 */
export const NARROW_QUERY = '(max-width: 900px)';
/** 桌面固定宽度：最长链接约 200px，240px 留出搜索框与内边距。 */
export const ASIDE_WIDTH = '240px';
const DARK_STORAGE_KEY = 'nue-playground-dark';

const isNarrow = ref(false);
const asideOpen = ref(true);
const isDark = ref(false);
let started = false;

function applyDark(value: boolean) {
    isDark.value = value;
    // 主题用 --nue-dark-switch 驱动整棵 token 树，外壳只负责这个开关位。
    document.documentElement.style.setProperty('--nue-dark-switch', value ? '1' : '0');
}

function start() {
    if (started || typeof window === 'undefined') return;
    started = true;

    const media = window.matchMedia(NARROW_QUERY);
    isNarrow.value = media.matches;
    asideOpen.value = !media.matches;
    media.addEventListener('change', event => {
        isNarrow.value = event.matches;
        // 跨过断点时回到「该断点的合理默认」：桌面常开，窄屏默认收起。
        asideOpen.value = !event.matches;
    });

    let stored: string | null = null;
    try {
        stored = window.localStorage.getItem(DARK_STORAGE_KEY);
    } catch {
        /* 隐私模式：不持久化也能用 */
    }
    applyDark(stored === '1');
}

export function useShell() {
    start();

    const asideWidth = computed(() => {
        if (!isNarrow.value) return ASIDE_WIDTH;
        // 窄屏展开时也别吃掉整个视口：最多 80vw。
        return asideOpen.value ? `min(${ASIDE_WIDTH}, 80vw)` : '0px';
    });

    const asideVisible = computed(() => !isNarrow.value || asideOpen.value);

    function toggleAside() {
        asideOpen.value = !asideOpen.value;
    }

    function closeAside() {
        if (isNarrow.value) asideOpen.value = false;
    }

    function openAside() {
        asideOpen.value = true;
    }

    function toggleDark() {
        applyDark(!isDark.value);
        try {
            window.localStorage.setItem(DARK_STORAGE_KEY, isDark.value ? '1' : '0');
        } catch {
            /* 同上：存储不可用时仅本次会话生效 */
        }
    }

    return {
        isNarrow,
        asideOpen,
        asideVisible,
        asideWidth,
        isDark,
        toggleAside,
        closeAside,
        openAside,
        toggleDark
    };
}
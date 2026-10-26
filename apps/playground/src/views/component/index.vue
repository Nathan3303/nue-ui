<template>
    <nue-main class="pg-main">
        <nue-aside
            id="pg-component-aside"
            class="pg-aside"
            :class="{ 'pg-aside--collapsed': !asideVisible }"
            :width="asideWidth"
            :min-width="asideWidth"
            :max-width="asideWidth"
            :data-collapsed="!asideVisible"
            :style="collapsedStyle"
        >
            <nue-div v-show="asideVisible" vertical align="stretch" gap=".5rem" class="pg-nav">
                <!-- 原生 label：NueInput 的 aria-label 会落在包裹 div 上，无法命名内部 input（见回执的组件缺口） -->
                <label class="pg-sr-only" :for="SEARCH_ID">搜索组件</label>
                <nue-input
                    :id="SEARCH_ID"
                    ref="searchRef"
                    v-model="query"
                    icon="search"
                    clearable
                    size="small"
                    placeholder="搜索组件（Ctrl/⌘ K）"
                    @keydown.esc.stop="handleEscape"
                />

                <template v-if="isSearching">
                    <nue-text size="xs" color="var(--nue-secondary-text-color)">
                        {{ matches.length }} 个匹配
                    </nue-text>
                    <nue-div
                        v-if="matches.length"
                        vertical
                        align="stretch"
                        gap=".25rem"
                        @click="closeAside"
                    >
                        <nue-link
                            v-for="item in matches"
                            :key="item.route"
                            :route="item.route"
                            theme="route,route-small"
                            icon="more2"
                        >
                            {{ item.text }}
                        </nue-link>
                    </nue-div>
                    <nue-div v-else vertical align="center" gap=".5rem" class="pg-search-empty">
                        <nue-text size="sm">没有匹配的组件</nue-text>
                        <nue-text size="xs" color="var(--nue-secondary-text-color)">
                            试试 table、dialog 或 表格
                        </nue-text>
                        <nue-button theme="pure" size="small" @click="clearQuery"
                            >清除搜索</nue-button
                        >
                    </nue-div>
                </template>

                <nue-collapse v-else v-model="collapseValue" theme="menu">
                    <nue-collapse-item
                        v-for="group in componentLayoutAsideLinks"
                        :key="group.name"
                        :name="group.name"
                        :title="group.title"
                    >
                        <nue-div align="stretch" gap=".25rem" vertical @click="closeAside">
                            <nue-link
                                v-for="link in group.links"
                                :key="link.route"
                                :route="link.route"
                                theme="route,route-small"
                                icon="more2"
                            >
                                {{ link.text }}
                            </nue-link>
                        </nue-div>
                    </nue-collapse-item>
                </nue-collapse>
            </nue-div>
        </nue-aside>
        <!-- 0.2.2：aside 宽度由外壳固定（240px / 窄屏 0），分隔线不能再拖；
             禁用后既不会空拖，也不会把主题的 data-collapsed 写脏（会打断 aside 滚动） -->
        <nue-separator v-show="asideVisible" op-target="previous" disabled />
        <nue-content>
            <router-view />
        </nue-content>
    </nue-main>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
    NueMain,
    NueLink,
    NueCollapse,
    NueCollapseItem,
    NueDiv,
    NueAside,
    NueSeparator,
    NueContent,
    NueInput,
    NueText,
    NueButton
} from '@nue-ui/components';
import { componentLayoutAsideLinks, componentLinks } from '../../constants.ts';
import { useShell } from '../../composables/use-shell.ts';

const SEARCH_ID = 'pg-component-search';

const route = useRoute();
const { asideVisible, asideWidth, closeAside, openAside } = useShell();

const collapseValue = ref(['basic', 'data', 'navigation', 'form', 'feedback', 'others']);

/**
 * 收起时把内边距也归零：主题的 aside 用 12px 内边距，border-box 下
 * 「width:0 + padding 24」仍会留下 24px 的可见宽度。
 * 内联样式才能盖过主题的 `.nue-container > .nue-main > .nue-aside` 选择器。
 */
const collapsedStyle = computed(() => (asideVisible.value ? undefined : { padding: '0' }));
const query = ref('');

/** 与「搜索结果」互斥：非空查询时展开扁平结果，清空后回到分类折叠。 */
const isSearching = computed(() => query.value.trim() !== '');

const normalize = (value: string) => value.toLowerCase().replace(/[\s-]+/g, '');

/**
 * 匹配规则（Issue #85 P0-1）：
 * - 中英文都命中：链接文案本身含两种写法（`Table 表格`），直接全串匹配；
 * - 忽略大小写、空格与连字符，使 `date picker` / `datepicker` / `date-picker` 等价；
 * - route 也参与匹配，`picker`、`scroll` 这类半截词也能命中。
 */
const matches = computed(() => {
    const needle = normalize(query.value);
    if (!needle) return [];
    return componentLinks.filter(
        link => normalize(link.text).includes(needle) || normalize(link.route).includes(needle)
    );
});

/** 只取 NueInput 暴露的 innerInputRef：快捷键聚焦与 Esc 失焦都走它，不手写 DOM 查询。 */
const searchRef = ref<{ innerInputRef?: HTMLInputElement } | null>(null);

async function focusSearch() {
    // 窄屏收起时先展开，否则 input 处于 display:none，focus 无效；
    // 展开后必须等下一次渲染，aside 才真正可见。
    if (!asideVisible.value) {
        openAside();
        await nextTick();
    }
    searchRef.value?.innerInputRef?.focus();
}

function clearQuery() {
    query.value = '';
    searchRef.value?.innerInputRef?.focus();
}

function handleEscape() {
    query.value = '';
    searchRef.value?.innerInputRef?.blur();
}

function isSearchShortcut(event: KeyboardEvent) {
    return (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
}

function handleGlobalKeydown(event: KeyboardEvent) {
    if (!isSearchShortcut(event)) return;
    event.preventDefault();
    void focusSearch();
}

onMounted(() => {
    document.addEventListener('keydown', handleGlobalKeydown);
});

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleGlobalKeydown);
});

/** 窄屏点完链接就收起侧栏（宽屏 closeAside 是 no-op）。 */
watch(
    () => route.path,
    () => {
        query.value = '';
        closeAside();
    }
);
</script>

<style scoped>
.pg-aside {
    flex: none;
    /* 主题的 aside 是 content-box：240px + 两侧 padding 会变成 264px */
    box-sizing: border-box;
}

/* 收起时不外溢。刻意用外壳自己的类而不是主题的 data-collapsed 属性：
   `nue-separator` 拖拽也会写这个属性，会把 aside 的 overflow 打回 hidden。 */
.pg-aside--collapsed {
    overflow: hidden;
}

.pg-nav {
    padding-right: 2px;
}

.pg-search-empty {
    padding: var(--nue-padding-sm) 0;
    text-align: center;
}

/* 仅供屏幕阅读器的关联 label */
.pg-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
}
</style>
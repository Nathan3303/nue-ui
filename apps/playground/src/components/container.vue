<template>
    <demo>
        <template #title>Container 布局容器</template>
        <template #default>
            <nue-div class="wrapper">
                <nue-container class="container-demo" type="flex">
                    <nue-header>
                        <template #logo>LOGO</template>
                        <template #navigators>
                            <nue-link theme="rl">首页</nue-link>
                            <nue-link theme="rl,actived">资源</nue-link>
                            <nue-link theme="rl">关于我们</nue-link>
                        </template>
                        <template #actions>
                            <nue-dropdown>
                                <template #default="{ clickTrigger, visible }">
                                    <nue-button
                                        :theme="
                                            visible
                                                ? 'primary,icon'
                                                : 'ghost,icon'
                                        "
                                        icon="search"
                                        @click="clickTrigger"
                                    />
                                </template>
                                <template #dropdown>
                                    <nue-input
                                        v-model="inputValue"
                                        placeholder="想要搜索什么？"
                                    />
                                </template>
                            </nue-dropdown>
                        </template>
                        <template #user>
                            <nue-avatar icon="theme" />
                        </template>
                    </nue-header>
                    <nue-main>
                        <template #aside>
                            <nue-div
                                align="stretch"
                                gap="8px"
                                vertical
                                wrap="nowrap"
                            >
                                <nue-link icon="board" theme="rl,rl-s,actived">
                                    仪表盘
                                </nue-link>
                                <nue-link icon="projects" theme="rl,rl-s">
                                    清单
                                </nue-link>
                            </nue-div>
                            <nue-divider />
                            <nue-collapse v-model="activeNames" theme="menu">
                                <nue-collapse-item name="a" title="子路由选项">
                                    <nue-div align="stretch" gap="8px" vertical>
                                        <nue-link icon="more2" theme="rl,rl-s">
                                            菜单项 1
                                        </nue-link>
                                        <nue-link icon="more2" theme="rl,rl-s">
                                            菜单项 2
                                        </nue-link>
                                        <nue-link icon="more2" theme="rl,rl-s">
                                            菜单项 3
                                        </nue-link>
                                    </nue-div>
                                </nue-collapse-item>
                                <nue-collapse-item name="b" title="高级选项">
                                    <nue-link icon="setting" theme="rl,rl-s">
                                        设置
                                    </nue-link>
                                </nue-collapse-item>
                            </nue-collapse>
                        </template>
                        <template #content>
                            <nue-container theme="vertical,inner">
                                <nue-header>仪表盘</nue-header>
                                <nue-main>
                                    <nue-div align="stretch" gap="8px" vertical>
                                        <nue-text tag="h3">进度</nue-text>
                                        <nue-text tag="p"
                                            >下方展示了一些进度条。
                                        </nue-text>
                                        <nue-progress :percentage="50" />
                                        <nue-progress :percentage="22" />
                                        <nue-progress :percentage="76" />
                                    </nue-div>
                                </nue-main>
                            </nue-container>
                        </template>
                        <template #outline>右侧栏</template>
                    </nue-main>
                    <!-- footer -->
                    <nue-footer>
                        <nue-text color="gray" size="var(--nue-text-sm)">
                            Copyright &copy; 2024, NueUI, A Vue 3 UI Library
                        </nue-text>
                    </nue-footer>
                </nue-container>
            </nue-div>
        </template>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
    NueContainer,
    NueHeader,
    NueMain,
    NueFooter,
    NueDiv,
    NueLink,
    NueCollapse,
    NueCollapseItem,
    NueText,
    NueProgress,
    NueAvatar,
    NueInput,
    NueButton,
    NueDivider,
    NueDropdown
} from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const inputValue = ref('');
const activeNames = ref(['a', 'b']);
</script>

<style scoped>
.container-demo {
    height: 600px;
}

.nue-collapse--menu {
    &:deep(.nue-collapse-item__header) {
        padding: 0 0.5rem;
    }
}
</style>

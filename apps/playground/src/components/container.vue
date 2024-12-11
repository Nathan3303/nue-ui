<template>
    <demo>
        <template #title>Container 布局容器</template>
        <template #default>
            <nue-div class="wrapper">
                <nue-container class="container-demo" type="flex">
                    <!-- header -->
                    <nue-header>
                        <template #logo>LOGO</template>
                        <template #navigators>
                            <nue-link theme="rl,rl-s,actived">Home</nue-link>
                            <nue-link theme="rl,rl-s">About</nue-link>
                        </template>
                        <template #actions>
                            <nue-input
                                v-model="inputValue"
                                icon="search"
                                placeholder="Search"
                                theme="small"
                            />
                        </template>
                        <template #user>
                            <nue-avatar icon="theme" rounded size="28px" />
                        </template>
                    </nue-header>
                    <!-- main -->
                    <nue-main
                        allow-collapse-aside
                        allow-resize-aside
                        aside-min-width="128px"
                        aside-width="200px"
                        outline-width="200px"
                    >
                        <template #aside>
                            <nue-div
                                align="stretch"
                                gap="8px"
                                vertical
                                wrap="nowrap"
                            >
                                <nue-link icon="board" theme="rl,rl-s,actived">
                                    Dashboard
                                </nue-link>
                                <nue-link icon="projects" theme="rl,rl-s">
                                    Projects
                                </nue-link>
                            </nue-div>
                            <nue-divider />
                            <nue-collapse v-model="activeNames" theme="menu">
                                <nue-collapse-item name="a" title="Menu">
                                    <nue-link icon="more2" theme="rl,rl-s">
                                        Menu item 1
                                    </nue-link>
                                    <nue-link icon="more2" theme="rl,rl-s">
                                        Menu item 2
                                    </nue-link>
                                    <nue-link icon="more2" theme="rl,rl-s">
                                        Menu item 3
                                    </nue-link>
                                </nue-collapse-item>
                                <nue-collapse-item name="b" title="Advance">
                                    <nue-link icon="setting" theme="rl,rl-s">
                                        Settings
                                    </nue-link>
                                </nue-collapse-item>
                            </nue-collapse>
                        </template>
                        <template #content>
                            <nue-container theme="vertical,inner">
                                <nue-header>Dashboard</nue-header>
                                <nue-main>
                                    <nue-div align="stretch" gap="8px" vertical>
                                        <nue-text tag="h3">Progress</nue-text>
                                        <nue-progress :percentage="50" />
                                        <nue-progress :percentage="22" />
                                        <nue-progress :percentage="76" />
                                    </nue-div>
                                </nue-main>
                            </nue-container>
                        </template>
                        <!--                        <template #outline>右侧栏</template>-->
                    </nue-main>
                    <!-- footer -->
                    <nue-footer>
                        <nue-text color="gray" size="var(--nue-ui-text-sm)">
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
        padding: 0 8px;
    }
}
</style>

<template>
    <nue-div class="wrapper">
        <nue-container class="vp-raw">
            <nue-main aside-width="200px">
                <template #aside>
                    <nue-collapse v-model="activeNames" theme="menu">
                        <nue-collapse-item name="Collapse item A" title="菜单">
                            <nue-div align="stretch" gap="8px" vertical>
                                <nue-link icon="board" theme="rl,rl-s,actived">
                                    仪表盘
                                </nue-link>
                                <nue-link icon="projects" theme="rl,rl-s">
                                    清单
                                </nue-link>
                            </nue-div>
                        </nue-collapse-item>
                        <nue-collapse-item name="Collapse item B" title="高级">
                            <nue-link icon="setting" theme="rl,rl-s">
                                设置
                            </nue-link>
                        </nue-collapse-item>
                    </nue-collapse>
                </template>
                <template #content>内容</template>
            </nue-main>
        </nue-container>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeNames = ref(['Collapse item A', 'Collapse item B']);
</script>

<style scoped>
.wrapper {
    border: 1px solid var(--nue-ui-divider-color);
    border-radius: var(--nue-ui-primary-radius);
    height: 360px;
    overflow: hidden;
}
</style>

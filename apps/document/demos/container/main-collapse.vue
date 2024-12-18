<template>
    <nue-div class="wrapper">
        <nue-container>
            <nue-main
                aside-max-width="250px"
                aside-min-width="100px"
                aside-width="200px"
            >
                <template #aside>
                    <nue-div align="stretch" gap="8px" vertical>
                        <nue-link icon="chat" theme="rl,rl-s">聊天</nue-link>
                        <nue-link icon="setting" theme="rl,rl-s">设置</nue-link>
                    </nue-div>
                    <nue-divider />
                    <nue-collapse v-model="activeNames" theme="menu">
                        <nue-collapse-item name="menu" title="菜单">
                            <nue-div align="stretch" gap="8px" vertical>
                                <nue-link icon="more2" theme="rl,rl-s">
                                    菜单项 A
                                </nue-link>
                                <nue-link icon="more2" theme="rl,rl-s">
                                    菜单项 B
                                </nue-link>
                                <nue-link icon="more2" theme="rl,rl-s">
                                    菜单项 C
                                </nue-link>
                            </nue-div>
                        </nue-collapse-item>
                    </nue-collapse>
                </template>
                <template #content>内容区域</template>
            </nue-main>
        </nue-container>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeNames = ref(['menu']);
</script>

<style scoped>
.wrapper {
    border: 1px solid var(--nue-ui-divider-color);
    border-radius: var(--nue-ui-primary-radius);
    height: 360px;
    overflow: hidden;
}
</style>

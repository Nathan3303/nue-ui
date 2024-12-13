<template>
    <nue-div class="wrapper vp-raw">
        <nue-container>
            <nue-main
                aside-max-width="250px"
                aside-min-width="100px"
                aside-width="200px"
            >
                <template #aside>
                    <nue-link icon="chat" theme="rl,rl-s">聊天</nue-link>
                    <nue-link icon="setting" theme="rl,rl-s">设置</nue-link>
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
                    </nue-collapse>
                </template>
                <template #content>内容区域</template>
            </nue-main>
        </nue-container>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeNames = ref(['a']);
</script>

<style scoped>
.wrapper {
    border: 1px solid var(--nue-ui-divider-color);
    border-radius: var(--nue-ui-primary-radius);
    height: 360px;
    overflow: hidden;
}
</style>

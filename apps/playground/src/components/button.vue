<template>
    <demo title="Button 按钮">
        <nue-div vertical>
            <nue-div align="center">
                <nue-button>Button 按钮</nue-button>
                <nue-button icon="theme">图标按钮</nue-button>
                <nue-button disabled>禁用状态</nue-button>
            </nue-div>
            <nue-div align="center">
                <nue-button :loading="isSearching" @click="handleSearch">
                    加载状态
                </nue-button>
                <nue-button
                    :loading="isSearching"
                    loading-icon="scan"
                    @click="handleSearch"
                >
                    指定加载图标
                </nue-button>
            </nue-div>
            <nue-div align="center">
                <nue-button
                    :throttle-duration="2000"
                    use-throttle
                    @click="count++"
                >
                    节流按钮 - 点击次数 {{ count }}
                </nue-button>
            </nue-div>
            <nue-div align="center">
                <nue-button size="large">大型按钮</nue-button>
                <nue-button>按钮</nue-button>
                <nue-button size="small">小型按钮</nue-button>
            </nue-div>
            <nue-div align="center">
                <nue-button theme="round">圆角主题</nue-button>
                <nue-button :theme="{ round: true, primary: true }">
                    主要+圆角主题
                </nue-button>
                <nue-button
                    icon="search"
                    theme="icon-only"
                    title="仅图标主题"
                />
                <nue-button theme="pure">纯净主题</nue-button>
            </nue-div>
            <nue-button>
                使用后置插槽
                <template #append>
                    <nue-icon name="arrow-right-more" />
                </template>
            </nue-button>
        </nue-div>
    </demo>
    <demo title="ButtonGroup 按钮组">
        <nue-div>
            <nue-div>
                <nue-button-group>
                    <nue-button icon="plus">添加</nue-button>
                    <nue-button disabled icon="search">搜索</nue-button>
                    <nue-button icon="more">更多</nue-button>
                </nue-button-group>
            </nue-div>
            <nue-div>
                <nue-button-group disabled>
                    <nue-button icon="plus">添加</nue-button>
                    <nue-button disabled icon="search">搜索</nue-button>
                    <nue-button icon="more">更多</nue-button>
                </nue-button-group>
            </nue-div>
            <nue-div>
                <nue-button-group size="small">
                    <nue-button icon="plus">添加</nue-button>
                    <nue-button disabled icon="search">搜索</nue-button>
                    <nue-button icon="more">更多</nue-button>
                </nue-button-group>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NueButton from '@nue-ui/components/button/button.vue';
import NueButtonGroup from '@nue-ui/components/button-group/button-group.vue';
import Demo from '../layouts/demo.vue';

const isSearching = ref(false);
const count = ref(0);

function handleSearch() {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 2400);
}
</script>

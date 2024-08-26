<template>
    <nue-div align="center">
        <nue-button>Button</nue-button>
        <nue-button icon="search">带图标的按钮</nue-button>
        <nue-button disabled>禁用状态</nue-button>
        <nue-button
            :loading="isSearching"
            loading-icon="scan"
            @click="handleSearch">
            加载状态以及自定加载图标
        </nue-button>
        <nue-button use-throttle :throttle-duration="360" @click="count++">
            节流 ({{ count }})
        </nue-button>
    </nue-div>
    <nue-div align="center">
        <nue-button size="small">小按钮</nue-button>
        <nue-button>正常按钮</nue-button>
        <nue-button size="large">大按钮</nue-button>
    </nue-div>
    <nue-div align="center">
        <nue-button theme="round">圆角主题</nue-button>
        <nue-button theme="round,primary">圆角主题+主要色主题</nue-button>
        <nue-button theme="icon-only" icon="search" title="仅图标主题" />
        <nue-button theme="pure">纯文本主题</nue-button>
    </nue-div>
    <nue-div align="center">
        <nue-button>
            <template #prepend>
                <nue-icon name="scan"></nue-icon>
            </template>
            带有 prepend 插槽、带有 append 插槽。当 NueButton
            组件文本过长时，会自动隐藏过长的文字并出现省略号。
            <template #append>
                <nue-icon name="scan"></nue-icon>
            </template>
        </nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSearching = ref(false);
const count = ref(0);

function handleSearch() {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 2400);
}
</script>

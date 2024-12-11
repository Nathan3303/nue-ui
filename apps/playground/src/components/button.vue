<template>
    <nue-container class="button-view" theme="vertical">
        <nue-header>
            <template #logo>
                <nue-text size="var(--nue-ui-text-default)">
                    Button 按钮
                </nue-text>
            </template>
        </nue-header>
        <nue-main>
            <nue-div style="padding: 16px">
                <nue-text tag="h3">Basic</nue-text>
                <nue-div align="center">
                    <nue-button>Basic</nue-button>
                    <nue-button icon="search">icon=search</nue-button>
                    <nue-button disabled>disabled</nue-button>
                    <nue-button
                        :loading="isSearching"
                        loading-icon="scan"
                        @click="handleSearch"
                    >
                        loading & loading-icon
                    </nue-button>
                    <nue-button
                        :throttle-duration="360"
                        use-throttle
                        @click="count++"
                    >
                        use-throttle & throttle-duration & {{ count }}
                    </nue-button>
                </nue-div>
                <nue-div align="center">
                    <nue-button size="small">size=small</nue-button>
                    <nue-button>normal</nue-button>
                    <nue-button size="large">size=large</nue-button>
                </nue-div>
                <nue-div align="center">
                    <nue-button theme="round">theme=round</nue-button>
                    <nue-button :theme="{ round: true, primary: true }">
                        theme=round,primary
                    </nue-button>
                    <nue-button
                        icon="search"
                        theme="icon-only"
                        title="仅图标主题"
                    />
                    <nue-button theme="pure">theme=pure</nue-button>
                </nue-div>
                <nue-button>
                    use-append-slot
                    <template #append>
                        <nue-icon name="scan" />
                    </template>
                </nue-button>
            </nue-div>
        </nue-main>
    </nue-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isSearching = ref(false);
const count = ref(0);

function handleSearch() {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 2400);
}
</script>

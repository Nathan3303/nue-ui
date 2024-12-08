<template>
    <nue-container class="container-view" theme="vertical">
        <nue-header>
            <template #logo>Container 布局容器</template>
        </nue-header>
        <nue-main>
            <nue-div align="center" style="padding: 16px">
                <nue-container theme="horizontal">
                    <nue-header>
                        <template #logo>
                            <nue-icon name="logo" />
                        </template>
                        <template #navigators>
                            <nue-link icon="board" theme="btnlike,actived" />
                            <nue-link icon="projects" theme="btnlike" />
                            <nue-link icon="drive" theme="btnlike" />
                        </template>
                        <template #actions>
                            <nue-link icon="setting" theme="btnlike" />
                        </template>
                        <template #user>
                            <nue-avatar icon="theme" rounded />
                        </template>
                    </nue-header>
                    <nue-main>
                        <template #aside>Aside</template>
                        <template #content>
                            <nue-text>
                                {{ generateRandomString(64) }}
                            </nue-text>
                        </template>
                        <template #outline>Outline</template>
                    </nue-main>
                    <nue-footer>Footer</nue-footer>
                </nue-container>
            </nue-div>
        </nue-main>
    </nue-container>
</template>

<script lang="ts" setup>
function generateRandomString(length: number): string {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}
</script>

<style scoped>
.nue-container--horizontal {
    height: 512px;
}
</style>

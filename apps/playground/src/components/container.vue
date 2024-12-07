<template>
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
.nue-container {
    height: 512px;
    border: 1px solid var(--divider-color);
    border-radius: var(--primary-radius);
    background-color: #fefefe;
}

.outline-list {
    list-style: none;
    padding: 0;
    margin: 0;

    & > li {
        padding: 4px 0;
        font-size: 12px;
        color: gray;

        &:hover {
            text-decoration: underline;
            color: black;
            cursor: pointer;
        }
    }
}
</style>

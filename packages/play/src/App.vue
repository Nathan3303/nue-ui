<template>
    <nue-container>
        <nue-header height="72px">
            <template #logo>NueUI PlayGround</template>
        </nue-header>
        <nue-main aside-width="160px">
            <template #aside>
                <!-- <nue-text>Category</nue-text> -->
                <nue-link theme="btnlike" route="/basic">Basic</nue-link>
                <nue-link theme="btnlike" route="/form">Form</nue-link>
                <nue-link theme="btnlike" route="/data">Data</nue-link>
                <nue-link theme="btnlike" route="/navigation">
                    Navigation
                </nue-link>
                <nue-link theme="btnlike" route="/feedback">
                    Feedback
                </nue-link>
                <nue-link theme="btnlike" route="/others">Others</nue-link>
            </template>
            <template #content>
                <router-view></router-view>
            </template>
        </nue-main>
    </nue-container>
</template>

<style scoped>
.nue-main {
    --aside-gap: 8px;

    .view-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
        gap: 16px;

        &:deep(.nue-div--card) {
            height: 100%;
        }
    }
}
</style>

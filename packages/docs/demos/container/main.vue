<template>
    <nue-div>
        <nue-container height="256px">
            <nue-main aside-width="30%">
                <template #aside>Aside</template>
                <template #content>Content</template>
            </nue-main>
        </nue-container>
        <nue-container height="256px">
            <nue-main
                aside-width="30%"
                aside-min-width="128px"
                aside-max-width="512px"
                allow-resize-aside>
                <template #aside>Aside (Allow resize)</template>
                <template #content>Content</template>
            </nue-main>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.nue-container {
    border: 1px solid var(--divider-color);
    border-radius: var(--primary-radius);
}
</style>

<template>
    <nue-container height="512px">
        <nue-header>NueHeader</nue-header>
        <nue-main aside-width="30%">
            <template #aside>NueMain / Aside</template>
            <template #content>NueMain / Content</template>
        </nue-main>
        <nue-footer>NueFooter</nue-footer>
    </nue-container>
</template>

<style scoped>
.nue-container {
    border: 1px solid var(--divider-color);
    border-radius: var(--primary-radius);
}
</style>

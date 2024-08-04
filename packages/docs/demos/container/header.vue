<template>
    <nue-container>
        <nue-header height="72px">
            <template #logo>Logo</template>
            <template #nav>
                <nue-link>Link1</nue-link>
                <nue-link>Link2</nue-link>
                <nue-link>Link3</nue-link>
            </template>
            <template #ops>
                <nue-button theme="icon-only" icon="search" />
            </template>
            <template #user>
                <nue-avatar
                    src="https://picsum.photos/id/237/200/200"
                    shape="round" />
            </template>
            <template #default>
                <nue-text>Default slot</nue-text>
            </template>
        </nue-header>
    </nue-container>
</template>

<style scoped>
.nue-container {
    border: 1px solid var(--divider-color);
    border-radius: var(--primary-radius);
}
</style>

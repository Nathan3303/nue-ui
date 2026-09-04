<template>
    <nue-scroll-bar vertical theme="demo">
        <nue-div vertical>
            <nue-div theme="block" v-for="i in 10" :key="i" style="height: 5rem">
                {{ i }}
            </nue-div>
        </nue-div>
    </nue-scroll-bar>
</template>

<style scoped>
.nue-scroll-bar--demo {
    height: 200px;
    border: 1px solid var(--nue-border-color);
    border-radius: var(--nue-primary-radius);
}

.nue-div--block {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--nue-primary-color-100);
    border-radius: var(--nue-primary-radius);
}
</style>
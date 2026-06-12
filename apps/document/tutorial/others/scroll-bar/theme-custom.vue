<template>
    <nue-scroll-bar vertical horizontal theme="demo,custom">
        <nue-div vertical>
            <nue-div theme="block2" v-for="i in 10" :key="i">
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

.nue-div--block2 {
    width: 120%;
    height: 5rem;
    align-items: center;
    justify-content: center;
    background-color: var(--nue-primary-color-100);
    border-radius: var(--nue-primary-radius);
}

.nue-scroll-bar--custom {
    --nue-scroll-bar-size: 12px;

    &:deep(.nue-scroll-bar__track) {
        border-radius: 0;
        padding: 4px;
        box-sizing: border-box;

        &.nue-scroll-bar__track--vertical {
            background-color: var(--nue-warning-color-50);
        }

        &.nue-scroll-bar__track--horizontal {
            background-color: var(--nue-error-color-50);
        }

        .nue-scroll-bar__thumb {
            background-color: white;
            border-radius: 0;
        }
    }
}
</style>

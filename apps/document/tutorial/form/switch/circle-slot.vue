<template>
    <nue-div align="center" gap="var(--nue-gap-md)">
        <nue-switch :model-value="true">
            <template #circle>
                <nue-icon name="check" />
            </template>
        </nue-switch>
        <nue-switch :model-value="false">
            <template #circle>
                <nue-icon name="close" />
            </template>
        </nue-switch>
    </nue-div>
</template>

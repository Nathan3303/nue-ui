<template>
    <nue-div gap="var(--nue-gap-md)">
        <nue-input placeholder="前缀示例">
            <template #prefix>
                <nue-icon name="search" />
            </template>
        </nue-input>
        <nue-input placeholder="后缀示例">
            <template #suffix>
                <nue-button theme="ghost,small" icon="search" />
            </template>
        </nue-input>
    </nue-div>
</template>

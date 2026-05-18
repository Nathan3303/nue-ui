<template>
    <nue-div gap="var(--nue-gap-md)">
        <nue-textarea placeholder="前缀示例">
            <template #prefix>
                <nue-icon name="edit" />
            </template>
        </nue-textarea>
        <nue-textarea placeholder="后缀示例">
            <template #suffix>
                <nue-text size=".75rem" color="var(--nue-disabled-color)">已保存</nue-text>
            </template>
        </nue-textarea>
    </nue-div>
</template>

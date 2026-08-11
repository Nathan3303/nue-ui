<template>
    <nue-div align="center" gap="var(--nue-gap-md)">
        <nue-link icon="link">
            <template #prepend>
                <nue-icon name="search" />
            </template>
            搜索链接
        </nue-link>
        <nue-link icon="link">
            下载链接
            <template #append>
                <nue-icon name="arrow-down" />
            </template>
        </nue-link>
    </nue-div>
</template>
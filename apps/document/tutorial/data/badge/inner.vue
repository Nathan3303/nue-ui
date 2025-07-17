<template>
    <nue-button>
        内联徽标
        <template #append>
            <nue-div align="center" gap=".25rem" style="padding-left: 1rem">
                <nue-badge dot />
                <nue-badge :max="99" :value="100" />
            </nue-div>
        </template>
    </nue-button>
</template>

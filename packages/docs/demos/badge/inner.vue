<template>
    <nue-div>
        <nue-button icon="ring">
            消息
            <template #append>
                <nue-badge :value="100" :max="99" />
            </template>
        </nue-button>
        <nue-button icon="ring">
            消息
            <template #append>
                <nue-badge dot />
            </template>
        </nue-button>
    </nue-div>
</template>

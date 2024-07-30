<template>
    <nue-div>
        <nue-button icon="mail">
            Mail
            <template #append>
                <nue-badge :value="100" :max="99" />
            </template>
        </nue-button>
        <nue-button icon="mail">
            Mail
            <template #append>
                <nue-badge value="123"></nue-badge>
            </template>
        </nue-button>
        <nue-button icon="mail">
            Mail
            <template #append>
                <nue-badge dot />
            </template>
        </nue-button>
        <nue-link :theme="['actived', 'btnlike']" icon="ring">
            <nue-div align="center">
                Message
                <nue-badge dot />
            </nue-div>
        </nue-link>
    </nue-div>
</template>

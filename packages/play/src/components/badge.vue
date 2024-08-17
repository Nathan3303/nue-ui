<template>
    <nue-div gap="36px">
        <nue-badge value="New">
            <nue-button>Button</nue-button>
        </nue-badge>
        <nue-badge :value="100" :max="99">
            <nue-button icon="mail">Mail</nue-button>
        </nue-badge>
        <nue-badge dot>
            <nue-button icon="mail">Mail</nue-button>
        </nue-badge>
    </nue-div>
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

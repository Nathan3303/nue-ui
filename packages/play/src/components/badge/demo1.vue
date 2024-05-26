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
</template>

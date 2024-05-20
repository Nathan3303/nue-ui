<template>
    <nue-div vertical>
        <nue-div align="center" wrap>
            <nue-avatar src="https://picsum.photos/150" />
            <nue-avatar src="https://picsum.photos/150" shape="round" />
            <nue-avatar
                src="https://picsum.photos/150"
                shape="round"
                size="large" />
            <nue-avatar icon="icon-dingwei" />
            <nue-avatar shape="round">N</nue-avatar>
        </nue-div>
        <nue-div gap="36px" wrap>
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
    </nue-div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

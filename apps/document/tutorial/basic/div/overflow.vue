<template>
    <nue-div vertical>
        <nue-div overflow="auto">
            <nue-button v-for="i in 12" :key="i">按钮</nue-button>
        </nue-div>
        <nue-divider />
        <nue-div overflow="hidden">
            <nue-button v-for="i in 12" :key="i">按钮</nue-button>
        </nue-div>
        <nue-divider />
        <nue-div overflow="visible">
            <nue-button v-for="i in 12" :key="i">按钮</nue-button>
        </nue-div>
    </nue-div>
</template>

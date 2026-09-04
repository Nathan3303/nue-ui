<template>
    <nue-div vertical>
        <nue-div wrap="wrap">
            <nue-button v-for="i in 12" :key="i">按钮</nue-button>
        </nue-div>
        <nue-divider />
        <nue-div wrap="wrap-reverse">
            <nue-button v-for="i in 12" :key="i">按钮</nue-button>
        </nue-div>
    </nue-div>
</template>
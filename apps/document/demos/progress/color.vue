<template>
    <nue-div align="center" :divider="{}">
        <nue-progress :percentage="32" color="red"></nue-progress>
        <nue-progress :percentage="48" type="circle" color="red"></nue-progress>
    </nue-div>
    <br />
    <nue-div align="center" :divider="{}">
        <nue-progress
            :percentage="96"
            :color="['#666', '#aaa', '#ccc']"
        ></nue-progress>
        <nue-progress
            :percentage="72"
            type="circle"
            :color="['#666', '#aaa', '#ccc']"
        ></nue-progress>
    </nue-div>
</template>

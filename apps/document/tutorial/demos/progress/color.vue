<template>
    <nue-div :divider="{}" align="center">
        <nue-progress :percentage="32" color="red" />
        <nue-progress :percentage="48" color="red" type="circle" />
    </nue-div>
    <br />
    <nue-div :divider="{}" align="center">
        <nue-progress :color="['#666', '#aaa', '#ccc']" :percentage="96" />
        <nue-progress
            :color="['#666', '#aaa', '#ccc']"
            :percentage="72"
            type="circle"
        />
    </nue-div>
</template>

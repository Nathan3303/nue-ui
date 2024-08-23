<template>
    <nue-div align="center" justify="center">
        <nue-tooltip content="NiHao" placement="top-start">
            <nue-button>Button</nue-button>
        </nue-tooltip>
        <nue-tooltip content="NiHao" placement="top-center">
            <nue-button>Button</nue-button>
        </nue-tooltip>
        <nue-tooltip content="NiHao" placement="top-end">
            <nue-button>Button</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="space-between">
        <nue-tooltip content="NiHao" placement="left-start">
            <nue-button>Button</nue-button>
        </nue-tooltip>
        <nue-tooltip content="NiHao" placement="right-start">
            <nue-button>Button</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="space-between">
        <nue-tooltip content="NiHao" placement="left-center">
            <nue-button>Button</nue-button>
        </nue-tooltip>
        <nue-tooltip content="NiHao" placement="right-center">
            <nue-button>Button</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="space-between">
        <nue-tooltip content="NiHao" placement="left-end">
            <nue-button>Button</nue-button>
        </nue-tooltip>
        <nue-tooltip content="NiHao" placement="right-end">
            <nue-button>Button</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="center">
        <nue-tooltip content="NiHao" placement="bottom-start">
            <nue-button>Button</nue-button>
        </nue-tooltip>
        <nue-tooltip content="NiHao" placement="bottom-center">
            <nue-button>Button</nue-button>
        </nue-tooltip>
        <nue-tooltip content="NiHao" placement="bottom-end">
            <nue-button>Button</nue-button>
        </nue-tooltip>
    </nue-div>
    <!--  -->
    <nue-div>
        <nue-tooltip
            content="https://www.baidu.com"
            size="small"
            theme="custom">
            <nue-link href="https://www.baidu.com">Go to baidu</nue-link>
        </nue-tooltip>
        <nue-tooltip
            content="Lorem ipsum, dolor sit amet consectetu"
            size="large"
            theme="custom2">
            <nue-text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
                deleniti et dolor accusantium. Rerum velit dolores voluptatibus
                ullam id, modi, optio numquam accusamus animi temporibus soluta
                fugiat. Aspernatur, officiis natus.
            </nue-text>
        </nue-tooltip>
    </nue-div>
</template>

<script setup lang="ts"></script>

<style>
.nue-tooltip--custom {
    background: linear-gradient(to right, #ff416c, #ff4b2b);
}

.nue-tooltip--custom2 {
    background: linear-gradient(to left, #ff2d55, #ff743c);
}
</style>

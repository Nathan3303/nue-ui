<template>
    <nue-div align="center" justify="center">
        <nue-tooltip content="Hello, world!" placement="top-start">
            <nue-button>上-左</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="top-center">
            <nue-button>上-中</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="top-end">
            <nue-button>上-右</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="space-between">
        <nue-tooltip content="Hello, world!" placement="left-start">
            <nue-button>左-上</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="right-start">
            <nue-button>右-上</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="space-between">
        <nue-tooltip content="Hello, world!" placement="left-center">
            <nue-button>左-中</nue-button>
        </nue-tooltip>
        <nue-tooltip content="small" size="small" theme="custom">
            <nue-button>小型文字提示</nue-button>
        </nue-tooltip>
        <nue-tooltip content="large" size="large" theme="custom2">
            <nue-button>大型文字提示</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="right-center">
            <nue-button>右-中</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="space-between">
        <nue-tooltip content="Hello, world!" placement="left-end">
            <nue-button>左-下</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="right-end">
            <nue-button>右-下</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="center">
        <nue-tooltip content="Hello, world!" placement="bottom-start">
            <nue-button>下-左</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="bottom-center">
            <nue-button>下-中</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="bottom-end">
            <nue-button>下-右</nue-button>
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

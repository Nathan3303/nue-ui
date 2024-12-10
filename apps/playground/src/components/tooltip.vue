<template>
    <nue-div align="center" justify="center">
        <nue-tooltip content="Hello, world!" placement="top-start">
            <nue-button theme="small">上-左</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="top-center">
            <nue-button theme="small">上-中</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="top-end">
            <nue-button theme="small">上-右</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="space-between">
        <nue-tooltip content="Hello, world!" placement="left-start">
            <nue-button theme="small">左-上</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="right-start">
            <nue-button theme="small">右-上</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="space-between">
        <nue-tooltip content="Hello, world!" placement="left-center">
            <nue-button theme="small">左-中</nue-button>
        </nue-tooltip>
        <nue-tooltip content="small" size="small" theme="custom">
            <nue-button theme="small">小型文字提示</nue-button>
        </nue-tooltip>
        <nue-tooltip content="large" size="large" theme="custom2">
            <nue-button theme="small">大型文字提示</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="right-center">
            <nue-button theme="small">右-中</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="space-between">
        <nue-tooltip content="Hello, world!" placement="left-end">
            <nue-button theme="small">左-下</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="right-end">
            <nue-button theme="small">右-下</nue-button>
        </nue-tooltip>
    </nue-div>
    <nue-div align="center" justify="center">
        <nue-tooltip content="Hello, world!" placement="bottom-start">
            <nue-button theme="small">下-左</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="bottom-center">
            <nue-button theme="small">下-中</nue-button>
        </nue-tooltip>
        <nue-tooltip content="Hello, world!" placement="bottom-end">
            <nue-button theme="small">下-右</nue-button>
        </nue-tooltip>
    </nue-div>
</template>

<script lang="ts" setup></script>

<style>
.nue-tooltip--custom {
    background: linear-gradient(to right, #ff416c, #ff4b2b);
}

.nue-tooltip--custom2 {
    background: linear-gradient(to left, #ff2d55, #ff743c);
}
</style>

<template>
    <nue-div align="center">
        <nue-button-group>
            <nue-button icon="search">搜索</nue-button>
            <nue-button icon="plus" disabled>添加</nue-button>
            <nue-button icon="more">更多</nue-button>
        </nue-button-group>
        <nue-button-group size="small" disabled>
            <nue-button icon="search">搜索</nue-button>
            <nue-button icon="plus" :disabled="false">添加</nue-button>
            <nue-button icon="more">更多</nue-button>
        </nue-button-group>
    </nue-div>
</template>

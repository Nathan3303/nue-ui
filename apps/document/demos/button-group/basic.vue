<template>
    <nue-div align="center">
        <nue-button-group>
            <nue-button icon="search">搜索</nue-button>
            <nue-button disabled icon="plus">添加</nue-button>
            <nue-button icon="more">更多</nue-button>
        </nue-button-group>
        <nue-button-group disabled size="small">
            <nue-button icon="search">搜索</nue-button>
            <nue-button :disabled="false" icon="plus">添加</nue-button>
            <nue-button icon="more">更多</nue-button>
        </nue-button-group>
    </nue-div>
</template>

<template>
    <nue-div align="center">
        <nue-link :theme="['btnlike', 'actived']" route="/a/b/c" icon="connection">
            已激活的路由链接
        </nue-link>
        <nue-link
            theme="btnlike"
            :route="{ name: 'routeName', params: { id: 123 } }" icon="connection">
            待激活的路由连接
        </nue-link>
    </nue-div>
</template>

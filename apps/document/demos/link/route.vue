<template>
    <nue-div align="center" class="vp-raw">
        <nue-link icon="connection" route="/a/b/c" theme="btnlike,actived">
            已激活的路由链接
        </nue-link>
        <nue-link
            :route="{ name: 'routeName', params: { id: 123 } }"
            icon="connection"
            theme="btnlike"
        >
            待激活的路由连接
        </nue-link>
    </nue-div>
</template>

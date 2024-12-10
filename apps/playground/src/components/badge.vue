<template>
    <nue-div>
        <nue-badge value="New">
            <nue-button>文字徽标</nue-button>
        </nue-badge>
        <nue-badge :max="99" :value="100">
            <nue-button>数字徽标且有最大值显示限制</nue-button>
        </nue-badge>
        <nue-badge dot>
            <nue-button>小红点</nue-button>
        </nue-badge>
        <nue-button>
            NueButton 组件内联徽标
            <template #append>
                <nue-badge :max="99" :value="100" />
            </template>
        </nue-button>
        <nue-link theme="btnlike,actived">
            <nue-div align="center">
                NueLink 组件内联徽标（小红点）
                <nue-badge dot />
            </nue-div>
        </nue-link>
    </nue-div>
</template>

<script lang="ts" setup></script>

<template>
    <demo title="默认主题">
        <nue-div align="center" gap="2rem">
            <nue-badge value="ABC">
                <nue-button>Button 按钮</nue-button>
            </nue-badge>
            <nue-badge dot>
                <nue-button theme="icon" icon="theme" />
            </nue-badge>
        </nue-div>
    </demo>
    <demo title="for-ico-btn 适配图标按钮的主题">
        <nue-div align="center" gap="2rem">
            <nue-badge dot theme="for-ico-btn">
                <nue-button theme="icon" icon="theme" />
            </nue-badge>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueBadge, NueButton } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

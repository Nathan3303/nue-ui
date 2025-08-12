<script setup lang="ts">
import { NueDiv, NueDropdown, NueText, NueIcon, NueDivider } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<template>
    <demo title="基础">
        <nue-div>
            <nue-dropdown trigger-text="基础下拉">
                <li class="nue-dropdown-item">下拉选项 ...</li>
            </nue-dropdown>
        </nue-div>
    </demo>
    <demo title="menu 菜单主题">
        <nue-div>
            <nue-dropdown trigger-text="基础下拉" theme="menu">
                <nue-div theme="block">
                    <nue-text theme="title">菜单块 1</nue-text>
                    <li class="nue-dropdown-item">
                        <nue-icon name="theme" size="14px" />Block 1 - Option 1
                    </li>
                    <li class="nue-dropdown-item">
                        <nue-icon name="theme" size="14px" />Block 1 - Option 2
                    </li>
                </nue-div>
                <nue-divider />
                <nue-div theme="block">
                    <nue-text theme="title">菜单块 2</nue-text>
                    <li class="nue-dropdown-item">
                        <nue-icon name="theme" size="14px" />Block 2 - Option 1
                    </li>
                    <li class="nue-dropdown-item">
                        <nue-icon name="theme" size="14px" />Block 2 - Option 2
                    </li>
                </nue-div>
            </nue-dropdown>
        </nue-div>
    </demo>
</template>

<style scoped></style>

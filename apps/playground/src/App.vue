<template>
    <nue-container class="app-view">
        <nue-header>
            <nue-text size="lg">NueUI 组件库 PlayGround</nue-text>
        </nue-header>
        <nue-main>
            <nue-aside>
                <nue-link route="/custom" theme="rl">自定义演练</nue-link>
                <nue-collapse
                    v-model="collapseValue"
                    class="app-view__aside-collapse-menu"
                    theme="menu"
                >
                    <nue-collapse-item
                        v-for="(item, idx) in collapseItemsData"
                        :key="idx"
                        :name="item.name"
                        :title="item.title"
                    >
                        <nue-div class="app-view__aside-collapse-menu__item-main">
                            <nue-link
                                v-for="(link, idx) in item.links"
                                :key="idx"
                                :route="link.route"
                                theme="rl"
                            >
                                {{ link.text }}
                            </nue-link>
                        </nue-div>
                    </nue-collapse-item>
                </nue-collapse>
            </nue-aside>
            <nue-separator op-target="previous" />
            <nue-content>
                <router-view />
            </nue-content>
            <nue-separator op-target="next" />
            <nue-aside width="14rem">
                <nue-text size="1rem">大纲</nue-text>
            </nue-aside>
        </nue-main>
        <nue-footer>
            <nue-text>✨ NueUI - 一个基于 VUE 3 和 TypeScript 的轻量级 UI 组件库 ✨</nue-text>
        </nue-footer>
    </nue-container>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import {
    NueContainer,
    NueHeader,
    NueMain,
    NueLink,
    NueCollapse,
    NueCollapseItem,
    NueText,
    NueDiv,
    NueAside,
    NueSeparator,
    NueContent,
    NueFooter
} from '@nue-ui/components';
import { collapseItemsData } from './constants.ts';
import './main.css';

const collapseValue = shallowRef(['basic', 'data', 'navigation', 'form', 'feedback', 'others']);
</script>

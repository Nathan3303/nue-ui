<template>
    <nue-container class="app-view">
        <nue-header>
            <template #logo>
                <nue-text size="var(--nue-ui-text-lg)">
                    NueUI 组件库 PlayGround
                </nue-text>
            </template>
        </nue-header>
        <nue-main outline-width="200px" responsive>
            <template #aside>
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
                        <nue-div
                            class="app-view__aside-collapse-menu__item-main"
                        >
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
            </template>
            <template #content>
                <router-view />
            </template>
        </nue-main>
    </nue-container>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import { collapseItemsData } from './constants.ts';
import './main.css';

const collapseValue = shallowRef([
    'basic',
    'data',
    'navigation',
    'form',
    'feedback',
    'others'
]);
</script>

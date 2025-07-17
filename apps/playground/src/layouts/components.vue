<template>
    <nue-main>
        <nue-aside>
            <nue-collapse v-model="collapseValue" theme="menu">
                <nue-collapse-item
                    v-for="(item, idx) in componentLayoutAsideLinks"
                    :key="idx"
                    :name="item.name"
                    :title="item.title"
                >
                    <nue-div align="stretch" gap=".25rem" vertical>
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
    </nue-main>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import {
    NueMain,
    NueLink,
    NueCollapse,
    NueCollapseItem,
    NueDiv,
    NueAside,
    NueSeparator,
    NueContent
} from '@nue-ui/components';
import { componentLayoutAsideLinks } from '../constants.ts';

const collapseValue = shallowRef(['basic', 'data', 'navigation', 'form', 'feedback', 'others']);
</script>

<style scoped></style>

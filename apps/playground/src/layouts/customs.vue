<template>
    <nue-main>
        <nue-aside>
            <nue-div align="stretch" gap=".25rem" vertical>
                <nue-link
                    v-for="(link, idx) in customLayoutAsideLinks"
                    :key="idx"
                    :route="link.route"
                    theme="route"
                >
                    {{ link.text }}
                </nue-link>
            </nue-div>
        </nue-aside>
        <nue-separator op-target="previous" />
        <nue-content>
            <router-view />
        </nue-content>
    </nue-main>
</template>

<script lang="ts" setup>
import { NueMain, NueLink, NueDiv, NueAside, NueSeparator, NueContent } from '@nue-ui/components';
import { customLayoutAsideLinks } from '../constants.ts';
</script>

<style scoped></style>

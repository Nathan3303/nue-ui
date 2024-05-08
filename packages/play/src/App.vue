<template>
    <nue-container>
        <nue-header>
            <template #logo>NueUI</template>
            <template #nav>
                <nue-badge :value="10" :max="9">
                    <nue-button>Hello World</nue-button>
                </nue-badge>
            </template>
            <template #user>
                <nue-link href="/">
                    <nue-avatar src="https://picsum.photos/200"></nue-avatar>
                    <nue-text>username</nue-text>
                </nue-link>
            </template>
        </nue-header>
        <nue-main>
            <template #aside>Aside</template>
            <template #content>
                <nue-collapse>
                    <nue-collapse-item title="ABC" name="c1">
                        <nue-input v-model="inputValue"></nue-input>
                        <nue-textarea v-model="textareaValue"></nue-textarea>
                    </nue-collapse-item>
                </nue-collapse>
                <nue-collapse>
                    <nue-collapse-item title="ABC" name="c2">
                        <nue-input v-model="inputValue"></nue-input>
                        <nue-textarea v-model="textareaValue"></nue-textarea>
                    </nue-collapse-item>
                </nue-collapse>
            </template>
        </nue-main>
        <nue-footer>
            <nue-text>Create by Nathan.</nue-text>
        </nue-footer>
    </nue-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "App" });

const inputValue = ref("");
const textareaValue = ref("");
</script>

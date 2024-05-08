<template>
    <nue-container>
        <nue-header>
            <template #logo>NueUI</template>
            <template #nav>
                <nue-link theme="btnlike" href="#">About</nue-link>
                <nue-link theme="btnlike" href="#">About</nue-link>
                <nue-link theme="btnlike" href="#">About</nue-link>
                <nue-link theme="btnlike" href="#">About</nue-link>
            </template>
            <template #user>
                <nue-link href="/">
                    <nue-div align="center" gap="8px">
                        <nue-text>username</nue-text>
                        <nue-avatar
                            src="https://picsum.photos/200"
                            shape="round" />
                    </nue-div>
                </nue-link>
            </template>
        </nue-header>
        <nue-main>
            <template #aside>Aside</template>
            <template #content>
                <nue-collapse v-model="collapseValue">
                    <nue-collapse-item title="Collapse Item 1" name="c1">
                        <nue-input v-model="inputValue"></nue-input>
                        <nue-textarea v-model="textareaValue"></nue-textarea>
                        <nue-button>Hello World</nue-button>
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
const collapseValue = ref(["c1"]);
</script>

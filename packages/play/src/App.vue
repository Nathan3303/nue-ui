<template>
    <nue-container>
        <nue-header height="72px">
            <template #logo>NueUI PlayGround</template>
        </nue-header>
        <nue-main aside-width="240px">
            <template #aside>Aside</template>
            <template #content>
                <nue-collapse v-model="collapseValue">
                    <nue-collapse-item
                        title="Basic Components"
                        name="basic-comp">
                        <basic-comp></basic-comp>
                    </nue-collapse-item>
                    <nue-collapse-item title="Data Components" name="data-comp">
                        <data-comp></data-comp>
                    </nue-collapse-item>
                </nue-collapse>
            </template>
        </nue-main>
        <nue-footer>Footer</nue-footer>
    </nue-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NueConfirm, NueMessage, NuePrompt } from "nue-ui";
import BasicComp from "./components/basic-comp.vue";
import DataComp from "./components/data-comp.vue";

const inputValue = ref("");
const textareaValue = ref("");
const drawerVisible = ref(false);

const collapseValue = ref(["basic-comp", "data-comp"]);

function handleConfirm() {
    const confirmOptions = {
        content: "Are you sure to do this?",
        title: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
    };
    NueConfirm(confirmOptions)
        .catch((err) => {
            console.log(err);
        })
        .then((res) => {
            console.log(res);
        });
}

function handleMessage() {
    NueMessage({
        message: "This is a message.",
        type: "success",
        duration: 3000,
    });
}

function handlePrompt() {
    const promptOptions = {
        content: "Please input something:",
        title: "Prompt",
        inputPlaceholder: "Input something here...",
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
    };
    NuePrompt(promptOptions)
        .catch((err) => {
            console.log(err);
        })
        .then((res) => {
            console.log(res);
        });
}
</script>

<style scoped></style>

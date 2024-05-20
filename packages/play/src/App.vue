<template>
    <nue-container>
        <nue-header height="72px">
            <template #logo>Logo</template>
            <template #nav>
                <nue-link>Link1</nue-link>
                <nue-link>Link2</nue-link>
                <nue-link>Link3</nue-link>
                <nue-link>Link4</nue-link>
            </template>
            <template #ops>
                <nue-button icon="search" shape="round" theme="icon-only" />
            </template>
            <template #user>
                <nue-badge :value="4">
                    <nue-avatar
                        size="small"
                        shape="round"
                        src="https://picsum.photos/64/64" />
                </nue-badge>
            </template>
        </nue-header>
        <nue-main>
            <template #aside>
                <nue-text size="medium">Aside</nue-text>
            </template>
            <template #content>
                <nue-div vertical>
                    <nue-text size="medium">Content</nue-text>
                    <nue-divider text="NueText" />
                    <nue-text size="normal">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Aperiam animi maiores, commodi incidunt itaque
                        doloribus voluptatibus iusto ullam ipsam temporibus.
                        Eum, molestias. Sequi obcaecati id tenetur! Voluptate ea
                        ipsum cumque.
                    </nue-text>
                    <nue-divider text="NueButton & NueButtonGroup" />
                    <nue-div>
                        <nue-button>Hello, World</nue-button>
                        <nue-button>你好，世界</nue-button>
                        <nue-button>こんにちは、世界</nue-button>
                        <nue-button-group>
                            <nue-button icon="search">Search</nue-button>
                            <nue-button icon="plus">Add</nue-button>
                            <nue-button icon="more">More</nue-button>
                        </nue-button-group>
                    </nue-div>
                    <nue-divider text="NueLink" />
                    <nue-div>
                        <nue-link href="http://www.baidu.com" />
                        <nue-link href="http://www.google.com" />
                    </nue-div>
                    <nue-divider text="NueAvatar" />
                    <nue-div>
                        <nue-avatar src="http://picsum.photos/64/64?1" />
                        <nue-avatar
                            shape="round"
                            src="http://picsum.photos/64/64?2" />
                    </nue-div>
                    <nue-divider text="Collapse & CollapseItem" />
                    <nue-collapse>
                        <nue-collapse-item title="Item1">
                            <nue-text size="medium">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Corporis cum quam, libero
                                laborum repudiandae, iure autem, ipsum
                                aspernatur illum facilis deserunt illo beatae!
                                Perspiciatis deserunt dicta non quidem.
                                Nesciunt, officia.
                            </nue-text>
                        </nue-collapse-item>
                    </nue-collapse>
                    <nue-divider text="NueInput & NueTextarea" />
                    <nue-input
                        width="100%"
                        v-model="inputValue"
                        placeholder="Input something here..." />
                    <nue-textarea
                        width="100%"
                        v-model="textareaValue"
                        placeholder="Input something here..." />
                    <nue-divider text="NueConfirm & NueMessage & NuePrompt" />
                    <nue-div>
                        <nue-button @click="handleConfirm">Confirm</nue-button>
                        <nue-button @click="handleMessage">Message</nue-button>
                        <nue-button @click="handlePrompt">Prompt</nue-button>
                    </nue-div>
                    <nue-divider text="NueDrawer" />
                    <nue-button @click="drawerVisible = true"
                        >Drawer</nue-button
                    >
                    <nue-drawer v-model:visible="drawerVisible">
                        <nue-text size="medium">Drawer Content</nue-text>
                    </nue-drawer>
                </nue-div>
            </template>
        </nue-main>
        <nue-footer>Footer</nue-footer>
    </nue-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NueConfirm, NueMessage, NuePrompt } from "nue-ui";

const inputValue = ref("");
const textareaValue = ref("");
const drawerVisible = ref(false);

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

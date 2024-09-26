<template>
    <nue-div>
        <nue-div>
            <nue-button @click="theme = void 0">Default</nue-button>
            <nue-button @click="theme = 'horizontal'">Horizontal</nue-button>
        </nue-div>
        <nue-container :theme="theme">
            <nue-header>
                <template #logo>
                    {{ theme === "horizontal" ? "L" : "Logo" }}
                </template>
                <template #nav>
                    <nue-link theme="btnlike,actived" icon="board"
                        >Board</nue-link
                    >
                    <nue-link theme="btnlike" icon="drive">Drive</nue-link>
                </template>
                <template #user>
                    <nue-avatar
                        src="https://cdn.vuetifyjs.com/images/john.jpg" />
                </template>
            </nue-header>
            <nue-main allow-resize-aside responsive use-visible-button>
                <template #aside>
                    Aside
                    <nue-link theme="btnlike,actived">Page 1</nue-link>
                    <nue-link theme="btnlike">Page 2</nue-link>
                    <nue-link theme="btnlike">Page 3</nue-link>
                </template>
                <template #content>
                    Content
                    <nue-text tag="p" :clamped="6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Fugit reiciendis saepe, dolore vel voluptate iste odio
                        eius esse repellendus facere numquam reprehenderit
                        quidem labore ipsa aliquam recusandae voluptas omnis.
                        Possimus.
                    </nue-text>
                </template>
                <template #outline>
                    Outline
                    <ul class="outline-list">
                        <li>Outline link 1</li>
                        <li>Outline link 2</li>
                        <li>Outline link 3</li>
                        <li>Outline link 4</li>
                    </ul>
                </template>
            </nue-main>
            <nue-footer v-if="theme !== 'horizontal'">
                {{ theme === "horizontal" ? "F" : "Footer" }}
            </nue-footer>
        </nue-container>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const theme = ref<string | undefined>(void 0);
</script>

<style scoped>
.nue-container {
    height: 420px;
}

.outline-list {
    list-style: none;
    padding: 0;
    margin: 0;

    & > li {
        padding: 4px 0;
        font-size: 12px;
        color: gray;

        &:hover {
            text-decoration: underline;
            color: black;
            cursor: pointer;
        }
    }
}
</style>

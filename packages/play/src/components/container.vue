<template>
    <nue-div>
        <nue-button
            :theme="theme === 'vertical' ? 'primary' : void 0"
            @click="theme = 'vertical'">
            Vertical
        </nue-button>
        <nue-button
            :theme="theme === 'horizontal' ? 'primary' : void 0"
            @click="theme = 'horizontal'">
            Horizontal
        </nue-button>
    </nue-div>
    <nue-container :theme="theme">
        <nue-header>
            <template #logo>Logo</template>
            <template #navigators>
                <nue-link theme="btnlike,actived" icon="board">Board</nue-link>
                <nue-link theme="btnlike" icon="drive">Drive</nue-link>
            </template>
            <template #actions>
                <nue-input
                    v-if="theme === 'vertical'"
                    placeholder="Search"
                    icon="search"
                    v-model="inputV"
                    theme="linely" />
                <nue-button v-else theme="icon-only" icon="search" />
            </template>
            <template #user>
                <nue-avatar src="https://cdn.vuetifyjs.com/images/john.jpg" />
            </template>
        </nue-header>
        <nue-main
            aside-width="200px"
            aside-min-width="128px"
            outline-width="240px"
            :allow-hide-outline="false">
            <template #aside>
                Aside
                <nue-link icon="time" theme="btnlike,actived">Time</nue-link>
                <nue-link icon="chat" theme="btnlike">Chat</nue-link>
                <nue-link icon="theme" theme="btnlike">Theme</nue-link>
            </template>
            <template #content>
                Content
                <nue-text tag="p" :clamped="6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit reiciendis saepe, dolore vel voluptate iste odio eius
                    esse repellendus facere numquam reprehenderit quidem labore
                    ipsa aliquam recusandae voluptas omnis. Possimus.
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
        <nue-footer>Footer</nue-footer>
    </nue-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputV = ref("");
const theme = ref("vertical");
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

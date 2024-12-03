<template>
    <!-- Vertical -->
    <nue-container>
        <nue-header>
            <template #logo>Logo</template>
            <template #navigators>
                <nue-link theme="btnlike,actived" icon="board">Board</nue-link>
                <nue-link theme="btnlike" icon="drive">Drive</nue-link>
            </template>
            <template #actions>
                <nue-input
                    placeholder="Search"
                    icon="search"
                    v-model="inputV"
                />
            </template>
            <template #user>
                <nue-avatar src="https://cdn.vuetifyjs.com/images/john.jpg" />
            </template>
        </nue-header>
        <nue-main
            aside-width="200px"
            aside-min-width="10%"
            :allow-hide-aside="false"
            outline-width="180px"
        >
            <template #aside>
                <nue-link icon="time" theme="btnlike,actived">Time</nue-link>
                <nue-link icon="chat" theme="btnlike">Chat</nue-link>
                <nue-link icon="theme" theme="btnlike">Theme</nue-link>
            </template>
            <template #content>
                <nue-container theme="vertical,inner" style="border: none">
                    <nue-header height="auto">Header</nue-header>
                    <nue-main>
                        Main <br />
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Eligendi modi ab velit voluptatum itaque
                        excepturi, repudiandae ex quaerat consectetur nisi vitae
                        architecto voluptates, fuga tempora, aliquid voluptate
                        dolor quo beatae?
                    </nue-main>
                    <nue-footer>Footer</nue-footer>
                </nue-container>
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
    <!-- Horizontal -->
    <nue-container theme="horizontal">
        <nue-header>
            <template #logo>Logo</template>
            <template #navigators>
                <nue-link theme="btnlike,actived" icon="board">Board</nue-link>
                <nue-link theme="btnlike" icon="drive">Drive</nue-link>
            </template>
            <template #actions>
                <nue-button theme="icon-only" icon="search" />
            </template>
            <template #user>
                <nue-avatar src="https://cdn.vuetifyjs.com/images/john.jpg" />
            </template>
        </nue-header>
        <nue-main
            aside-width="200px"
            aside-min-width="128px"
            :allow-hide-aside="false"
            outline-width="180px"
        >
            <template #aside>
                Aside
                <nue-link icon="time" theme="btnlike,actived">Time</nue-link>
                <nue-link icon="chat" theme="btnlike">Chat</nue-link>
                <nue-link icon="theme" theme="btnlike">Theme</nue-link>
            </template>
            <template #content>
                <nue-container theme="vertical,inner" style="border: none">
                    <nue-header height="auto">Content</nue-header>
                    <nue-main aside-width="50%">
                        <template #aside>
                            <nue-text>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Fugit reiciendis saepe, dolore
                                vel voluptate iste odio eius esse repellendus
                                facere numquam reprehenderit quidem labore ipsa
                                aliquam recusandae voluptas omnis. Possimus.
                            </nue-text>
                        </template>
                        <nue-text>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Fugit reiciendis saepe, dolore vel voluptate
                            iste odio eius esse repellendus facere numquam
                            reprehenderit quidem labore ipsa aliquam recusandae
                            voluptas omnis. Possimus.
                        </nue-text>
                    </nue-main>
                    <nue-footer>Content - Footer</nue-footer>
                </nue-container>
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
    </nue-container>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const inputV = ref('');
</script>

<style scoped>
    .nue-container {
        height: 512px;
        border: 1px solid var(--divider-color);
        border-radius: var(--primary-radius);
        background-color: #fefefe;
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

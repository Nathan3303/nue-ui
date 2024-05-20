<template>
    <nue-div class="basic-comp" vertical>
        <nue-div wrap align="center">
            <nue-button>Hello, World</nue-button>
            <nue-button shape="round">你好，世界</nue-button>
            <nue-button disabled>こんにちは、世界</nue-button>
            <nue-button
                icon="search"
                :loading="isSearching"
                @click="handleSearch">
                Search
            </nue-button>
            <nue-button use-throttle :throttle-duration="360" @click="count++">
                Count: {{ count }}
            </nue-button>
            <nue-button-group>
                <nue-button icon="search">Search</nue-button>
                <nue-button icon="plus">Add</nue-button>
                <nue-button icon="more">More</nue-button>
            </nue-button-group>
            <nue-link href="http://www.baidu.com" />
            <nue-link href="http://www.google.com" disabled />
            <nue-link theme="btnlike" icon="icon-target">Button like</nue-link>
            <nue-div vertical>
                <nue-text size="normal">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Aperiam animi maiores, commodi incidunt itaque doloribus
                    voluptatibus iusto ullam ipsam temporibus. Eum, molestias.
                    Sequi obcaecati id tenetur! Voluptate ea ipsum cumque.
                </nue-text>
            </nue-div>
        </nue-div>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSearching = ref(false);
const count = ref(0);

function handleSearch() {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 2400);
}
</script>

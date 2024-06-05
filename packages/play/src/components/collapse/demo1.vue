<template>
    <nue-collapse v-model="activeNames">
        <nue-collapse-item name="c1" title="Collapse Item 1">
            <nue-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores natus aspernatur facere dolores eos itaque cupiditate
                eveniet perspiciatis dolorem?
            </nue-text>
        </nue-collapse-item>
        <nue-collapse-item name="c2">
            <template #header="{ collapse, state }">
                <nue-button
                    theme="pure"
                    @click="collapse"
                    :icon="`arrow-${state ? 'right' : 'down'}`">
                    Collapse Item 2
                </nue-button>
            </template>
            <nue-text>
                Illo neque, numquam amet rem veniam dolorum iste aperiam
                laudantium fugiat.
            </nue-text>
        </nue-collapse-item>
    </nue-collapse>
</template>

<script setup lang="ts">
import { ref } from "vue";
const activeNames = ref(["c1", "c2"]);
</script>

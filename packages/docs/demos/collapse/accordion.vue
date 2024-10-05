<template>
    <nue-collapse v-model="activeNames" accordion>
        <nue-collapse-item title="折叠项 A 标题" name="Collapse item A">
            <nue-text size="12px">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quibusdam voluptas harum velit, odit eaque aliquid optio
                excepturi quas! Deserunt sequi quisquam vero magni itaque
                assumenda facere dolore id tempora ab?
            </nue-text>
        </nue-collapse-item>
        <nue-collapse-item title="折叠项 B 标题" name="Collapse item B">
            <nue-text size="12px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt molestias illum reprehenderit fugiat ea corrupti et
                officiis nemo! Tenetur, in laborum consequatur nam quas
                molestias magni mollitia a et delectus?
            </nue-text>
        </nue-collapse-item>
    </nue-collapse>
    <p></p>
    <nue-div> 已展开的面板: {{ activeNames }} </nue-div>
</template>

<script setup>
import { ref } from "vue";

const activeNames = ref(["Collapse item A"]);
</script>

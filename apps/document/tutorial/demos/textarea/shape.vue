<template>
    <nue-div align="stretch" vertical>
        <nue-textarea
            v-model="textareaVModel"
            placeholder="Please input something"
            shape="noshape"
        />
    </nue-div>
</template>

<script setup>
import { ref } from 'vue';

const textareaVModel = ref('');
</script>

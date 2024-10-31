<template>
    <nue-div vertical align="stretch">
        <nue-textarea
            v-model="textareaVModel"
            placeholder="Please input something"
            shape="rounded"
        />
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

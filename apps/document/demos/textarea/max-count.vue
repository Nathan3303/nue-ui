<template>
    <nue-div vertical align="stretch">
        <nue-textarea
            v-model="textareaVModel"
            placeholder="Please input something"
            :maxlength="textareaMaxlength"
        />
        <nue-textarea
            v-model="textareaVModel"
            placeholder="Please input something"
            :maxlength="textareaMaxlength"
            counter="word-limit"
        />
        <nue-textarea
            v-model="textareaVModel"
            placeholder="Please input something"
            :maxlength="textareaMaxlength"
            counter="word-left"
        />
        <nue-textarea
            v-model="textareaVModel"
            placeholder="Please input something"
            :maxlength="textareaMaxlength"
            counter="both"
        />
    </nue-div>
</template>

<script setup>
    import { ref } from 'vue';

    const textareaVModel = ref('');
    const textareaMaxlength = ref(256);
</script>

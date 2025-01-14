<template>
    <nue-div class="vp-raw">
        <nue-badge :hidden="visible" value="New">
            <nue-button @click="visible = !visible">
                点击{{ !visible ? '隐藏' : '显示' }}徽标
            </nue-button>
        </nue-badge>
    </nue-div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(true);
</script>

<template>
    <nue-collapse v-model="activeNames">
        <nue-collapse-item name="Collapse item A" title="折叠项 A 标题">
            <nue-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                asperiores amet, nihil quisquam rem, esse, consequuntur corporis
                sunt aliquid sapiente inventore autem dignissimos aut accusamus
                et iste magni vitae enim?
            </nue-text>
        </nue-collapse-item>
        <nue-collapse-item name="Collapse item B" title="折叠项 B 标题">
            <nue-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                asperiores amet, nihil quisquam rem, esse, consequuntur corporis
                sunt aliquid sapiente inventore autem dignissimos aut accusamus
                et iste magni vitae enim?
            </nue-text>
        </nue-collapse-item>
    </nue-collapse>
    <p></p>
    <nue-div> 已展开的面板: {{ activeNames }}</nue-div>
</template>

<script setup>
import { ref } from 'vue';

const activeNames = ref([]);
</script>

<template>
    <i class="nue-icon iconfont" :class="[`icon-${props.name}`]"></i>
</template>

<script setup lang="ts">
defineOptions({
    name: "NueIcon",
});

const props = withDefaults(
    defineProps<{
        name?: string;
    }>(),
    {
        name: "",
    }
);
</script>

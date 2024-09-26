<template>
    <footer class="nue-footer">
        <slot></slot>
    </footer>
</template>

<script setup lang="ts">
import type {NueFooterProps} from './types'

defineOptions({name: "NueFooter"});
defineProps<NueFooterProps>();
</script>

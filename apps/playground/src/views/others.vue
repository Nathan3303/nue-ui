<template>
    <nue-div class="view-container">
        <demo-card title="Divider 分隔符">
            <divider-demo></divider-demo>
        </demo-card>
    </nue-div>
    <teleport to="#outline">
        <ul class="outline-list">
            <li><a href="#Divider 分隔符">Divider 分隔符</a></li>
        </ul>
    </teleport>
</template>

<script lang="ts" setup>
import DemoCard from '../layers/demo-card';
import DividerDemo from '../components/divider.vue';
</script>

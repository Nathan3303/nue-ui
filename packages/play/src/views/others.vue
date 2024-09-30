<template>
    <div class="view-container">
        <demo-card title="Divider 分隔符">
            <divider-demo></divider-demo>
        </demo-card>
    </div>
    <teleport to="#outline">
        <ul class="outline-list">
            <h3>大纲</h3>
            <li><a href="#Divider 分隔符">Divider 分隔符</a></li>
        </ul>
    </teleport>
</template>

<script setup lang="ts">
import DemoCard from "../layers/demo-card";
import DividerDemo from "../components/divider.vue";
</script>

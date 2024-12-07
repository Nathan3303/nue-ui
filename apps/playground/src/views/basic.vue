<template>
    <nue-div class="view-container" vertical>
        <demo-card title="Button 按钮">
            <button-demo></button-demo>
        </demo-card>
        <demo-card title="ButtonGroup 按钮组">
            <button-group-demo></button-group-demo>
        </demo-card>
        <demo-card title="Link 链接">
            <link-demo></link-demo>
        </demo-card>
        <demo-card title="Text 文本">
            <text-demo></text-demo>
        </demo-card>
        <demo-card title="Icon 图标">
            <icon-demo></icon-demo>
        </demo-card>
        <demo-card title="Container 布局容器">
            <container-demo></container-demo>
        </demo-card>
    </nue-div>
    <teleport to="#outline">
        <ul class="outline-list">
            <li><a href="#Button 按钮">Button 按钮</a></li>
            <li><a href="#ButtonGroup 按钮组">ButtonGroup 按钮组</a></li>
            <li><a href="#Text 文本">Text 文本</a></li>
            <li><a href="#Icon 图标">Icon 图标</a></li>
            <li><a href="#Container 布局容器">Container 布局容器</a></li>
        </ul>
    </teleport>
</template>

<script lang="ts" setup>
import DemoCard from '../layers/demo-card';
import ButtonDemo from '../components/button.vue';
import ButtonGroupDemo from '../components/button-group.vue';
import LinkDemo from '../components/link.vue';
import TextDemo from '../components/text.vue';
import IconDemo from '../components/icon.vue';
import ContainerDemo from '../components/container.vue';
</script>

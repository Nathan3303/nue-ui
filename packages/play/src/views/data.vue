<template>
    <div class="view-container">
        <demo-card title="Avatar 头像">
            <avatar-demo></avatar-demo>
        </demo-card>
        <demo-card title="Badge 徽标">
            <badge-demo></badge-demo>
        </demo-card>
        <demo-card title="Marquee 跑马灯">
            <marquee-demo></marquee-demo>
        </demo-card>
        <demo-card title="Infinite Scroll 无限滚动">
            <infinite-scroll-demo></infinite-scroll-demo>
        </demo-card>
        <demo-card title="Collapse 折叠面板">
            <collapse-demo></collapse-demo>
        </demo-card>
        <demo-card title="Progress 进度条">
            <progress-demo></progress-demo>
        </demo-card>
        <demo-card title="Empty 空状态">
            <empty-demo></empty-demo>
        </demo-card>
    </div>
</template>

<script setup lang="ts">
import DemoCard from "../layers/demo-card";
import AvatarDemo from "../components/avatar.vue";
import BadgeDemo from "../components/badge.vue";
import InfiniteScrollDemo from "../components/infinite-scroll.vue";
import MarqueeDemo from "../components/marquee.vue";
import CollapseDemo from "../components/collapse.vue";
import ProgressDemo from "../components/progress.vue";
import EmptyDemo from "../components/empty.vue";
</script>

<template>
    <div class="view-container">
        <demo-card title="Avatar">
            <avatar-demo></avatar-demo>
        </demo-card>
        <demo-card title="Badge">
            <badge-demo></badge-demo>
        </demo-card>
        <demo-card title="Marquee">
            <marquee-demo></marquee-demo>
        </demo-card>
        <demo-card title="Infinite Scroll">
            <infinite-scroll-demo></infinite-scroll-demo>
        </demo-card>
        <demo-card title="Collapse">
            <collapse-demo></collapse-demo>
        </demo-card>
        <demo-card title="Progress">
            <progress-demo></progress-demo>
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
</script>

<template>
    <div class="view-container">
        <nue-div vertical theme="card">
            <nue-text size="24px">Avatar</nue-text>
            <avatar-demo1></avatar-demo1>
        </nue-div>
        <nue-div vertical theme="card" gap="24px">
            <nue-text size="24px">Badge</nue-text>
            <badge-demo1></badge-demo1>
            <badge-demo2></badge-demo2>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="24px">Marquee</nue-text>
            <marquee-demo1></marquee-demo1>
        </nue-div>
        <nue-div vertical theme="card" wrap="nowrap">
            <nue-text size="24px">Infinite Scroll</nue-text>
            <infinite-scroll-demo1></infinite-scroll-demo1>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="24px">Collapse</nue-text>
            <collapse-demo1></collapse-demo1>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="24px">Progress</nue-text>
            <progress-demo1></progress-demo1>
        </nue-div>
    </div>
</template>

<script setup lang="ts">
import AvatarDemo1 from "../components/avatar/demo1.vue";
import BadgeDemo1 from "../components/badge/demo1.vue";
import BadgeDemo2 from "../components/badge/demo2.vue";
import InfiniteScrollDemo1 from "../components/infinite-scroll/demo1.vue";
import MarqueeDemo1 from "../components/marquee/demo1.vue";
import CollapseDemo1 from "../components/collapse/demo1.vue";
import ProgressDemo1 from "../components/progress/demo1.vue";
</script>

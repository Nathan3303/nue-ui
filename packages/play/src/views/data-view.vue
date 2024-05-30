<template>
    <nue-div vertical :divider="{}">
        <nue-div vertical>
            <nue-text size="large">Avatar</nue-text>
            <avatar-demo1></avatar-demo1>
        </nue-div>
        <nue-div vertical>
            <nue-text size="large">Badge</nue-text>
            <badge-demo1></badge-demo1>
            <badge-demo2></badge-demo2>
        </nue-div>
        <nue-div vertical>
            <nue-text size="large">Marquee</nue-text>
            <marquee-demo1></marquee-demo1>
        </nue-div>
        <nue-div vertical>
            <nue-text size="large">Infinite Scroll</nue-text>
            <infinite-scroll-demo1></infinite-scroll-demo1>
        </nue-div>
    </nue-div>
</template>

<script setup lang="ts">
import AvatarDemo1 from "../components/avatar/demo1.vue";
import BadgeDemo1 from "../components/badge/demo1.vue";
import BadgeDemo2 from "../components/badge/demo2.vue";
import InfiniteScrollDemo1 from "../components/infinite-scroll/demo1.vue";
import MarqueeDemo1 from "../components/marquee/demo1.vue";
</script>

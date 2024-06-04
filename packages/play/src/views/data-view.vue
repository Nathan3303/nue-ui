<template>
    <div class="view-container">
        <nue-div vertical theme="card">
            <nue-text size="large">Avatar</nue-text>
            <avatar-demo1></avatar-demo1>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="large">Badge</nue-text>
            <badge-demo1></badge-demo1>
            <badge-demo2></badge-demo2>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="large">Marquee</nue-text>
            <marquee-demo1></marquee-demo1>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="large">Infinite Scroll</nue-text>
            <infinite-scroll-demo1></infinite-scroll-demo1>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="large">Collapse</nue-text>
            <nue-collapse>
                <nue-collapse-item title="Collapse Item 1">
                    <nue-text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Asperiores natus aspernatur facere dolores eos itaque
                        cupiditate eveniet perspiciatis dolorem?
                    </nue-text>
                </nue-collapse-item>
                <nue-collapse-item>
                    <template #header="{ collapse, state }">
                        <nue-button
                            theme="pure"
                            @click="collapse"
                            :icon="`arrow-${state ? 'right' : 'down'}`">
                            Collapse Item 2
                        </nue-button>
                    </template>
                    <nue-text>
                        Illo neque, numquam amet rem veniam dolorum iste aperiam
                        laudantium fugiat.
                    </nue-text>
                </nue-collapse-item>
            </nue-collapse>
        </nue-div>
    </div>
</template>

<script setup lang="ts">
import AvatarDemo1 from "../components/avatar/demo1.vue";
import BadgeDemo1 from "../components/badge/demo1.vue";
import BadgeDemo2 from "../components/badge/demo2.vue";
import InfiniteScrollDemo1 from "../components/infinite-scroll/demo1.vue";
import MarqueeDemo1 from "../components/marquee/demo1.vue";
</script>

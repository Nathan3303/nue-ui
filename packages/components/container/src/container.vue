<template>
    <section class="nue-container" :style="style">
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, useSlots, type Ref } from "vue";
import "../style/container.css";

defineOptions({
    name: "NueContainer",
});

const props = withDefaults(
    defineProps<{
        height?: string;
        backgroundColor?: string;
    }>(),
    {
        height: "100%",
        backgroundColor: "transparent",
    }
);

const headerHeight = ref("0px");
const footerHeight = ref("0px");

function _setDefaultHeight(
    vnode: any,
    compName: string,
    refObj: Ref,
    defaultHeight: string
) {
    if (vnode.type.name === compName) {
        if (vnode.props?.height) {
            refObj.value = vnode.props.height;
        } else {
            refObj.value = defaultHeight;
        }
    }
}

const slots = useSlots();
if (typeof slots?.default === "function") {
    slots.default().some((vnode) => {
        _setDefaultHeight(vnode, "NueHeader", headerHeight, "60px");
        _setDefaultHeight(vnode, "NueFooter", footerHeight, "60px");
    });
}

const style = computed(() => {
    return {
        "background-color": props.backgroundColor,
        "--container-height": props.height,
        "--header-height": headerHeight.value,
        "--footer-height": footerHeight.value,
    };
});
</script>

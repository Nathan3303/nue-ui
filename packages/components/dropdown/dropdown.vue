<template>
    <div
        class="nue-dropdown-wrapper"
        :class="{ 'nue-dropdown--droped': visible }"
        @mouseenter="handleHoverTrigger"
        @mouseleave="handleHoverTrigger">
        <!-- Default slot -->
        <slot :switchVisible="switchVisible" :visible="visible">
            <nue-button :shape="shape" @click="handleClickTrigger">
                {{ text ?? "Open dropdown" }}
                <template #append>
                    <nue-icon
                        class="state-icon"
                        name="arrow-down"
                        size="12px" />
                </template>
            </nue-button>
        </slot>
        <!-- Dropdown -->
        <transition name="dropdown-fade">
            <ul
                v-show="visible"
                :class="classes"
                @click="handleExecute"
                @mouseenter="handleEnterMenu"
                @mouseleave="handleHoverTrigger">
                <slot name="dropdown"> Empty </slot>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { NueButton } from "../button";
import type { DropdownPropsType, DropdownEmitsType } from "./types";
import "./dropdown.css";

defineOptions({ name: "NueDropdown" });

const emit = defineEmits<DropdownEmitsType>();
const props = withDefaults(defineProps<DropdownPropsType>(), {
    trigger: "click",
    type: "button",
    actionDelay: 172,
    text: "Open dropdown",
    hideOnClick: true,
    shape: "square",
    align: "left",
});

const visible = ref(false);
let timer: number = 0;

const classes = computed(() => {
    let list: string[] = [];
    list.push("nue-dropdown");
    if (props.align) list.push(`nue-dropdown--align-${props.align}`);
    return list;
});

function switchVisible(delay: number = 0) {
    return new Promise((resolve) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            visible.value = !visible.value;
            timer = 0;
            resolve(visible.value);
        }, delay) as unknown as number;
    });
}

async function handleClickTrigger() {
    const { trigger } = props;
    if (trigger !== "click") return;
    const newValue = await switchVisible(0);
    if (newValue) {
        window.addEventListener("click", handleClickTrigger, false);
    } else {
        window.removeEventListener("click", handleClickTrigger, false);
    }
}

function handleHoverTrigger(event: MouseEvent) {
    const { trigger, actionDelay } = props;
    const { type } = event;
    if (trigger !== "hover") return;
    if (type === "mouseenter") switchVisible(actionDelay);
    else if (type === "mouseleave") {
        if (visible.value) {
            switchVisible(actionDelay);
        } else {
            clearTimeout(timer as number);
            timer = 0;
        }
    }
}

function handleEnterMenu() {
    clearTimeout(timer as number);
    timer = 0;
}

function handleExecute(event: MouseEvent) {
    event.stopPropagation();
    const clicked = event.target as HTMLElement;
    const executeId = clicked.dataset.executeid;
    if (!executeId && executeId !== "") return;
    // console.log(executeId);
    emit("execute", executeId);
    if (props.hideOnClick) {
        window.removeEventListener("click", handleClickTrigger, false);
        visible.value = false;
    }
}

defineExpose({ visible, switchVisible });
</script>

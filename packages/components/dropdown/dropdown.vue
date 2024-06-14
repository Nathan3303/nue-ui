<template>
    <div
        ref="dropdownRef"
        class="nue-dropdown-wrapper"
        :class="{ 'nue-dropdown--droped': visible }"
        @mouseenter="handleHoverTrigger"
        @mouseleave="handleHoverTrigger">
        <!-- Default slot -->
        <slot
            :switchVisible="switchVisible"
            :clickTrigger="handleClickTrigger"
            :hoverTrigger="handleHoverTrigger"
            :visible="visible">
            <nue-button @click="handleClickTrigger">
                {{ text }}
                <template #append>
                    <nue-icon
                        class="state-icon"
                        name="arrow-down"
                        size="12px" />
                </template>
            </nue-button>
        </slot>
        <!-- Dropdown -->
        <transition name="fade">
            <ul
                ref="dropdownListRef"
                v-show="visible"
                :class="classes"
                :data-direction="direction"
                :data-align="align"
                @click="handleExecute"
                @mouseenter="handleEnterMenu"
                @mouseleave="handleHoverTrigger">
                <slot name="dropdown"> Empty </slot>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { NueButton } from "../button";
import type {
    DropdownPropsType,
    DropdownEmitsType,
    DropdownDirection,
} from "./types";
import "./dropdown.css";
import { parseTheme } from "@nue-ui/utils";

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

const dropdownRef = ref<HTMLDivElement>();
const dropdownListRef = ref<HTMLUListElement>();
const visible = ref(false);
const direction = ref<DropdownDirection>("bottom");
let timer: number = 0;

const classes = computed(() => {
    const { theme, align } = props;
    let list: string[] = [];
    const prefix = "nue-dropdown";
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (align) list.push(`nue-dropdown--align-${align}`);
    return list;
});

function checkVisible() {
    if (!dropdownRef.value) return;
    const { clientHeight: viewportHeight } =
        document.getElementsByTagName("body")[0];
    const { offsetTop, clientHeight } = dropdownRef.value;
    // console.log(offsetTop, clientHeight);
    const dropdownBottom = offsetTop + clientHeight;
    nextTick(() => {
        if (!dropdownListRef.value) return;
        const { clientHeight: listHeight } = dropdownListRef.value;
        direction.value =
            dropdownBottom + listHeight > viewportHeight ? "top" : "bottom";
    });
}

function switchVisible(delay: number = 0) {
    return new Promise((resolve) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            visible.value = !visible.value;
            timer = 0;
            checkVisible();
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

<template>
    <div
        class="nue-dropdown-wrapper"
        :data-visible="visible"
        ref="dropdownWrapperRef">
        <slot :clickTrigger="handleClickWrapper">
            <nue-button
                :size="size"
                :disabled="disabled"
                @click.stop="handleClickWrapper">
                {{ triggerText || text }}
                <template #append>
                    <nue-icon class="state-icon" name="arrow-down" />
                </template>
            </nue-button>
        </slot>
        <teleport to="#NueDropdownPool">
            <div
                v-if="visible"
                :class="dropdownClasses"
                :data-direction="placementInfo.direction"
                :style="dropdownStyles"
                ref="dropdownRef"
                @click.stop="handleExecute">
                <slot name="dropdown">
                    <span class="nue-dropdown__empty-text"> No options. </span>
                </slot>
            </div>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import { useDropdownPool } from "./use-dropdown-pool";
import { usePopper, usePopperController } from "@nue-ui/hooks";
import { parseTheme } from "@nue-ui/utils";
import type { NueDropdownProps, NueDropdownEmits } from "./types";
import "./dropdown.css";

defineOptions({ name: "NueDropdown" });
const props = withDefaults(defineProps<NueDropdownProps>(), {
    disabled: false,
    triggerText: "Dropdown",
    placement: "bottom-start",
    dropType: "click",
    hideOnClick: false,
    hideOnClicked: false,
});
const emit = defineEmits<NueDropdownEmits>();

const visible = ref(false);
const dropdownWrapperRef = ref<HTMLDivElement>();
const dropdownRef = ref<HTMLDivElement>();

const { activePool, deactivePool } = useDropdownPool();
const { placement, rectInfo, calculatePosition } = usePopper(
    dropdownWrapperRef,
    dropdownRef,
    {
        placement: props.placement,
    }
);
const { show, hide } = usePopperController(visible);

const dropdownClasses = computed(() => {
    const { theme, size } = props;
    const prefix = "nue-dropdown";
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (size) list.push(`${prefix}--${size}`);
    if (placement.value) list.push(`${prefix}--${placement.value}`);
    return list;
});

const dropdownStyles = computed(() => {
    const { wrapperWidth } = rectInfo;
    return {
        "--dropdown-wrapper-width": `${wrapperWidth}px`,
    };
});

const placementInfo = computed(() => {
    const splited = placement.value.split("-");
    return {
        direction: splited[0] || "top",
        alignment: splited[1] || "center",
    };
});

const handleShow = () => {
    show(
        () => {
            if (!visible.value) {
                document.body.click();
            }
        },
        () => {
            calculatePosition(props.placement);
            activePool();
            window.addEventListener("click", handleHide);
            window.addEventListener("wheel", handleHide);
        }
    );
};

const handleHide = () => {
    hide(
        160,
        () => {
            if (!dropdownRef.value) return;
            dropdownRef.value.style.animationName = "slide-fade-out";
        },
        () => {
            deactivePool();
            window.removeEventListener("click", handleHide);
            window.removeEventListener("wheel", handleHide);
        }
    );
};

const handleClickWrapper = (e: MouseEvent) => {
    e.stopPropagation();
    visible.value ? handleHide() : handleShow();
};

const handleExecute = (event: MouseEvent) => {
    event.stopPropagation();
    const clicked = event.target as HTMLElement;
    const executeId = clicked.dataset.executeid;
    // console.log(executeId);
    if (executeId) emit("execute", executeId);
    if (props.hideOnClicked || props.hideOnClick) {
        handleHide();
    } else {
        nextTick(() => {
            handleShow();
        });
    }
};
</script>

<template>
    <div class="nue-checkbox-group">
        <slot
            name="controller"
            v-if="useController"
            :controllerState="controllerState"
            :isIndeterminate="isIndeterminate">
            <nue-checkbox
                v-model="controllerState"
                :indeterminate="isIndeterminate"
                name="NueCheckboxGroupController">
                {{ controllerLabel ?? "" }}
            </nue-checkbox>
        </slot>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { provide, ref, watch, computed } from "vue";
import { CHECKBOX_GROUP_CTX_KEY } from "./constants";
import NueCheckbox from "../checkbox/checkbox.vue";
import type {
    NueCheckboxGroupProps,
    NueCheckboxGroupEmits,
    CheckboxName,
} from "./types";
import "./checkbox-group.css";

defineOptions({ name: "NueCheckboxGroup" });
const props = withDefaults(defineProps<NueCheckboxGroupProps>(), {
    disabled: false,
    min: 0,
    max: Infinity,
    useController: false,
});
const emit = defineEmits<NueCheckboxGroupEmits>();

const names = ref<CheckboxName[]>([]);
const activeNames = ref<CheckboxName[]>([]);
const maximized = ref(false);
const minimized = ref(false);

const isIndeterminate = computed(() => {
    return !maximized.value && !minimized.value;
});

const controllerState = computed({
    get() {
        if (maximized.value) return true;
        if (minimized.value) return false;
        return activeNames.value.length >= names.value.length;
    },
    set(newValue) {
        if (newValue) {
            let i = 0;
            while (i < names.value.length && !maximized.value) {
                const name = names.value[i++];
                if (!activeNames.value.includes(name)) {
                    activeNames.value.push(name);
                }
                checkMinMax();
            }
        } else {
            while (!minimized.value) {
                activeNames.value.pop();
                checkMinMax();
            }
        }
        emit("update:modelValue", activeNames.value);
    },
});

const handleRegisterName = (name: CheckboxName) => {
    if (names.value.includes(name)) return;
    names.value.push(name);
};

const handleUnregisterName = (name: CheckboxName) => {
    if (!names.value.includes(name)) return;
    names.value = names.value.filter((n) => n !== name);
};

const checkMinMax = () => {
    maximized.value = activeNames.value.length >= props.max;
    minimized.value = activeNames.value.length <= props.min;
};

const handlePushName = (name: CheckboxName) => {
    if (maximized.value) return false;
    if (activeNames.value.includes(name)) return false;
    activeNames.value.push(name);
    emit("update:modelValue", activeNames.value);
    checkMinMax();
    return true;
};

const handlePopName = (name: CheckboxName) => {
    if (minimized.value) return false;
    if (!activeNames.value.includes(name)) return false;
    activeNames.value = activeNames.value.filter((n) => n !== name);
    emit("update:modelValue", activeNames.value);
    checkMinMax();
    return true;
};

provide(CHECKBOX_GROUP_CTX_KEY, {
    activeNames: activeNames,
    size: props.size,
    disabled: props.disabled,
    maximized,
    minimized,
    pushName: handlePushName,
    popName: handlePopName,
    register: handleRegisterName,
    unregister: handleUnregisterName,
});

watch(
    () => props.modelValue,
    (newValue) => (activeNames.value = newValue as CheckboxName[]),
    { immediate: true }
);
</script>

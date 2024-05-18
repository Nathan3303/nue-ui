<template>
    <transition name="nue-dialog-transition">
        <div class="nue-dialog-wrapper">
            <div class="nue-dialog">
                <div class="nue-dialog__header">
                    <slot name="header">
                        <span>Dialog Title</span>
                        <nue-button
                            theme="icon-only"
                            icon="icon-clear"
                            @click.stop="handleClose" />
                    </slot>
                </div>
                <div class="nue-dialog__content">
                    <slot></slot>
                </div>
                <div class="nue-dialog__footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { NueButton } from "../../button/index";

defineOptions({ name: "NueDialog" });

function handleClose() {
    console.log("close dialog");
}
</script>

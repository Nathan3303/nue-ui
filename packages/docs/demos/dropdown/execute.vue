<template>
    <nue-div style="height: 160px">
        <nue-dropdown
            text="Click to open dropdown"
            @execute="handleExecute"
            hide-on-click>
            <template #dropdown>
                <li data-executeid="Coding">Coding</li>
                <li data-executeid="Testing">Testing</li>
                <li data-executeid="Maintaining">Maintaining</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>

<script setup>
import { NueMessage } from "nue-ui";

const handleExecute = (id) => {
    NueMessage({
        message: `Executing option ${id}`,
    });
    // switch (id) { ... }
};
</script>

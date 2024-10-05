<template>
    <nue-div style="height: 160px">
        <nue-dropdown
            text="请选择动作"
            hide-on-click
            placement="bottom-end"
            @execute="handleExecute">
            <template #dropdown>
                <li data-executeid="Coding">编写一段代码</li>
                <li data-executeid="Testing">测试一个功能</li>
                <li data-executeid="Maintaining">维护一个项目</li>
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

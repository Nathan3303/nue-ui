<template>
    <nue-div align="center">
        <nue-dropdown
            trigger="hover"
            @execute="handleExecute"
            hide-on-click
            align="center">
            <template #default>
                <nue-div align="center" gap="6px">
                    <nue-avatar
                        src="https://picsum.photos/id/237/200/200"
                        shape="round" />
                    <nue-button shape="no-shape">
                        Username
                        <template #append>
                            <nue-icon
                                class="state-icon"
                                name="arrow-down"
                                size="14px" />
                        </template>
                    </nue-button>
                </nue-div>
            </template>
            <template #dropdown>
                <li data-executeid="profile">My profile</li>
                <li data-executeid="settings">Settings</li>
                <li data-executeid="logout">Logout</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>

<script setup lang="ts">
import { NueMessage } from "nue-ui";

function handleExecute(id: string) {
    switch (id) {
        case "profile":
            NueMessage({ message: "Profile clicked" });
            break;
        case "settings":
            NueMessage({ message: "Settings clicked" });
            break;
        case "logout":
            NueMessage({ message: "Logout clicked" });
            break;
    }
}
</script>

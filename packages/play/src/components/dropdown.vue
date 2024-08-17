<template>
    <nue-div align="center">
        <nue-dropdown trigger="hover" text="Hover">
            <template #dropdown>
                <li>trigger="hover"</li>
                <li>text="Hover"</li>
            </template>
        </nue-dropdown>
        <nue-dropdown trigger="click" text="Click">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Click"</li>
            </template>
        </nue-dropdown>
    </nue-div>
    <nue-div align="center">
        <nue-dropdown text="Lefty" align="left">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Lefty"</li>
                <li>align="left"</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="Centered" align="center">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Centered"</li>
                <li>align="center"</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="Righty" align="right">
            <template #dropdown>
                <li>trigger="click"</li>
                <li>text="Righty"</li>
                <li>align="right"</li>
            </template>
        </nue-dropdown>
    </nue-div>
    <nue-div align="center">
        <nue-dropdown trigger="hover" @execute="handleExecute" hide-on-click>
            <template #default>
                <nue-div align="center" gap="8px">
                    <nue-avatar
                        src="https://picsum.photos/id/242/64/64"
                        theme="rounded"
                        size="28px" />
                    <nue-button theme="pure">
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

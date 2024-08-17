<template>
    <nue-div align="center" style="overflow: hidden">
        <nue-button>Search</nue-button>
        <nue-button icon="search">Search</nue-button>
        <nue-button icon="search" disabled>Search</nue-button>
        <nue-button icon="search" :loading="isSearching" @click="handleSearch">
            Search
        </nue-button>
        <nue-button
            icon="search"
            use-throttle
            :throttle-duration="360"
            @click="count++">
            Search ({{ count }})
        </nue-button>
        <nue-button theme="round" icon="search">Search</nue-button>
        <nue-button theme="icon-only" icon="search" />
        <nue-button theme="round,primary" icon="search">Search</nue-button>
        <nue-button theme="pure" icon="search">Search</nue-button>
        <nue-button size="small" icon="search">Search</nue-button>
        <nue-button icon="search">Search</nue-button>
        <nue-button size="large" icon="search">Search</nue-button>
        <nue-button>
            <template #prepend>
                <nue-icon name="scan"></nue-icon>
            </template>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
            distinctio similique odio aliquid iste iusto ad magnam ipsam nulla
            culpa error deserunt, ea eum facere possimus maiores ipsa
            aspernatur. Odio.
            <template #append>
                <nue-icon name="scan"></nue-icon>
            </template>
        </nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSearching = ref(false);
const count = ref(0);

function handleSearch() {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 2400);
}
</script>

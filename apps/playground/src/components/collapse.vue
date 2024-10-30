<template>
    <nue-collapse v-model="activeNames" accordion>
        <nue-collapse-item name="c1" title="面板 A">
            <nue-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique numquam quos, veniam, inventore ipsa nulla id libero
                blanditiis illum eligendi, totam quod exercitationem omnis iure
                corrupti. Iste quae veritatis dignissimos?
            </nue-text>
        </nue-collapse-item>
        <nue-collapse-item name="c2">
            <template #header="{ collapse, state }">
                <nue-button
                    theme="pure"
                    @click="collapse"
                    :icon="`arrow-${state ? 'right' : 'down'}`"
                >
                    面板 B（自定义头部）
                </nue-button>
            </template>
            <nue-text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex,
                facere voluptatum! Tempore molestiae dolorum dolorem magnam,
                recusandae autem magni repellendus sequi reprehenderit.
                Obcaecati tempora rem recusandae perferendis ullam porro
                dolorum!
            </nue-text>
        </nue-collapse-item>
        <nue-collapse-item name="c3" title="面板 C（空面板）">
        </nue-collapse-item>
    </nue-collapse>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    const activeNames = ref(['c1', 'c2', 'c3']);
</script>

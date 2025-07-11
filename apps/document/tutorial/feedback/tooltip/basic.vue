<template>
    <nue-div theme="grid">
        <nue-tooltip
            v-for="tooltip in tooltips"
            :key="tooltip.placement"
            :content="tooltip.content"
            :placement="tooltip.placement"
            :style="{ gridArea: tooltip.placement }"
        >
            <nue-button theme="small">
                {{ tooltip.buttonText }}
            </nue-button>
        </nue-tooltip>
    </nue-div>
</template>

<script lang="ts" setup>
const tooltips = [
    { placement: 'top-start', content: '上方左对齐', buttonText: '上左' },
    { placement: 'top-center', content: '上方居中', buttonText: '上中' },
    { placement: 'top-end', content: '上方右对齐', buttonText: '上右' },
    { placement: 'left-start', content: '左方上对齐', buttonText: '左上' },
    { placement: 'left-center', content: '左方居中', buttonText: '左中' },
    { placement: 'left-end', content: '左方下对齐', buttonText: '左下' },
    { placement: 'bottom-start', content: '下方左对齐', buttonText: '下左' },
    { placement: 'bottom-center', content: '下方居中', buttonText: '下中' },
    { placement: 'bottom-end', content: '下方右对齐', buttonText: '下右' },
    { placement: 'right-start', content: '右方上对齐', buttonText: '右上' },
    { placement: 'right-center', content: '右方居中', buttonText: '右中' },
    { placement: 'right-end', content: '右方下对齐', buttonText: '右下' }
];
</script>

<style scoped>
.nue-div--grid {
    display: grid;
    width: 40rem;
    grid-template-areas:
        '. top-start top-center top-end .'
        'left-start . . . right-start'
        'left-center . . . right-center'
        'left-end . . . right-end'
        '. bottom-start bottom-center bottom-end .';
}
</style>

<template>
    <nue-div vertical>
        <nue-div align="center" divider="|">
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
        </nue-div>
        <nue-div
            vertical
            :divider="{
                text: 'NueDivider',
                borderWidth: '2px',
                borderType: 'dashed',
                borderColor: '#2f2f2f'
            }"
        >
            <nue-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </nue-text>
            <nue-text>
                Id hic ex soluta laboriosam blanditiis repudiandae nesciunt,
            </nue-text>
            <nue-text>
                aliquid obcaecati aspernatur illum alias nisi quod placeat modi
                optio nemo rem pariatur reiciendis.
            </nue-text>
        </nue-div>
    </nue-div>
</template>

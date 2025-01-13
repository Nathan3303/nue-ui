<template>
    <demo title="Divider 分割线">
        <nue-div vertical>
            <nue-div align="center">
                <nue-button>Button</nue-button>
                <nue-divider direction="vertical" />
                <nue-button>Button</nue-button>
                <nue-divider direction="vertical" />
                <nue-button>Button</nue-button>
            </nue-div>
            <nue-div vertical>
                <nue-divider
                    border-color="#34a853"
                    border-width="2px"
                    text="Lorem"
                />
                <nue-divider
                    border-type="dashed"
                    border-width="2px"
                    text="随机文字"
                />
            </nue-div>
            <nue-div
                :divider="{
                    borderType: 'dashed',
                    borderWidth: '3px',
                    borderColor: 'red'
                }"
                align="center"
            >
                <nue-button>Button</nue-button>
                <nue-button>Button</nue-button>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueButton, NueDivider } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

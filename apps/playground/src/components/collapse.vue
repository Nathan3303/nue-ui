<template>
    <demo title="基础">
        <nue-collapse>
            <nue-collapse-item name="c1" title="NueUI 组件库描述">
                <nue-text size="var(--nue-text-sm)">
                    NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                </nue-text>
            </nue-collapse-item>
        </nue-collapse>
    </demo>
    <demo title="手风琴模式">
        <nue-collapse accordion>
            <nue-collapse-item name="c1" title="NueUI 组件库描述">
                <nue-text>
                    NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                </nue-text>
            </nue-collapse-item>
            <nue-collapse-item name="c2" title="HTML（超文本标记语言）介绍">
                <nue-text>
                    HTML（超文本标记语言——HyperText Markup Language）是构成 Web
                    世界的一砖一瓦。它定义了网页内容的含义和结构。除 HTML
                    以外的其他技术则通常用来描述一个网页的表现与展示效果（如 CSS），或功能与行为（如
                    JavaScript）。
                </nue-text>
            </nue-collapse-item>
        </nue-collapse>
    </demo>
    <demo title="空内容">
        <nue-collapse>
            <nue-collapse-item name="c1" title="空折叠列表" />
        </nue-collapse>
    </demo>
    <demo title="自定义头部">
        <nue-collapse>
            <nue-collapse-item name="c1" title="折叠列表 1">
                <template #header="{ collapse, state }">
                    <nue-button
                        :icon="`arrow-${state ? 'right' : 'down'}`"
                        theme="small"
                        @click="collapse"
                    >
                        NueUI 组件库描述
                    </nue-button>
                </template>
                <nue-text size="var(--nue-text-sm)">
                    NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                </nue-text>
            </nue-collapse-item>
        </nue-collapse>
    </demo>
    <demo title="最大高度">
        <nue-collapse>
            <nue-collapse-item name="c1" title="NueUI 组件库描述" max-height="256px">
                <nue-text size="var(--nue-text-sm)">
                    NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。 NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。 NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。 NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。 NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。 NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。 NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。 NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。 NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。 NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                </nue-text>
            </nue-collapse-item>
        </nue-collapse>
    </demo>
</template>

<script lang="ts" setup>
import { NueText, NueCollapse, NueCollapseItem, NueButton } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

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
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis velit placeat nam odit eaque ratione est, perferendis expedita molestias, quo molestiae assumenda voluptatum in facere fugiat vel fugit at! Fugiat.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto eveniet excepturi dolor sequi quam atque labore, ipsum odio vel blanditiis laboriosam sit repudiandae corrupti magnam vero enim accusantium maiores officiis?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, repellat. Asperiores vitae, illo quia soluta id illum quae, omnis autem veritatis fugiat, ea minus perferendis possimus? Quod ad quos aspernatur?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aliquam minus neque maxime asperiores fugit numquam quis nam necessitatibus placeat saepe sit esse nesciunt quibusdam reprehenderit voluptate, eaque sunt consequuntur!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, corporis? Quidem veniam consequatur incidunt magnam quaerat cum, placeat hic omnis, nihil aliquid quo alias rem deserunt, laboriosam asperiores ducimus quas.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos consequatur unde esse pariatur cupiditate! Reiciendis quibusdam provident, optio facilis doloribus illo eos quidem iste culpa expedita, aspernatur, error quaerat ullam.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aliquid asperiores eius sit reiciendis earum similique voluptatum beatae vel molestiae numquam, nisi amet rem incidunt sequi tenetur id nihil assumenda.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, odio neque praesentium nobis quidem ad! Magnam, in rem? Assumenda placeat ad quo distinctio, minus esse rem. Alias laudantium nobis architecto.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, odit obcaecati a minus laborum, incidunt iure quis nobis facere illo alias hic. At officiis quas libero aperiam minima consectetur reprehenderit.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa consequatur qui amet omnis reiciendis fuga odit. Distinctio, facilis ducimus, fugit fugiat expedita nulla aperiam facere placeat perferendis molestiae sit quae.
                </nue-text>
            </nue-collapse-item>
        </nue-collapse>
    </demo>
</template>

<script lang="ts" setup>
import { NueText, NueCollapse, NueCollapseItem, NueButton } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

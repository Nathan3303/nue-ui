import { defineConfig } from 'vitepress';
import {
    componentPreview,
    containerPreview
} from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'NueUI',
    description: '一个基于 Vue3 的 UI 组件库',
    base: '/nue-ui/',
    appearance: false,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '主页', link: '/index.md' },
            { text: '教程', link: '/pages/usage/install.md' }
        ],
        sidebar: [
            {
                text: '如何使用',
                items: [
                    { text: '安装', link: '/pages/usage/install.md' },
                    { text: '使用', link: '/pages/usage/use.md' }
                ]
            },
            {
                text: 'Basic 基础组件',
                items: [
                    { text: 'Button 按钮', link: '/pages/basic/button.md' },
                    {
                        text: 'Container 布局容器',
                        link: '/pages/basic/container.md'
                    },
                    { text: '(Flex)Div 弹性盒', link: '/pages/basic/div.md' },
                    {
                        text: 'Link 链接',
                        link: '/pages/basic/link.md'
                    },
                    { text: 'Text 文本', link: '/pages/basic/text.md' },
                    { text: 'Icon 图标', link: '/pages/basic/icon.md' }
                ]
            },
            {
                text: 'Data 数据展示组件',
                items: [
                    { text: 'Avatar 头像', link: '/pages/data/avatar.md' },
                    {
                        text: 'Badge 徽标',
                        link: '/pages/data/badge.md'
                    },
                    {
                        text: 'Collapse 折叠面板',
                        link: '/pages/data/collapse.md'
                    },
                    {
                        text: 'Infinite Scroll 无限滚动',
                        link: '/pages/data/infinite-scroll.md'
                    },
                    { text: 'Marquee 跑马灯', link: '/pages/data/marquee.md' },
                    {
                        text: 'Progress 进度',
                        link: '/pages/data/progress.md'
                    },
                    { text: 'Empty 空状态', link: '/pages/data/empty.md' }
                ]
            },
            {
                text: 'Navigation 导航组件',
                items: [
                    {
                        text: 'Dropdown 下拉菜单',
                        link: '/pages/navigation/dropdown.md'
                    }
                ]
            },
            {
                text: 'Form 表单组件',
                items: [
                    { text: 'Input 输入框', link: '/pages/form/input.md' },
                    {
                        text: 'Textarea 富文本输入框',
                        link: '/pages/form/textarea.md'
                    },
                    { text: 'Select 选择器', link: '/pages/form/select.md' },
                    {
                        text: 'Switch 开关',
                        link: '/pages/form/switch.md'
                    },
                    { text: 'Checkbox 复选框', link: '/pages/form/checkbox.md' }
                ]
            },
            {
                text: 'Feedback 反馈组件',
                items: [
                    {
                        text: 'Confirm 确认框',
                        link: '/pages/feedback/confirm.md'
                    },
                    { text: 'Drawer 抽屉', link: '/pages/feedback/drawer.md' },
                    {
                        text: 'Message 消息提示',
                        link: '/pages/feedback/message.md'
                    },
                    {
                        text: 'Prompt 提示框',
                        link: '/pages/feedback/prompt.md'
                    },
                    { text: 'Tooltip 提示', link: '/pages/feedback/tooltip.md' }
                ]
            },
            {
                text: 'Others 其他组件',
                items: [
                    {
                        text: 'Divider 分割组件',
                        link: '/pages/others/divider.md'
                    }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Nathan3303/nue-ui' }
        ],
        search: {
            provider: 'local',
            options: {
                _render(src, env, md) {
                    const html = md.render(src, env);
                    if (env.frontmatter?.search === false) return '';
                    if (env.relativePath.startsWith('some/path')) return '';
                    return html;
                }
            }
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present Nathan Lee'
        }
    },
    head: [['link', { rel: 'icon', href: '/nue-ui/favicon.ico' }]],
    markdown: {
        config(md) {
            md.use(containerPreview);
            md.use(componentPreview);
        }
    }
});

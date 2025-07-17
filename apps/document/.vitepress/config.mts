import { defineConfig } from 'vitepress';
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';

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
            { text: '1.x 教程', link: '/tutorial/index.md' },
            { text: '进阶', link: '/enhance/index.md' }
        ],
        sidebar: {
            '/tutorial/': [
                {
                    text: '如何使用',
                    items: [
                        { text: '安装', link: '/tutorial/usage/install.md' },
                        { text: '使用', link: '/tutorial/usage/use.md' }
                    ]
                },
                {
                    text: 'Basic 基础组件',
                    items: [
                        {
                            text: 'Button 按钮',
                            link: '/tutorial/basic/button/index.md'
                        },
                        {
                            text: 'Container 布局容器',
                            link: '/tutorial/basic/container/index.md'
                        },
                        {
                            text: '(Flex)Div 弹性盒',
                            link: '/tutorial/basic/div/index.md'
                        },
                        { text: 'Icon 图标', link: '/tutorial/basic/icon/index.md' },
                        {
                            text: 'Link 链接',
                            link: '/tutorial/basic/link/index.md'
                        },
                        { text: 'Text 文本', link: '/tutorial/basic/text/index.md' }
                    ]
                },
                {
                    text: 'Data 数据展示组件',
                    items: [
                        {
                            text: 'Avatar 头像',
                            link: '/tutorial/data/avatar/index.md'
                        },
                        {
                            text: 'Badge 徽标',
                            link: '/tutorial/data/badge/index.md'
                        },
                        {
                            text: 'Collapse 折叠面板',
                            link: '/tutorial/data/collapse/index.md'
                        },
                        {
                            text: 'Empty 空状态',
                            link: '/tutorial/data/empty/index.md'
                        },
                        {
                            text: 'Infinite Scroll 无限滚动',
                            link: '/tutorial/data/infinite-scroll/index.md'
                        },
                        {
                            text: 'Marquee 跑马灯',
                            link: '/tutorial/data/marquee/index.md'
                        },
                        {
                            text: 'Progress 进度',
                            link: '/tutorial/data/progress/index.md'
                        }
                    ]
                },
                {
                    text: 'Feedback 反馈组件',
                    items: [
                        {
                            text: 'Confirm 确认框',
                            link: '/tutorial/feedback/confirm/index.md'
                        },
                        {
                            text: 'Drawer 抽屉',
                            link: '/tutorial/feedback/drawer/index.md'
                        },
                        {
                            text: 'Message 消息提示',
                            link: '/tutorial/feedback/message/index.md'
                        },
                        {
                            text: 'Prompt 提示框',
                            link: '/tutorial/feedback/prompt/index.md'
                        },
                        {
                            text: 'Tooltip 提示',
                            link: '/tutorial/feedback/tooltip/index.md'
                        }
                    ]
                },
                {
                    text: 'Form 表单组件',
                    items: [
                        {
                            text: 'Checkbox 复选框',
                            link: '/tutorial/form/checkbox/index.md'
                        },
                        {
                            text: 'Input 输入框',
                            link: '/tutorial/form/input/index.md'
                        },
                        {
                            text: 'Select 选择器',
                            link: '/tutorial/form/select/index.md'
                        },
                        {
                            text: 'Switch 开关',
                            link: '/tutorial/form/switch/index.md'
                        },
                        {
                            text: 'Textarea 富文本输入框',
                            link: '/tutorial/form/textarea/index.md'
                        }
                    ]
                },
                {
                    text: 'Navigation 导航组件',
                    items: [
                        {
                            text: 'Dropdown 下拉菜单',
                            link: '/tutorial/navigation/dropdown/index.md'
                        }
                    ]
                },
                {
                    text: 'Others 其他组件',
                    items: [
                        {
                            text: 'Divider 分割组件',
                            link: '/tutorial/others/divider/index.md'
                        }
                    ]
                }
            ],
            '/enhance/': [{}]
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/Nathan3303/nue-ui' }],
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
    head: [
        ['link', { rel: 'icon', href: '/nue-ui/favicon.ico' }],
        ['link', { ref: 'stylesheet', href: 'https://fonts.font.im/css?family=Poppins' }]
    ],
    markdown: {
        config(md) {
            md.use(containerPreview);
            md.use(componentPreview);
        }
    }
});

import { defineConfig } from 'vitepress';
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'NueUI',
    description: '一个基于 Vue3 的 UI 组件库',
    base: '/nue-ui/',
    appearance: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '主页', link: '/' },
            { text: '教程', link: '/tutorial', activeMatch: '/tutorial' },
            { text: '主题', link: '/theme', activeMatch: '/theme' },
            { text: '进阶', link: '/enhance', activeMatch: '/enhance' },
            { text: '技能', link: '/skill', activeMatch: '/skill' }
        ],
        sidebar: {
            '/tutorial/': [
                {
                    items: [{ text: '教程章节引入', link: '/tutorial/index.md' }]
                },
                {
                    text: '如何使用',
                    items: [
                        { text: '安装', link: '/tutorial/usage/install.md' },
                        { text: '使用', link: '/tutorial/usage/use.md' },
                        { text: '自动导入', link: '/tutorial/usage/resolver.md' }
                    ]
                },
                {
                    text: '全局特性',
                    items: [{ text: '主题属性', link: '/tutorial/features/theme/index.md' }]
                },
                {
                    text: '基础组件',
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
                    text: '数据展示组件',
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
                        },
                        {
                            text: 'Table 表格',
                            link: '/tutorial/data/table/index.md'
                        }
                    ]
                },
                {
                    text: '反馈组件',
                    items: [
                        {
                            text: 'Confirm 确认框',
                            link: '/tutorial/feedback/confirm/index.md'
                        },
                        {
                            text: 'Dialog 对话框',
                            link: '/tutorial/feedback/dialog/index.md'
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
                    text: '表单组件',
                    items: [
                        {
                            text: 'Calendar 日历',
                            link: '/tutorial/form/calendar/index.md'
                        },
                        {
                            text: 'Checkbox 复选框',
                            link: '/tutorial/form/checkbox/index.md'
                        },
                        {
                            text: 'Date Picker 日期选择器',
                            link: '/tutorial/form/date-picker/index.md'
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
                    text: '导航组件',
                    items: [
                        {
                            text: 'Dropdown 下拉菜单',
                            link: '/tutorial/navigation/dropdown/index.md'
                        }
                    ]
                },
                {
                    text: '其他组件',
                    items: [
                        {
                            text: 'Divider 分割组件',
                            link: '/tutorial/others/divider/index.md'
                        },
                        {
                            text: 'ScrollBar 滚动条',
                            link: '/tutorial/others/scroll-bar/index.md'
                        }
                    ]
                }
            ],
            '/theme/': [
                {
                    items: [{ text: '主题章节引入', link: '/theme/index.md' }]
                },
                {
                    text: '主题',
                    items: [
                        { text: '安装与引入', link: '/theme/install.md' },
                        { text: '设计系统（Design Tokens）', link: '/theme/design-tokens.md' },
                        { text: '深色模式', link: '/theme/dark-mode.md' },
                        { text: '定制主题', link: '/theme/customize.md' },
                        { text: '按需引入组件样式', link: '/theme/components-css.md' }
                    ]
                }
            ],
            '/enhance/': [
                {
                    items: [{ text: '进阶章节引入', link: '/enhance/index.md' }]
                },
                {
                    text: '反馈组件',
                    items: [{ text: '下拉列表进阶', link: '/enhance/dropdown/index.md' }]
                }
            ],
            '/skill/': [
                {
                    items: [{ text: '技能章节引入', link: '/skill/index.md' }]
                },
                {
                    text: '技能',
                    items: [
                        { text: '安装', link: '/skill/install.md' },
                        { text: 'CLI 用法', link: '/skill/cli.md' },
                        { text: '使用技能', link: '/skill/usage.md' }
                    ]
                }
            ]
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
            copyright: 'Copyright © 2026-present Nathan Lee'
        }
    },
    head: [['link', { rel: 'icon', href: '/nue-ui/favicon.ico' }]],
    markdown: {
        config(md) {
            md.use(containerPreview, { clientOnly: true });
            md.use(componentPreview, { clientOnly: true });
        }
    },
    lastUpdated: true
});
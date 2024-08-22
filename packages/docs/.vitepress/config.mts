import { defineConfig } from "vitepress";
import {
    containerPreview,
    componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "NueUI",
    description: "一个基于 Vue3 的 UI 组件库",
    base: "/nue-ui/",
    appearance: false,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "主页", link: "/index.md" },
            { text: "组件", link: "/pages/button.md" },
        ],
        sidebar: [
            {
                items: [
                    // { text: "简介", link: "/pages/introduction.md" },
                    { text: "如何使用", link: "/pages/usage.md" },
                ],
            },
            {
                text: "Basic 基础组件",
                items: [
                    { text: "Button 按钮", link: "/pages/button.md" },
                    { text: "Container 布局容器", link: "/pages/container.md" },
                    { text: "(Flex)Div 弹性盒", link: "/pages/div.md" },
                    { text: "Link 链接", link: "/pages/link.md" },
                    { text: "Text 文本", link: "/pages/text.md" },
                    { text: "Icon 图标", link: "/pages/icon.md" },
                ],
            },
            {
                text: "Data 数据展示组件",
                items: [
                    { text: "Avatar 头像", link: "/pages/avatar.md" },
                    { text: "Badge 徽标", link: "/pages/badge.md" },
                    { text: "Collapse 折叠面板", link: "/pages/collapse.md" },
                    {
                        text: "Infinite Scroll 无限滚动",
                        link: "/pages/infinite-scroll.md",
                    },
                    { text: "Marquee 跑马灯", link: "/pages/marquee.md" },
                    { text: "Progress 进度", link: "/pages/progress.md" },
                ],
            },
            {
                text: "Navigation 导航组件",
                items: [
                    { text: "Dropdown 下拉菜单", link: "/pages/dropdown.md" },
                ],
            },
            {
                text: "Form 表单组件",
                items: [
                    { text: "Input 输入框", link: "/pages/input.md" },
                    {
                        text: "Textarea 富文本输入框",
                        link: "/pages/textarea.md",
                    },
                    { text: "Select 选择器", link: "/pages/select.md" },
                    { text: "Switch 开关", link: "/pages/switch.md" },
                    { text: "Checkbox 复选框", link: "/pages/checkbox.md" },
                ],
            },
            {
                text: "Feedback 反馈组件",
                items: [
                    { text: "Confirm 确认框", link: "/pages/confirm.md" },
                    { text: "Drawer 抽屉", link: "/pages/drawer.md" },
                    { text: "Message 消息提示", link: "/pages/message.md" },
                    { text: "Prompt 提示框", link: "/pages/prompt.md" },
                ],
            },
            {
                text: "Others 其他组件",
                items: [
                    { text: "Divider 分割组件", link: "/pages/divider.md" },
                ],
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/Nathan3303/nue-ui" },
        ],
        search: {
            provider: "local",
            options: {
                _render(src, env, md) {
                    const html = md.render(src, env);
                    if (env.frontmatter?.search === false) return "";
                    if (env.relativePath.startsWith("some/path")) return "";
                    return html;
                },
            },
        },
    },
    head: [["link", { rel: "icon", href: "/nue-ui/favicon.ico" }]],
    markdown: {
        config(md) {
            md.use(containerPreview);
            md.use(componentPreview);
        },
    },
});

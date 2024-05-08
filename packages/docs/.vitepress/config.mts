import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "NueUI",
    description: "一个基于 Vue3 的 UI 组件库",
    base: "/nue-ui/",
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
                    { text: "(Flex)Div 弹性盒", link: "/pages/div.md" },
                    { text: "Link 链接", link: "/pages/link.md" },
                ],
            },
            {
                text: "Data 数据展示组件",
                items: [
                    { text: "Avatar 头像", link: "/pages/avatar.md" },
                    { text: "Badge 徽标", link: "/pages/badge.md" },
                    { text: "Collapse 折叠面板", link: "/pages/collapse.md" },
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
});

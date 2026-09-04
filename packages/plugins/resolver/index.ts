/**
 * NueUI Resolver
 * Resolver for unplugin-vue-components to auto-import NueUI components
 */

import type { ComponentResolverObject } from 'unplugin-vue-components';

/**
 * 组件名 -> 构建产物入口（dist/es/<entry>.js）映射。
 * 容器子组件（Header/Aside/Main/Content/Footer/Separator）由 container 入口统一导出；
 * Textarea 由 input 入口导出；SelectOption/BreadcrumbItem/CollapseItem 等同理。
 */
const COMPONENT_ENTRIES: Record<string, string> = {
    NueAside: 'container',
    NueAvatar: 'avatar',
    NueBadge: 'badge',
    NueBreadcrumb: 'breadcrumb',
    NueBreadcrumbItem: 'breadcrumb',
    NueButton: 'button',
    NueButtonGroup: 'button-group',
    NueCalendar: 'calendar',
    NueCheckbox: 'checkbox',
    NueCheckboxGroup: 'checkbox-group',
    NueCollapse: 'collapse',
    NueCollapseItem: 'collapse',
    NueConfirm: 'confirm',
    NueContainer: 'container',
    NueContent: 'container',
    NueDatePicker: 'date-picker',
    NueDialog: 'dialog',
    NueDiv: 'div',
    NueDivider: 'divider',
    NueDrawer: 'drawer',
    NueDropdown: 'dropdown',
    NueDropdownItem: 'dropdown',
    NueEmpty: 'empty',
    NueFooter: 'container',
    NueHeader: 'container',
    NueIcon: 'icon',
    NueInfiniteScroll: 'infinite-scroll',
    NueInput: 'input',
    NueLink: 'link',
    NueMain: 'container',
    NueMarquee: 'marquee',
    NueMessage: 'message',
    NueMessageWrapper: 'message',
    NueOverlay: 'overlay',
    NuePopupPool: 'popup-pool',
    NueProgress: 'progress',
    NuePrompt: 'prompt',
    NueScrollBar: 'scroll-bar',
    NueSelect: 'select',
    NueSelectOption: 'select',
    NueSeparator: 'container',
    NueSwitch: 'switch',
    NueTable: 'table',
    NueText: 'text',
    NueTextarea: 'input',
    NueTooltip: 'tooltip'
};

function normalizeToPascal(name: string): string {
    // If already PascalCase (starts with uppercase and has no dashes), return as-is
    if (!name.includes('-') && /^[A-Z]/.test(name)) {
        return name;
    }
    // Convert kebab-case to PascalCase
    return name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('');
}

export interface NueUiResolverOptions {
    /**
     * 组件构建产物的导入路径根目录。
     * 默认指向已发布包 nue-ui 的 ES 产物：`nue-ui/es`（按需引入：nue-ui/es/button.js）。
     * 源码模式下可传入 `@nue-ui/components`（monorepo / workspace 场景，生成 @nue-ui/components/button）。
     * @default 'nue-ui/es'
     */
    importPath?: string;
}

export function resolve(options: NueUiResolverOptions = {}): ComponentResolverObject {
    const importPath = options.importPath || 'nue-ui/es';
    // 源码模式（@nue-ui/components/xxx 目录）不追加 .js；构建产物模式（nue-ui/es/xxx.js）追加 .js
    const isSourceMode = importPath.startsWith('@nue-ui/components');

    return {
        type: 'component',
        resolve: (name: string) => {
            const pascalName = normalizeToPascal(name);

            const entry = COMPONENT_ENTRIES[pascalName];
            if (!entry) return undefined;

            return {
                from: `${importPath}/${entry}${isSourceMode ? '' : '.js'}`,
                name: pascalName
            };
        }
    };
}

// Alias for easier import: NueUiResolver
export const NueUiResolver = resolve;

export default resolve;
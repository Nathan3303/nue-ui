/**
 * NueUI Resolver
 * Resolver for unplugin-vue-components to auto-import NueUI components
 */

import type { ComponentResolver } from 'unplugin-vue-components';

const COMPONENTS = [
    'NueAvatar',
    'NueBadge',
    'NueBreadcrumb',
    'NueButton',
    'NueButtonGroup',
    'NueCheckbox',
    'NueCheckboxGroup',
    'NueCollapse',
    'NueConfirm',
    'NueContainer',
    'NueDatePicker',
    'NueDialog',
    'NueDiv',
    'NueDivider',
    'NueDrawer',
    'NueDropdown',
    'NueEmpty',
    'NueIcon',
    'NueInfiniteScroll',
    'NueInput',
    'NueLink',
    'NuePopupPool',
    'NueProgress',
    'NuePrompt',
    'NueSelect',
    'NueSwitch',
    'NueText',
    'NueTooltip',
    'NueMarquee',
    'NueMessage'
] as const;

const COMPONENT_SET = new Set<string>(COMPONENTS);

function pascalToKebab(str: string): string {
    // Strip 'Nue' prefix if present (NueButton -> button)
    const nameWithoutPrefix = str.replace(/^Nue/, '');
    return nameWithoutPrefix.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

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
    /** @default '@nue-ui/components' */
    importPath?: string;
}

export function resolve(options: NueUiResolverOptions = {}): ComponentResolver {
    const importPath = options.importPath || '@nue-ui/components';

    return {
        type: 'component',
        resolve: (name: string) => {
            const pascalName = normalizeToPascal(name);

            if (!COMPONENT_SET.has(pascalName)) {
                return undefined;
            }

            const kebabName = pascalToKebab(pascalName);

            return {
                from: `${importPath}/${kebabName}`,
                name: pascalName
            };
        }
    };
}

// Alias for easier import: NueUiResolver
export const NueUiResolver = resolve;

export default resolve;

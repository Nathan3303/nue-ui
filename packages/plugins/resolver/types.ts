/**
 * NueUI Resolver Types
 * Type definitions for unplugin-vue-components resolver
 */

import type { ComponentResolver } from 'unplugin-vue-components';

export interface NueUiResolverOptions {
    /**
     * Import path for NueUI components
     * @default '@nue-ui/components'
     */
    importPath?: string;
}

export type { ComponentResolver };
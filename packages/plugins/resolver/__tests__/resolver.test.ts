import { describe, expect, it } from 'vite-plus/test';
import { resolve, NueUiResolver } from '../index';

describe('NueUiResolver', () => {
    it('exposes NueUiResolver as alias of resolve', () => {
        expect(NueUiResolver).toBe(resolve);
    });

    describe('dist 模式（默认，面向已发布包 nue-ui）', () => {
        const resolver = resolve();

        it('生成 nue-ui/es/<entry>.js 精确导入路径', () => {
            expect(resolver.resolve('NueButton')).toEqual({
                from: 'nue-ui/es/button.js',
                name: 'NueButton'
            });
            expect(resolver.resolve('NueConfirm')).toEqual({
                from: 'nue-ui/es/confirm.js',
                name: 'NueConfirm'
            });
            expect(resolver.resolve('NueMessage')).toEqual({
                from: 'nue-ui/es/message.js',
                name: 'NueMessage'
            });
        });

        it('支持 kebab-case 组件名', () => {
            expect(resolver.resolve('nue-button')).toEqual({
                from: 'nue-ui/es/button.js',
                name: 'NueButton'
            });
        });

        it('容器子组件统一指向 container 入口', () => {
            for (const name of [
                'NueHeader',
                'NueAside',
                'NueMain',
                'NueContent',
                'NueFooter',
                'NueSeparator'
            ]) {
                expect(resolver.resolve(name)).toEqual({
                    from: 'nue-ui/es/container.js',
                    name
                });
            }
        });

        it('子组件指向其所属入口（textarea -> input 等）', () => {
            expect(resolver.resolve('NueTextarea')).toEqual({
                from: 'nue-ui/es/input.js',
                name: 'NueTextarea'
            });
            expect(resolver.resolve('NueSelectOption')).toEqual({
                from: 'nue-ui/es/select.js',
                name: 'NueSelectOption'
            });
            expect(resolver.resolve('NueBreadcrumbItem')).toEqual({
                from: 'nue-ui/es/breadcrumb.js',
                name: 'NueBreadcrumbItem'
            });
            expect(resolver.resolve('NueCollapseItem')).toEqual({
                from: 'nue-ui/es/collapse.js',
                name: 'NueCollapseItem'
            });
            expect(resolver.resolve('NueScrollBar')).toEqual({
                from: 'nue-ui/es/scroll-bar.js',
                name: 'NueScrollBar'
            });
            expect(resolver.resolve('NueMessageWrapper')).toEqual({
                from: 'nue-ui/es/message.js',
                name: 'NueMessageWrapper'
            });
        });

        it('未知组件返回 undefined', () => {
            expect(resolver.resolve('NueUnknown')).toBeUndefined();
            expect(resolver.resolve('ElButton')).toBeUndefined();
        });
    });

    describe('源码模式（monorepo / workspace 场景）', () => {
        const resolver = resolve({ importPath: '@nue-ui/components' });

        it('生成 @nue-ui/components/<entry> 目录导入路径（不追加 .js）', () => {
            expect(resolver.resolve('NueButton')).toEqual({
                from: '@nue-ui/components/button',
                name: 'NueButton'
            });
            expect(resolver.resolve('NueHeader')).toEqual({
                from: '@nue-ui/components/container',
                name: 'NueHeader'
            });
        });
    });

    describe('自定义 importPath', () => {
        it('遵循自定义路径', () => {
            const resolver = resolve({ importPath: '@my-custom-path/es' });
            expect(resolver.resolve('NueButton')).toEqual({
                from: '@my-custom-path/es/button.js',
                name: 'NueButton'
            });
        });
    });
});
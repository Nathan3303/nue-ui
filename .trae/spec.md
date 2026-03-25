# NueUI 组件测试代码编写规范

## 1. 项目背景

NueUI 是一个基于 Vue 3 + TypeScript 的组件库，包含 30+ 个组件。项目已安装 Vitest (3.0.5) 作为测试框架，但尚未配置测试环境和编写测试代码。

## 2. 技术栈

- **测试框架**: Vitest 3.0.5
- **Vue 测试工具**: @vue/test-utils
- **DOM 环境**: jsdom
- **断言库**: Vitest 内置 + @testing-library/jest-dom
- **用户交互模拟**: @testing-library/user-event
- **包管理器**: pnpm

## 3. 测试环境配置

### 3.1 依赖安装

在项目根目录安装以下依赖：

```bash
pnpm add -D -w @vue/test-utils jsdom @testing-library/vue @testing-library/jest-dom @testing-library/user-event @vitest/coverage-v8
```

### 3.2 Vitest 配置文件

在项目根目录创建 `vitest.config.ts`：

```typescript
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./test-setup.ts'],
        include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
        exclude: ['node_modules/', 'dist/', '.vitepress/', 'apps/histoire/'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            exclude: [
                'node_modules/',
                'apps/',
                'dist/',
                '**/*.d.ts',
                '**/*.test.ts',
                '**/*.test.tsx',
                '**/*.spec.ts',
                '**/*.spec.tsx',
                '**/types.ts',
                '**/constants.ts',
                '**/index.ts',
                '**/utils.ts',
                'test-setup.ts',
                'vitest.config.ts'
            ]
        }
    },
    resolve: {
        alias: {
            '@nue-ui/components': resolve(__dirname, './packages/components'),
            '@nue-ui/hooks': resolve(__dirname, './packages/hooks'),
            '@nue-ui/utils': resolve(__dirname, './packages/core/utils.ts')
        }
    }
});
```

### 3.3 测试设置文件

在项目根目录创建 `test-setup.ts`：

```typescript
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    }))
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
}));

// Mock getComputedStyle
window.getComputedStyle = vi.fn(() => ({
    getPropertyValue: vi.fn(() => ''),
    removeProperty: vi.fn(),
    setProperty: vi.fn()
}));
```

### 3.4 更新 package.json 脚本

在项目根目录的 `package.json` 中添加以下脚本：

```json
{
    "scripts": {
        "test": "vitest",
        "test:ui": "vitest --ui",
        "test:run": "vitest run",
        "test:coverage": "vitest run --coverage"
    }
}
```

## 4. 测试文件组织结构

### 4.1 目录结构

```text
packages/components/
├── button/
│   ├── button.vue
│   ├── index.ts
│   ├── types.ts
│   └── __tests__/
│       ├── button.test.ts
│       └── button.props.test.ts
├── checkbox/
│   ├── checkbox.vue
│   ├── index.ts
│   ├── types.ts
│   └── __tests__/
│       ├── checkbox.test.ts
│       └── checkbox.group.test.ts
└── ...
```

### 4.2 测试文件命名规范

- 单元测试：`组件名.test.ts`
- Props 专项测试：`组件名.props.test.ts`
- 集成测试：`组件名.integration.test.ts`
- 命令式组件测试：`组件名.caller.test.ts`

## 5. 测试工具函数

创建 `test-utils.ts` 文件在项目根目录：

```typescript
import { mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';

export async function waitFor(condition: () => boolean, timeout = 1000) {
    const start = Date.now();
    while (!condition()) {
        if (Date.now() - start > timeout) {
            throw new Error('Timeout waiting for condition');
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}

export async function flushPromises() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

export function getComponentWrapper<T extends ComponentPublicInstance>(
    wrapper: VueWrapper,
    selector: string
): VueWrapper<T> {
    return wrapper.findComponent(selector) as VueWrapper<T>;
}

export async function nextTick() {
    return new Promise(resolve => setTimeout(resolve, 0));
}
```

## 6. 测试编写规范

### 6.1 测试组织结构

每个测试文件应按以下结构组织：

```typescript
describe('组件名称', () => {
    describe('功能模块1', () => {
        it('应该...', () => {});
    });

    describe('功能模块2', () => {
        it('应该...', () => {});
    });
});
```

### 6.2 测试断言原则

- 每个测试只验证一个行为
- 使用具体的断言，避免过于宽泛
- 测试应该独立，不依赖其他测试
- 使用有意义的测试描述

### 6.3 异步测试

```typescript
it('应该正确处理异步操作', async () => {
    const wrapper = mount(Component);
    await wrapper.find('button').trigger('click');
    await nextTick();
    expect(wrapper.emitted('done')).toBeTruthy();
});
```

### 6.4 Mock 和 Stub

```typescript
// Mock 外部依赖
vi.mock('@nue-ui/utils', () => ({
    parseTheme: vi.fn(() => ['theme-primary']),
    throttle: vi.fn(fn => fn)
}));

// Stub 子组件
const wrapper = mount(Component, {
    global: {
        stubs: {
            'nue-icon': true
        }
    }
});
```

## 7. 组件测试策略

### 7.1 基础交互组件（Button, Link, Icon, Text）

**测试重点：**

- Props 渲染正确性
- 事件触发（click, hover 等）
- 禁用状态
- 加载状态
- 样式类名生成

**必须测试的场景：**

- 默认渲染
- 不同尺寸（small, large）
- 不同主题（primary, success, warning, danger, ghost, icon）
- 禁用状态
- 加载状态
- 图标渲染
- 事件触发
- 节流功能（Button）

### 7.2 表单组件（Input, Checkbox, Switch, Select, Textarea）

**测试重点：**

- v-model 双向绑定
- 输入验证
- 禁用/只读状态
- 清除功能
- 字符计数
- 防抖功能
- 选项选择

**必须测试的场景：**

- modelValue 绑定
- update:modelValue 事件
- 输入变化
- 中文输入法支持
- maxlength 限制
- 清除功能
- 密码显示切换
- 防抖功能
- 禁用/只读状态

### 7.3 数据展示组件（Avatar, Badge, Empty, Progress, Collapse）

**测试重点：**

- 数据渲染
- 样式变化
- 展开/折叠状态
- 动画效果（如需要）
- 响应式行为

**必须测试的场景：**

- 默认渲染
- 数据显示
- 样式变化
- 展开/折叠（Collapse）
- 最大值限制（Badge）
- 进度显示（Progress）

### 7.4 反馈组件（Dialog, Drawer, Message, Tooltip, Confirm, Prompt）

**测试重点：**

- 显示/隐藏逻辑
- 动画生命周期
- 事件触发（beforeOpen, afterOpen, beforeClose, afterClose）
- 位置计算
- 遮罩层行为
- 命令式调用

**必须测试的场景：**

- 显示/隐藏
- 生命周期事件
- 关闭功能
- 插槽渲染
- 命令式调用（Message, Confirm, Prompt）
- 自动关闭
- 多实例管理

### 7.5 导航组件（Breadcrumb, Dropdown）

**测试重点：**

- 导航项渲染
- 点击事件
- 展开/折叠
- 嵌套菜单
- 位置计算

**必须测试的场景：**

- 默认渲染
- 导航项显示
- 点击事件
- 展开/折叠
- 嵌套菜单（Dropdown）

### 7.6 命令式组件（Message, Confirm, Prompt）

**测试重点：**

- 命令式调用
- 自动关闭
- 多实例管理
- 类型变体

**必须测试的场景：**

- 基础调用
- 类型变体（success, error, warning, info）
- 自动关闭
- 多实例
- 自定义图标和时长

### 7.7 复合组件（CheckboxGroup, ButtonGroup, Collapse, Select）

**测试重点：**

- 组件间通信（provide/inject）
- 组合行为
- 受控/非受控模式
- 批量操作

**必须测试的场景：**

- v-model 绑定
- 组件间通信
- 禁用状态
- 最小/最大选择限制（CheckboxGroup）
- 组合行为

## 8. 测试覆盖率目标

### 8.1 总体目标

- **语句覆盖率（Statements）**: ≥ 80%
- **分支覆盖率（Branches）**: ≥ 75%
- **函数覆盖率（Functions）**: ≥ 80%
- **行覆盖率（Lines）**: ≥ 80%

### 8.2 优先级分类

- **P0（核心组件）**: 覆盖率 ≥ 90%
    - Button, Input, Checkbox, Select, Dialog
- **P1（常用组件）**: 覆盖率 ≥ 80%
    - Switch, Textarea, Badge, Avatar, Message, Tooltip, Drawer, Dropdown
- **P2（辅助组件）**: 覆盖率 ≥ 70%
    - Link, Icon, Text, Divider, Empty, Progress, Collapse, Breadcrumb, Marquee, InfiniteScroll, Container, DatePicker

## 9. 测试最佳实践

1. **避免测试实现细节**：测试组件的公共 API，而不是内部实现
2. **保持测试简单**：复杂的测试难以维护
3. **使用快照测试谨慎**：快照测试容易误报
4. **测试边界情况**：空值、null、undefined、极端值
5. **性能考虑**：避免不必要的 DOM 操作
6. **定期维护**：随着组件更新，及时更新测试
7. **文档化**：为复杂的测试添加注释说明

## 10. CI/CD 集成

在 `.github/workflows/test.yml` 中配置：

```yaml
name: Test

on: [push, pull_request]

jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: pnpm/action-setup@v2
              with:
                  version: 8
            - uses: actions/setup-node@v3
              with:
                  node-version: 18
                  cache: 'pnpm'
            - run: pnpm install
            - run: pnpm test:run
            - run: pnpm test:coverage
            - uses: codecov/codecov-action@v3
```

## 11. 注意事项

1. **测试独立性**：每个测试应该独立运行，不依赖其他测试
2. **清理工作**：使用 afterEach 清理测试副作用
3. **Mock 适当**：只 mock 必要的外部依赖
4. **错误处理**：测试错误场景和异常情况
5. **可读性**：使用清晰的测试名称和描述
6. **维护性**：定期更新测试以匹配组件变化

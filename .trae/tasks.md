# NueUI 组件测试代码编写任务清单

## 阶段 1：基础设施搭建

### 任务 1.1：安装测试依赖

- [ ] 安装 @vue/test-utils
- [ ] 安装 jsdom
- [ ] 安装 @testing-library/vue
- [ ] 安装 @testing-library/jest-dom
- [ ] 安装 @testing-library/user-event
- [ ] 安装 @vitest/coverage-v8

### 任务 1.2：创建 Vitest 配置文件

- [ ] 创建 vitest.config.ts
- [ ] 配置测试环境（jsdom）
- [ ] 配置路径别名
- [ ] 配置覆盖率设置
- [ ] 配置测试文件匹配规则

### 任务 1.3：创建测试设置文件

- [ ] 创建 test-setup.ts
- [ ] Mock ResizeObserver
- [ ] Mock window.matchMedia
- [ ] Mock IntersectionObserver
- [ ] Mock getComputedStyle

### 任务 1.4：更新 package.json 脚本

- [ ] 添加 test 脚本
- [ ] 添加 test:ui 脚本
- [ ] 添加 test:run 脚本
- [ ] 添加 test:coverage 脚本

### 任务 1.5：创建测试工具函数

- [ ] 创建 test-utils.ts
- [ ] 实现 waitFor 函数
- [ ] 实现 flushPromises 函数
- [ ] 实现 getComponentWrapper 函数
- [ ] 实现 nextTick 函数

## 阶段 2：核心组件测试（P0）

### 任务 2.1：Button 组件测试

- [ ] 创建 button/**tests**/ 目录
- [ ] 编写 button.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试不同尺寸（small, large）
    - [ ] 测试不同主题（primary, success, warning, danger, ghost, icon）
    - [ ] 测试禁用状态
    - [ ] 测试加载状态
    - [ ] 测试图标渲染
    - [ ] 测试事件触发
    - [ ] 测试节流功能
    - [ ] 测试插槽渲染
    - [ ] 测试 ButtonGroup 集成

### 任务 2.2：Input 组件测试

- [ ] 创建 input/**tests**/ 目录
- [ ] 编写 input.test.ts
    - [ ] 测试 v-model 双向绑定
    - [ ] 测试输入变化
    - [ ] 测试中文输入法支持
    - [ ] 测试 maxlength 限制
    - [ ] 测试清除功能
    - [ ] 测试密码显示切换
    - [ ] 测试防抖功能
    - [ ] 测试禁用/只读状态
    - [ ] 测试字符计数
    - [ ] 测试不同尺寸和形状

### 任务 2.3：Checkbox 组件测试

- [ ] 创建 checkbox/**tests**/ 目录
    - [ ] 测试 v-model 双向绑定
    - [ ] 测试选中状态
    - [ ] 测试禁用状态
    - [ ] 测试加载状态
    - [ ] 测试半选状态
    - [ ] 测试 beforeCheck 钩子
    - [ ] 测试事件触发（change, checked, unchecked）
    - [ ] 测试不同尺寸

### 任务 2.4：Checkbox 组件集成测试

- [ ] 编写 checkbox.group.test.ts
    - [ ] 测试 CheckboxGroup v-model 绑定
    - [ ] 测试组件间通信
    - [ ] 测试禁用状态
    - [ ] 测试最小/最大选择限制
    - [ ] 测试主题和尺寸继承

### 任务 2.5：Select 组件测试

- [ ] 创建 select/**tests**/ 目录
- [ ] 编写 select.test.ts
    - [ ] 测试 v-model 双向绑定
    - [ ] 测试选项渲染
    - [ ] 测试选项选择
    - [ ] 测试清除功能
    - [ ] 测试禁用状态
    - [ ] 测试占位符
    - [ ] 测试插槽渲染
    - [ ] 测试事件触发（change）

### 任务 2.6：Dialog 组件测试

- [ ] 创建 dialog/**tests**/ 目录
- [ ] 编写 dialog.test.ts
    - [ ] 测试显示/隐藏
    - [ ] 测试生命周期事件（beforeOpen, afterOpen, beforeClose, afterClose）
    - [ ] 测试关闭功能
    - [ ] 测试插槽渲染（header, content, footer）
    - [ ] 测试标题显示
    - [ ] 测试遮罩层行为
    - [ ] 测试 ESC 键关闭
    - [ ] 测试主题切换

## 阶段 3：常用组件测试（P1）

### 任务 3.1：Switch 组件测试

- [ ] 创建 switch/**tests**/ 目录
- [ ] 编写 switch.test.ts
    - [ ] 测试 v-model 双向绑定
    - [ ] 测试开关状态
    - [ ] 测试禁用状态
    - [ ] 测试加载状态
    - [ ] 测试不同尺寸
    - [ ] 测试状态文本

### 任务 3.2：Textarea 组件测试

- [ ] 创建 textarea/**tests**/ 目录
- [ ] 编写 textarea.test.ts
    - [ ] 测试 v-model 双向绑定
    - [ ] 测试输入变化
    - [ ] 测试 maxlength 限制
    - [ ] 测试字符计数
    - [ ] 测试清除功能
    - [ ] 测试自动调整大小
    - [ ] 测试禁用/只读状态
    - [ ] 测试防抖功能

### 任务 3.3：Badge 组件测试

- [ ] 创建 badge/**tests**/ 目录
- [ ] 编写 badge.test.ts
    - [ ] 测试数值显示
    - [ ] 测试点状徽标
    - [ ] 测试隐藏功能
    - [ ] 测试最大值限制
    - [ ] 测试插槽渲染
    - [ ] 测试不同主题

### 任务 3.4：Avatar 组件测试

- [ ] 创建 avatar/**tests**/ 目录
- [ ] 编写 avatar.test.ts
    - [ ] 测试图片渲染
    - [ ] 测试文本渲染
    - [ ] 测试图标渲染
    - [ ] 测试不同尺寸
    - [ ] 测试图片适应方式
    - [ ] 测试插槽渲染

### 任务 3.5：Message 组件测试

- [ ] 创建 message/**tests**/ 目录
- [ ] 编写 message.caller.test.ts
    - [ ] 测试基础调用
    - [ ] 测试类型变体（success, error, warning, info, log）
    - [ ] 测试自动关闭
    - [ ] 测试多实例管理
    - [ ] 测试自定义图标和时长
    - [ ] 测试消息内容显示
    - [ ] 测试容器管理

### 任务 3.6：Tooltip 组件测试

- [ ] 创建 tooltip/**tests**/ 目录
- [ ] 编写 tooltip.test.ts
    - [ ] 测试显示/隐藏
    - [ ] 测试内容渲染
    - [ ] 测试不同尺寸
    - [ ] 测试不同主题
    - [ ] 测试插槽渲染
    - [ ] 测试位置计算

### 任务 3.7：Drawer 组件测试

- [ ] 创建 drawer/**tests**/ 目录
- [ ] 编写 drawer.test.ts
    - [ ] 测试显示/隐藏
    - [ ] 测试生命周期事件
    - [ ] 测试关闭功能
    - [ ] 测试插槽渲染
    - [ ] 测试标题显示
    - [ ] 测试不同打开方向
    - [ ] 测试遮罩层行为

### 任务 3.8：Dropdown 组件测试

- [ ] 创建 dropdown/**tests**/ 目录
- [ ] 编写 dropdown.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试展开/折叠
    - [ ] 测试选项渲染
    - [ ] 测试选项点击
    - [ ] 测试禁用状态
    - [ ] 测试插槽渲染
    - [ ] 测试嵌套菜单
    - [ ] 测试不同尺寸

## 阶段 4：辅助组件测试（P2）

### 任务 4.1：Link 组件测试

- [ ] 创建 link/**tests**/ 目录
- [ ] 编写 link.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试禁用状态
    - [ ] 测试图标渲染
    - [ ] 测试下划线样式
    - [ ] 测试路由跳转
    - [ ] 测试 target 属性

### 任务 4.2：Icon 组件测试

- [ ] 创建 icon/**tests**/ 目录
- [ ] 编写 icon.test.ts
    - [ ] 测试图标渲染
    - [ ] 测试不同尺寸
    - [ ] 测试不同颜色
    - [ ] 测试旋转动画

### 任务 4.3：Text 组件测试

- [ ] 创建 text/**tests**/ 目录
- [ ] 编写 text.test.ts
    - [ ] 测试文本渲染
    - [ ] 测试对齐方式
    - [ ] 测试不同尺寸
    - [ ] 测试不同颜色
    - [ ] 测试文本装饰
    - [ ] 测试文本粗细
    - [ ] 测试标签样式

### 任务 4.4：Divider 组件测试

- [ ] 创建 divider/**tests**/ 目录
- [ ] 编写 divider.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试文本内容
    - [ ] 测试不同方向（水平/垂直）
    - [ ] 测试不同类型
    - [ ] 测试不同颜色

### 任务 4.5：Empty 组件测试

- [ ] 创建 empty/**tests**/ 目录
- [ ] 编写 empty.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试描述文本
    - [ ] 测试自定义图片
    - [ ] 测试图片尺寸
    - [ ] 测试插槽渲染

### 任务 4.6：Progress 组件测试

- [ ] 创建 progress/**tests**/ 目录
- [ ] 编写 progress.test.ts
    - [ ] 测试进度显示
    - [ ] 测试不同类型
    - [ ] 测试不同颜色
    - [ ] 测试文字显示
    - [ ] 测试内部文字
    - [ ] 测试条纹宽度
    - [ ] 测试百分比计算

### 任务 4.7：Collapse 组件测试

- [ ] 创建 collapse/**tests**/ 目录
- [ ] 编写 collapse.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试展开/折叠
    - [ ] 测试手风琴模式
    - [ ] 测试 v-model 绑定
    - [ ] 测试插槽渲染
    - [ ] 测试最小/最大高度

### 任务 4.8：Breadcrumb 组件测试

- [ ] 创建 breadcrumb/**tests**/ 目录
- [ ] 编写 breadcrumb.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试导航项渲染
    - [ ] 测试分隔符
    - [ ] 测试插槽渲染

### 任务 4.9：Marquee 组件测试

- [ ] 创建 marquee/**tests**/ 目录
- [ ] 编写 marquee.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试无限滚动
    - [ ] 测试速度比例
    - [ ] 测试插槽渲染

### 任务 4.10：InfiniteScroll 组件测试

- [ ] 创建 infinite-scroll/**tests**/ 目录
- [ ] 编写 infinite-scroll.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试加载更多
    - [ ] 测试禁用加载
    - [ ] 测试触发高度

### 任务 4.11：Container 组件测试

- [ ] 创建 container/**tests**/ 目录
- [ ] 编写 container.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试嵌套布局
    - [ ] 测试插槽渲染（header, aside, main, footer）
    - [ ] 测试分隔符

### 任务 4.12：DatePicker 组件测试

- [ ] 创建 date-picker/**tests**/ 目录
- [ ] 编写 date-picker.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试日期选择
    - [ ] 测试日期范围选择
    - [ ] 测试清除功能
    - [ ] 测试禁用状态
    - [ ] 测试生命周期事件

## 阶段 5：命令式组件测试

### 任务 5.1：Confirm 组件测试

- [ ] 创建 confirm/**tests**/ 目录
- [ ] 编写 confirm.caller.test.ts
    - [ ] 测试基础调用
    - [ ] 测试确认/取消操作
    - [ ] 测试自定义标题和内容
    - [ ] 测试自定义按钮文本
    - [ ] 测试主题切换
    - [ ] 测试动画效果

### 任务 5.2：Prompt 组件测试

- [ ] 创建 prompt/**tests**/ 目录
- [ ] 编写 prompt.caller.test.ts
    - [ ] 测试基础调用
    - [ ] 测试输入类型
    - [ ] 测试验证器
    - [ ] 测试确认/取消操作
    - [ ] 测试自定义标题和内容
    - [ ] 测试自定义按钮文本

## 阶段 6：其他组件测试

### 任务 6.1：ButtonGroup 组件测试

- [ ] 创建 button-group/**tests**/ 目录
- [ ] 编写 button-group.test.ts
    - [ ] 测试默认渲染
    - [ ] 测试尺寸继承
    - [ ] 测试禁用状态
    - [ ] 测试插槽渲染

### 任务 6.2：Overlay 组件测试

- [ ] 创建 overlay/**tests**/ 目录
- [ ] 编写 overlay.test.ts
    - [ ] 测试显示/隐藏
    - [ ] 测试主题切换
    - [ ] 测试 ESC 键事件

### 任务 6.3：PopupPool 组件测试

- [ ] 创建 popup-pool/**tests**/ 目录
- [ ] 编写 popup-pool.test.ts
    - [ ] 测试弹出池管理
    - [ ] 测试弹出/关闭
    - [ ] 测试层级管理

## 阶段 7：测试优化和文档

### 任务 7.1：提升测试覆盖率

- [ ] 运行测试覆盖率报告
- [ ] 分析未覆盖代码
- [ ] 补充缺失的测试用例
- [ ] 确保达到覆盖率目标

### 任务 7.2：优化测试性能

- [ ] 识别慢速测试
- [ ] 优化测试执行时间
- [ ] 减少不必要的 DOM 操作
- [ ] 优化 Mock 设置

### 任务 7.3：编写测试文档

- [ ] 创建测试指南文档
- [ ] 编写测试最佳实践
- [ ] 添加测试示例
- [ ] 更新 README

### 任务 7.4：配置 CI/CD

- [ ] 创建 GitHub Actions 工作流
- [ ] 配置测试运行
- [ ] 配置覆盖率报告
- [ ] 配置 Codecov 集成

## 阶段 8：验证和交付

### 任务 8.1：运行所有测试

- [ ] 运行完整测试套件
- [ ] 确保所有测试通过
- [ ] 检查测试覆盖率
- [ ] 修复失败的测试

### 任务 8.2：代码审查

- [ ] 审查测试代码质量
- [ ] 检查测试覆盖率
- [ ] 确保测试可维护性
- [ ] 验证测试有效性

### 任务 8.3：文档完善

- [ ] 更新项目文档
- [ ] 添加测试说明
- [ ] 编写贡献指南
- [ ] 更新 CHANGELOG

### 任务 8.4：最终验证

- [ ] 运行测试覆盖率报告
- [ ] 确认所有目标达成
- [ ] 验证 CI/CD 流程
- [ ] 准备发布

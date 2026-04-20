# DatePicker 组件 ISO 时间格式支持计划

## 目标
为 DatePicker 组件增加对 ISO 时间格式的解析和处理能力，同时保持对现有格式的兼容。

## 需要修改的文件
1. `packages/components/date-picker/utils/date-utils.ts` - 日期工具函数
2. `packages/components/date-picker/date-picker-panel.vue` - 日期选择面板
3. `packages/components/date-picker/__tests__/date-picker.test.ts` - 测试文件（可选）

## 实现步骤

### 1. 增强 `parseDate` 函数 (date-utils.ts)
- 扩展正则表达式，支持多种 ISO 格式
- 解析 ISO 格式字符串为 Date 对象
- 保持对现有 `YYYY-MM-DD` 格式的支持

### 2. 增强 `parseDateTime` 函数 (date-picker-panel.vue)
- 增强日期时间解析逻辑，支持 ISO 格式
- 处理带 `T` 分隔符的 ISO 格式
- 处理时区（可选，主要提取本地时间）

### 3. 增强 `formatDateTime` 函数 (date-picker-panel.vue)
- 保持输出格式为现有格式（`YYYY-MM-DD` 或 `YYYY-MM-DD HH:mm`）
- 确保内部状态正确管理

### 4. 更新测试用例 (可选)
- 添加 ISO 格式的测试用例

## 支持的 ISO 格式
- `YYYY-MM-DD` (现有)
- `YYYY-MM-DDTHH:mm:ss`
- `YYYY-MM-DDTHH:mm:ssZ`
- `YYYY-MM-DDTHH:mm:ss.SSSZ`
- `YYYY-MM-DDTHH:mm` (简版)

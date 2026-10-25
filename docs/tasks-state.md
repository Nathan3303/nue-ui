# 任务状态（接续快照）

> 重开会话先读本文件。更新时间：2026-10-25（**已发布交付**） · 批次：Glass 主题包 v0.1.0

## 交付状态：**已完成并发布**

| 项      | 内容                                                                                                                                                                                                             |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 包      | `nue-ui-theme-glass@0.1.0` — **已发布到 npm**（`latest`）                                                                                                                                                        |
| 安装    | `pnpm add nue-ui-theme-glass` → `import 'nue-ui-theme-glass/dist/index.css'`                                                                                                                                     |
| Issue   | [#75](https://github.com/Nathan3303/nue-ui/issues/75) / [#77](https://github.com/Nathan3303/nue-ui/issues/77) / [#79](https://github.com/Nathan3303/nue-ui/issues/79) — 全部 CLOSED                              |
| PR      | [#76](https://github.com/Nathan3303/nue-ui/pull/76)（主题包）· [#78](https://github.com/Nathan3303/nue-ui/pull/78)（阴影裁剪）· [#80](https://github.com/Nathan3303/nue-ui/pull/80)（content 裁剪）— 全部 MERGED |
| master  | `26c8faeb`                                                                                                                                                                                                       |
| tag     | `glass-theme-v0.1.0` → `c8874db8`（annotated，peeled 已核）                                                                                                                                                      |
| Release | https://github.com/Nathan3303/nue-ui/releases/tag/glass-theme-v0.1.0                                                                                                                                             |
| 包内容  | **44 文件 / 111,096 B** unpacked（仅 dist 41 CSS + README + LICENSE + package.json）                                                                                                                             |

### 发布验证（从 registry 下载 tarball 反向核对）

| 检查                        | 结果                                   |
| --------------------------- | -------------------------------------- |
| `npm view version`          | `0.1.0` · `dist-tags.latest = 0.1.0`   |
| 包内 `--nue-primary-shadow` | `0 4px 12px` ✅（#77 修复生效）        |
| 包内 `--nue-glass-shadow`   | `0 12px 32px` ✅                       |
| 包内 `.nue-content`         | `overflow: visible` ✅（#79 修复生效） |
| 包内 `backdrop-filter`      | **7 条** ✅                            |
| 文件数                      | 44 ✅                                  |

## 三轮交付内容

| 轮次 | 内容                                                                                                                        |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
| #76  | 主题包本体：34 组件 CSS、亮/暗双套、浮层玻璃 + 数据区实底、三条退化路径、6 个 `--nue-glass-*`                               |
| #78  | 阴影裁剪修复：`backdrop-filter` 纹理边界（阴影收敛 + 面板 padding 1.25rem）+ container 的 header/main/footer 放行 `visible` |
| #80  | content 裁剪修复：`.nue-content` 不再作滚动容器 + playground 页面级滚动 + **契约变更写入 README**                           |

## 契约变更（消费方必读）

**`.nue-content` 不再是滚动容器**，长内容的滚动职责上移到使用方（页面级滚动或自建滚动区）。原因：滚动容器会裁掉超出 padding box 的绘制，内部元素阴影无法完整显示。

已落 `packages/themes/glass/README.md`「使用注意：全屏布局的滚动职责」，发布说明也单列一节。

## 最终门禁

- `36 文件 / 645 例 / 0 红`（glass 套件 287 例）
- 对比度 148 组 + 退化态 64 组 + A1–A11 + S1–S8
- 结构：backdrop **7** · 定义名 **424** = 418+6 · 悬空 **0** · 退化 **3×3** · imports **34** · glass 变量 **6**
- 体积：dist **102,996 B** · gzip **13,168 B** · 单文件最大 **9,547 B**（`variables.css`，余 **453 B**）
- 每组断言带防假绿自证（含变异自证：把正确值改坏，断言必须变红）

## 合并后固化的四条边界（勿当 bug 修）

1. **暗色深文本档由三级压到两级**（700/800/900 → ≈secondary / 800+）：玻璃最坏背景压窄对比带的必然结果
2. **`dist/global/variables.css` 距单文件上限仅 453 B**：新增全局 token 会先撞线，优先落组件层局部变量
3. **门禁测试读 `dist/`**：CI 中 glass 构建必须前置于 `Run tests`（`4846039a`）
4. **`content` 不作滚动容器**：S6 断言会拦「把滚动职责偷偷塞回 content」

## 环境坑备忘

| 坑                                                                              | 应对                                                                                 |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 根目录任何 `npm` 命令被 `devEngines.packageManager=pnpm` 拦（`EBADDEVENGINES`） | `env -C /tmp npm …`，或在该包目录（有自己的 `package.json`）执行                     |
| 根 `.npmrc` 的 registry 指向 npmmirror（只读镜像）                              | glass 包已加 `publishConfig.registry = npmjs`                                        |
| 本机 `github.com:22` 超时                                                       | `git -c core.sshCommand='ssh -p 443 -o HostName=ssh.github.com'`（一次性，勿落配置） |
| pnpm 11 每次跑脚本前自动同步 lockfile                                           | 跑完 `git status pnpm-lock.yaml`，脏了 `git checkout --`                             |
| 同 cwd 多会话并发 git 操作                                                      | **index 是全局资源**，必须串行；「文件不重叠」≠「index 不冲突」                      |
| `.vite-hooks/pre-commit` 的 `M`                                                 | 他人本地改动，全程未纳入任何提交                                                     |

## 后续可选（未做，按需另立）

- playground 的 header / aside 加 `position: sticky`（P1 后它们随页面滚动，演示站导航体验略降；不涉主题契约）
- 结构分离方案：外层承载 `backdrop-filter` + 阴影、内层承载内容（彻底解决滤镜裁剪，需改组件 SFC）
- 非 teleport 渲染的浮层仍可能被自有 `overflow: hidden` 裁（浏览器语义，README 已注明）
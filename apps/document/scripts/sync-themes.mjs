/**
 * 把两套主题包的**构建产物**同步到文档站静态资源目录。
 *
 * 为什么不直接 `import '.../dist/index.css'`：两份主题都作用在 `:root` / `.nue-*`，
 * 只能留一份，而打包进 vitepress CSS bundle 后运行时无法单独移除（Issue #83）。
 *
 * 产物位置：`apps/document/public/themes/<slug>/`（整棵 dist 复制，保留相对 @import）。
 * 该目录是生成物，已在 `apps/document/public/.gitignore` 中忽略。
 */
import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDir, '..');
const repoRoot = resolve(appRoot, '../..');
const publicThemesDir = resolve(appRoot, 'public/themes');

const THEMES = [
    { slug: 'shadlike', packageName: 'nue-ui-theme-shadlike' },
    { slug: 'glass', packageName: 'nue-ui-theme-glass' }
];

async function dirSize(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    let total = 0;
    for (const entry of entries) {
        const path = join(dir, entry.name);
        total += entry.isDirectory() ? await dirSize(path) : (await stat(path)).size;
    }
    return total;
}

for (const theme of THEMES) {
    const distDir = resolve(repoRoot, 'packages/themes', theme.slug, 'dist');
    const entry = join(distDir, 'index.css');
    try {
        await stat(entry);
    } catch {
        // 用异常而非 process.exit：仓库 lint 未声明 node globals（不为此改根配置）
        throw new Error(
            `[themes] 缺少构建产物：${entry}\n` +
                `[themes] 先执行 \`pnpm --filter ${theme.packageName} build\``
        );
    }

    const target = join(publicThemesDir, theme.slug);
    await rm(target, { recursive: true, force: true });
    await mkdir(target, { recursive: true });
    await cp(distDir, target, { recursive: true });

    const sizeKb = ((await dirSize(target)) / 1024).toFixed(0);
    console.log(`[themes] ${theme.slug} ← packages/themes/${theme.slug}/dist (${sizeKb} KB)`);
}

console.log(`[themes] 输出目录：${publicThemesDir}`);
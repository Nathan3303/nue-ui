/**
 * 按需引入冒烟测试
 *
 * 校验 dist/es 构建产物：仅导入 message + confirm 时，不允许传递性加载
 * 其他组件入口（avatar/calendar/date-picker/...）。
 *
 * 原理：从 message.js / confirm.js 出发，沿相对 import 做 BFS，
 * 断言可达集合中不包含无关组件入口。若未来有人重新引入桶导入
 * （如 from '@nue-ui/components'），桶会连带全部组件入口，本脚本立即失败。
 *
 * 用法：在 packages/core 目录下执行 node ./scripts/check-ondemand.js
 */
import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ES_DIR = path.resolve(__dirname, '../dist/es');
const COMPONENTS_ROOT = path.resolve(__dirname, '../../components');

const entryNames = fs
    .readdirSync(COMPONENTS_ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('__') && !d.name.startsWith('.'))
    .map(d => d.name)
    .filter(name => fs.existsSync(path.resolve(COMPONENTS_ROOT, name, 'index.ts')));

const entryFiles = new Set([...entryNames.map(n => `${n}.js`), 'index.js']);
if (!fs.existsSync(ES_DIR)) {
    console.error('[check-ondemand] 未找到 dist/es，请先执行 pnpm core build');
    process.exit(1);
}

// message/confirm 的合法依赖入口（含自身）：
// confirm/prompt -> overlay/button/text/popup-pool；
// button -> div（内部 flex 布局）；div -> divider（divider 特性）
const ALLOWED_ENTRIES = new Set([
    'message.js',
    'confirm.js',
    'prompt.js',
    'button.js',
    'icon.js',
    'text.js',
    'overlay.js',
    'popup-pool.js',
    'div.js',
    'divider.js'
]);

/** 解析模块内的相对导入，返回 dist/es 下的目标文件名 */
function resolveImport(fromFile, spec) {
    if (!spec.startsWith('./')) return null; // 外部依赖（vue 等）忽略
    const target = path.resolve(path.dirname(fromFile), spec);
    const candidates = [target, `${target}.js`, path.join(target, 'index.js')];
    for (const c of candidates) {
        if (fs.existsSync(c)) {
            const rel = path.relative(ES_DIR, c);
            return rel.split(path.sep).join('/');
        }
    }
    return null;
}

/** 收集文件的相对 import */
function collectImports(file) {
    const content = fs.readFileSync(file, 'utf-8');
    const imports = [];
    for (const m of content.matchAll(/from\s+["']([^"']+)["']/g)) {
        imports.push(m[1]);
    }
    return imports;
}

const queue = ['message.js', 'confirm.js'];
const visited = new Set(queue);
while (queue.length) {
    const file = queue.shift();
    const abs = path.join(ES_DIR, file);
    for (const spec of collectImports(abs)) {
        const target = resolveImport(abs, spec);
        if (target && !visited.has(target)) {
            visited.add(target);
            queue.push(target);
        }
    }
}

const reachedEntries = [...visited].filter(f => entryFiles.has(f));
const violations = reachedEntries.filter(f => !ALLOWED_ENTRIES.has(f));

if (violations.length > 0) {
    console.error(
        `[check-ondemand] 失败：导入 message/confirm 连带加载了无关组件入口：\n  ${violations.join('\n  ')}`
    );
    process.exit(1);
}

console.log(
    `[check-ondemand] 通过：message/confirm 依赖闭合 = ${[...reachedEntries].sort().join(', ')}`
);
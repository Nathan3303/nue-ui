#!/usr/bin/env node
/**
 * 发布期「防行尾漂移」守卫（fail guard）
 *
 * 背景：nue-ui-skill@0.3.1 曾把工作区 CRLF 漂移打进已发布 tarball，只在下游可见。
 * 本脚本在 publish 前读取「真会被打进 tarball 的文件」，检查其中是否含 CR(0x0D) 字节：
 * 有 ⇒ 打印违规文件清单并以非 0 退出，阻断发布。
 *
 * 特点：
 * - 只读：绝不静默改写任何文件（改行尾是使用者的决定，不是守卫的副作用）；
 * - 判据取自 `npm pack --dry-run --json`，即 npm 实际会打包的文件清单
 *   （等价于按 package.json 的 files 字段解析，同时覆盖 README/LICENSE/package.json
 *   等隐式包含项）；二进制文件（字体/图片等）跳过，其 0x0D 是数据而非行尾。
 *
 * 用法：
 *   node scripts/check-lf.mjs                 # 校验当前工作目录所在的包
 *   node scripts/check-lf.mjs <dir> [...]     # 校验指定包目录
 *   node scripts/check-lf.mjs --all           # 校验 packages/ 下所有可发布包
 *
 * 接入：可发布包 package.json 的 prepublishOnly（npm/pnpm publish 前触发）。
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const CR = 0x0d;
const NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WORKSPACE_ROOT = path.join(REPO_ROOT, 'packages');

// 二进制扩展名：命中则跳过，其中的 0x0D 是数据而非行尾。
const BINARY_EXTS = new Set([
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.webp',
    '.avif',
    '.bmp',
    '.ico',
    '.woff',
    '.woff2',
    '.ttf',
    '.otf',
    '.eot',
    '.pdf',
    '.zip',
    '.gz',
    '.tgz',
    '.mp3',
    '.mp4',
    '.wasm'
]);

// --all 递归扫描时跳过的目录
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.vitepress', 'coverage', '.turbo']);

function readManifest(pkgDir) {
    const manifestPath = path.join(pkgDir, 'package.json');
    if (!fs.existsSync(manifestPath)) return null;
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

/** 取「真会被打进 tarball」的文件清单（相对包根路径）。 */
function listPackedFiles(pkgDir) {
    const out = execFileSync(NPM, ['pack', '--dry-run', '--json'], {
        cwd: pkgDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
    });
    const parsed = JSON.parse(out);
    const entry = Array.isArray(parsed) ? parsed[0] : parsed;
    return entry.files.map(file => file.path);
}

/** 返回文件中的 CR 字节数；二进制文件返回 null（跳过）。 */
function countCrBytes(absPath) {
    const buf = fs.readFileSync(absPath);
    if (BINARY_EXTS.has(path.extname(absPath).toLowerCase())) return null;
    if (buf.subarray(0, 8192).includes(0)) return null; // 含 NUL ⇒ 二进制
    let count = 0;
    for (let i = 0; i < buf.length; i++) {
        if (buf[i] === CR) count++;
    }
    return count;
}

function checkPackage(pkgDir) {
    const manifest = readManifest(pkgDir);
    if (!manifest) {
        console.error(`[check-lf] 跳过（无 package.json）：${pkgDir}`);
        return { name: pkgDir, skipped: true, violations: [] };
    }
    if (manifest.private === true) {
        console.log(`[check-lf] 跳过私有包 ${manifest.name}（不会发布）`);
        return { name: manifest.name, skipped: true, violations: [] };
    }

    let packed;
    try {
        packed = listPackedFiles(pkgDir);
    } catch (err) {
        console.error(`[check-lf] ❌ ${manifest.name}：npm pack 失败，无法确定打包文件清单`);
        if (err && err.stderr) console.error(String(err.stderr).trim());
        throw err;
    }

    const violations = [];
    let binary = 0;
    for (const relPath of packed) {
        const absPath = path.join(pkgDir, relPath);
        if (!fs.existsSync(absPath)) continue;
        const cr = countCrBytes(absPath);
        if (cr === null) binary++;
        else if (cr > 0) violations.push({ file: relPath, cr });
    }

    console.log(
        `[check-lf] ${manifest.name}：待打包 ${packed.length} 个文件（跳过二进制 ${binary} 个）`
    );
    return { name: manifest.name, skipped: false, violations };
}

/** 递归收集 packages/ 下所有非 private 的包目录。 */
function discoverPublishablePackages() {
    const found = [];
    const walk = dir => {
        const manifest = readManifest(dir);
        if (manifest && manifest.name && manifest.private !== true) found.push(dir);
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            if (!entry.isDirectory() || SKIP_DIRS.has(entry.name)) continue;
            walk(path.join(dir, entry.name));
        }
    };
    if (fs.existsSync(WORKSPACE_ROOT)) walk(WORKSPACE_ROOT);
    return [...new Set(found)].sort((a, b) => a.localeCompare(b));
}

function usage() {
    console.log(
        [
            '用法：',
            '  node scripts/check-lf.mjs                # 校验当前工作目录所在的包',
            '  node scripts/check-lf.mjs <dir> [...]    # 校验指定包目录',
            '  node scripts/check-lf.mjs --all          # 校验 packages/ 下所有可发布包'
        ].join('\n')
    );
}

function main() {
    const args = process.argv.slice(2);
    if (args.includes('-h') || args.includes('--help')) {
        usage();
        return 0;
    }

    let dirs;
    if (args.includes('--all')) {
        dirs = discoverPublishablePackages();
        if (dirs.length === 0) {
            console.error('[check-lf] 未发现可发布包');
            return 2;
        }
        console.log(`[check-lf] 全量校验 ${dirs.length} 个可发布包`);
    } else if (args.length > 0) {
        dirs = args;
    } else {
        if (!readManifest(process.cwd())) {
            console.error('[check-lf] 当前目录没有 package.json；请传入包目录或使用 --all');
            usage();
            return 2;
        }
        dirs = [process.cwd()];
    }

    const results = [];
    for (const dir of dirs) {
        try {
            results.push(checkPackage(path.resolve(dir)));
        } catch {
            return 2;
        }
    }

    const failed = results.filter(result => result.violations.length > 0);
    if (failed.length > 0) {
        console.error('\n[check-lf] ❌ 发现含 CR(\\r) 字节的待发布文件：');
        for (const result of failed) {
            for (const violation of result.violations) {
                console.error(`   - ${result.name} → ${violation.file}（${violation.cr} 处 CR）`);
            }
        }
        console.error('[check-lf] 发布已阻断：请将上述文件行尾统一为 LF 后重试。');
        return 1;
    }

    console.log('\n[check-lf] ✅ 全部通过：未发现会影响发布的 CR 字节');
    return 0;
}

process.exitCode = main();
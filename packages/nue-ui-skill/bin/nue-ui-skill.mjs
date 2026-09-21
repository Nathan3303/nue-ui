#!/usr/bin/env node
// nue-ui-skill CLI：把本包的 SKILL 文件安装到目标项目的 .agents/skills/ 下
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    readdirSync,
    realpathSync,
    readFileSync,
    rmSync,
    statSync
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_NAME = 'nue-ui'; // 与 SKILL.md frontmatter 的 name 保持一致
const ENTRIES = ['SKILL.md', 'references'];

const HELP = `nue-ui-skill — 将 NueUI 使用技能安装到项目

用法：
  nue-ui-skill install [target] [--force]   安装到 <target>/.agents/skills/nue-ui/
  nue-ui-skill --help | -h                  显示帮助
  nue-ui-skill --version | -v               显示版本

参数：
  target    目标项目目录（默认当前目录）
  --force   目标已存在时覆盖（默认拒绝覆盖）
`;

function copyRecursive(src, dest) {
    mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src)) {
        const s = join(src, entry);
        const d = join(dest, entry);
        if (statSync(s).isDirectory()) {
            copyRecursive(s, d);
        } else {
            copyFileSync(s, d);
        }
    }
}

/**
 * 将 SKILL 文件安装到 <targetDir>/.agents/skills/<name>/
 * @param {string} targetDir 目标项目目录
 * @param {{ force?: boolean }} [options] force 为 true 时覆盖已存在目录
 * @returns {string} 安装到的目录绝对路径
 */
export function installSkill(targetDir, { force = false } = {}) {
    const dest = join(resolve(targetDir), '.agents', 'skills', SKILL_NAME);
    if (existsSync(dest)) {
        if (!force) {
            throw new Error(`目标已存在：${dest}\n如需覆盖请加 --force`);
        }
        rmSync(dest, { recursive: true, force: true });
    }
    mkdirSync(dest, { recursive: true });
    for (const entry of ENTRIES) {
        const src = join(PACKAGE_ROOT, entry);
        if (!existsSync(src)) {
            throw new Error(`包内缺少 ${entry}，安装包不完整？`);
        }
        const d = join(dest, entry);
        if (statSync(src).isDirectory()) {
            copyRecursive(src, d);
        } else {
            copyFileSync(src, d);
        }
    }
    return dest;
}

export function main(argv = process.argv) {
    const args = argv.slice(2);
    const sub = args[0];

    if (sub === undefined || sub === '-h' || sub === '--help') {
        console.log(HELP);
        return 0;
    }
    if (sub === '-v' || sub === '--version') {
        const pkg = JSON.parse(readFileSync(join(PACKAGE_ROOT, 'package.json'), 'utf8'));
        console.log(pkg.version);
        return 0;
    }
    if (sub !== 'install') {
        console.error(`未知子命令：${sub}`);
        console.error(HELP);
        return 1;
    }

    let target = process.cwd();
    let force = false;
    for (const a of args.slice(1)) {
        if (a === '--force' || a === '-f') {
            force = true;
        } else if (a === '-h' || a === '--help') {
            console.log(HELP);
            return 0;
        } else {
            target = a;
        }
    }

    try {
        const dest = installSkill(target, { force });
        const refs = readdirSync(join(dest, 'references'));
        console.log(`✔ 已安装到 ${dest}`);
        console.log(`  包含：${ENTRIES.join('、')}（${refs.join('、')}）`);
        console.log('  项目内即可用 nue-ui 技能（pi 会自动发现 .agents/skills）。');
        return 0;
    } catch (err) {
        console.error(`✖ 安装失败：${err.message}`);
        return 1;
    }
}

// 仅直接执行（而非被 import）时运行 CLI
let isMain = false;
try {
    isMain = process.argv[1] != null && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
} catch {
    // argv[1] 不可解析时按非主入口处理
}
if (isMain) {
    process.exitCode = main();
}

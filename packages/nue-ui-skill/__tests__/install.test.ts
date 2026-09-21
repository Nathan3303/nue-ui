import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vite-plus/test';

const BIN = join(dirname(fileURLToPath(import.meta.url)), '..', 'bin', 'nue-ui-skill.mjs');

const tempDirs: string[] = [];

function makeProject(): string {
    const dir = mkdtempSync(join(tmpdir(), 'nue-ui-skill-'));
    tempDirs.push(dir);
    return dir;
}

function runCli(dir: string, ...args: string[]) {
    return execFileSync(process.execPath, [BIN, ...args], {
        cwd: dir,
        encoding: 'utf8'
    });
}

afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
        rmSync(dir, { recursive: true, force: true });
    }
});

describe('nue-ui-skill install', () => {
    it('安装到项目 .agents/skills/nue-ui/ 下，包含 SKILL.md 与 references', () => {
        const project = makeProject();
        const out = runCli(project, 'install');

        const skillDir = join(project, '.agents', 'skills', 'nue-ui');
        expect(out).toContain(skillDir);
        expect(existsSync(join(skillDir, 'SKILL.md'))).toBe(true);
        for (const ref of ['get-started.md', 'component-map.md', 'recipes.md', 'customize.md']) {
            expect(existsSync(join(skillDir, 'references', ref))).toBe(true);
        }
        // 内容与包内一致
        const src = readFileSync(join(dirname(BIN), '..', 'SKILL.md'), 'utf8');
        expect(readFileSync(join(skillDir, 'SKILL.md'), 'utf8')).toBe(src);
    });

    it('目标已存在时拒绝覆盖，--force 才覆盖', () => {
        const project = makeProject();
        const skillDir = join(project, '.agents', 'skills', 'nue-ui');
        mkdirSync(skillDir, { recursive: true });
        writeFileSync(join(skillDir, 'SKILL.md'), 'stale');

        let failed = false;
        try {
            runCli(project, 'install');
        } catch (err) {
            failed = true;
            const stderr = (err as { stderr: string }).stderr;
            expect(stderr).toContain('目标已存在');
        }
        expect(failed).toBe(true);
        expect(readFileSync(join(skillDir, 'SKILL.md'), 'utf8')).toBe('stale');

        runCli(project, 'install', '--force');
        expect(readFileSync(join(skillDir, 'SKILL.md'), 'utf8')).not.toBe('stale');
    });

    it('支持 --help / --version', () => {
        expect(runCli(process.cwd(), '--help')).toContain('install');
        expect(runCli(process.cwd(), '--version').trim()).toMatch(/^\d+\.\d+\.\d+$/);
    });
});
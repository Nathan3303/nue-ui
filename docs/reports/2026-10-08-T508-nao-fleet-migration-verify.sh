#!/usr/bin/env bash
# =============================================================================
# T508 · 用例先行 + 独立验证脚本
#   nue-ui 迁移到 nao-skill 0.12.0（pi 原生包形态 / shim 转发）
#
# 断言来源（正文权威）：docs/prds/2026-10-08-nao-fleet-0.12.0-migration.md
#   §7 AC1–AC8 · §8 V1–V6 · §5 BR1–BR6 · §6 NFR1–NFR5 · §2 目标指标 · §3 引用面三类
#
# 本仓特有项（与 T506/T507 模板的差异，勿照抄）：
#   1. 本仓默认分支是 **master**（非 main）⇒ 基线/回滚取 `origin/master`。
#   2. 引用面三类：A 机制 = `AGENTS.md`；B 自有语义 = `packages/nue-ui-skill/**`
#      + `apps/document/skill/**`；C 构建配置 = `vite.config.ts`。
#      ⇒ AC3 统计口径（**PM 2026-10-08 裁定**）= 入库文件中「**裸机制引用 5 行 → 0 行**」：
#         不含 `$NAO_SKILLS/` 前缀的 `.agents/…` 字样即计为裸引用；
#         **排除 B/C 类与迁移文档自身**（`.agents/` 本体与 `.gitignore` 规则行亦排除，
#         其存在性分别由 AC1/AC4 断言）。
#      §3 引用面按**逐行口径**（同日裁定）：A=5 行 / 1 文件，B=16 行 / 5 文件，C=1 行 / 1 文件，
#         合计 **22 行 / 8 文件**（原「15 处」为文件内计数且漏记 `bin/nue-ui-skill.mjs`，已作废）。
#      nao `*.md` 资产数 = **13 个**（同日裁定，原「14 个」作废）。
#   3. AC3 判据 = 裸机制引用 **5 → 0**（`$NAO_SKILLS/.agents/…` 前缀形式不计为裸引用）。
#      注意：新 `AGENTS.md` 会在「已退役的判据」句中**提及** `sha256sum` 与「稳定报 3 个文件」，
#      故断言不得用「不得出现该字样」，而应查「承载该字样的行是否处于退役/作废语境」+
#      旧**祈使句**原文（`同步完成后必须用…` 等）已消失。
#   4. V2（关键，已实测裁定）：`AGENTS.md` 原称「vp check 稳定报 3 个文件」**不成立**；
#      `fmt.ignorePatterns` 的 `.agents/**` 使两个机制文件被完全排除，第三个已 fmt 干净
#      ⇒ 基线入库文件 fmt 差异 = 0，AC5 判据 = 全树 `vp fmt --list-different .` = **0 文件**。
#
# 用法
#   bash docs/reports/2026-10-08-T508-nao-fleet-migration-verify.sh            # 迁移后验收（默认）
#   bash docs/reports/2026-10-08-T508-nao-fleet-migration-verify.sh --baseline # 迁移前基线（只读，现树须 GREEN）
#     ⚠ `--baseline` 须在**主工作树**上、且树停在迁移前修订时运行（其常量与 `.agents/` 文件数口径
#       按主工作树实测固化）。实测：在 `git worktree` + symlink node_modules 下，
#       `vp fmt --check` / `vp check --no-fmt` 子探针不可靠（rc=1 / 报差异），不应据此判定。
#   bash docs/reports/2026-10-08-T508-nao-fleet-migration-verify.sh [项目根] [--baseline]
#
# 环境开关
#   T508_SKIP_GATES=1    跳过门禁（test:run / 4 个 build / check:lf / vp check）
#   T508_SKIP_BUILDS=1   仅跳 4 个 build（保留 test:run / check:lf / vp check）
#   T508_REAL_DEGRADED=1 在真树做「临时移走 .pi/npm」负向（须独占窗口；自动恢复）
#   T508_ROLLBACK=1      做「git worktree 内 revert 本批提交后 check exit 0」回核实测
#   T508_IDEMPOTENT=1    做「二次 migrate + check」幂等实测（用包内同一 0.12.0 二进制；不联网）
#   T508_ENSURE_DRILL=1  保留位：真实角色 ensure 演练（默认不执行，理由见 AC6 输出说明）
#
# 纪律：默认只读被测树。负向用 temp fixture；回滚用 git worktree（不动主工作区）。
#       不执行任何改写命令（`vp fmt` 只带 --check/--list-different）。
#       迁移前跑默认模式必然大面积 FAIL（RED = 用例先行的预期）。
# =============================================================================
set -uo pipefail

BASELINE=0
PROJ=""
for a in "$@"; do
  case "$a" in
    --baseline) BASELINE=1 ;;
    -h|--help) sed -n '2,40p' "$0"; exit 0 ;;
    *) PROJ="$a" ;;
  esac
done
[ -n "$PROJ" ] || PROJ="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
PROJ="$(cd "$PROJ" && pwd)"
cd "$PROJ"

# --- 迁移前基线常量（2026-10-08 本地实测固化；AC2/AC8 用 md5 判「逐字节不变」） ---
MD5_AGENTS_MD="0dcd845841da727dea135e3b2d1ad52a"
MD5_SKILLS_LOCK="48c8718467f6c5006089010f8092a9f1"
MD5_PNPM_LOCK="3d14a6eb99c58bf7d738151af589ae11"
MD5_VITE_CONFIG="bafe57bb889f280b74dc80042976c750"
MD5_COMMIT_CMD="049d054dba64026e76956c3ffd5e8aaf"
MD5_CHECK_LF="0f304fba8353ee07cb8af2242d8c5892"
# B 类（自有语义，AC3/AC8 不得改写）
MD5_SKILL_README="9824b2fa80d94a4c958adec16b6a5fe6"      # packages/nue-ui-skill/README.md
MD5_SKILL_TEST="bfe0f24a7e14c88c504ad70c9917b9a9"        # packages/nue-ui-skill/__tests__/install.test.ts
MD5_SKILL_BIN="27e9b3fa56a4c700cca54efeccecc9b2"         # packages/nue-ui-skill/bin/nue-ui-skill.mjs
MD5_DOC_USAGE="02cbe472e91bdc4fa9aa3eb857f4c916"         # apps/document/skill/usage.md
MD5_DOC_CLI="1ba6e65eafa2fa948ea29ae8eee9ccc8"           # apps/document/skill/cli.md
MD5_DOC_INSTALL="cee4a04a00688cdb99e80551c7cdd278"       # apps/document/skill/install.md
# V3：.agents/skills/nue-ui-dev/** 内容指纹（8 文件；迁移后须「触碰数 = 0」）
SHA_NUE_UI_DEV="156dec98f3ae62a5933bd423a370aa93c86bed6c9656d6765efe62034fbac687"
N_NUE_UI_DEV=8
# 基线计数（实测）
BASE_NAO_VERSION="0.11.0"
TARGET_NAO_VERSION="0.12.0"
PIN_SPEC="npm:@nathan33/nao-skill@0.12.0"
BASE_AGENTS_TOP_N=9
BASE_AGENTS_TOP="checklists commands common .nao-version prompts roles.yaml scripts skills templates"
BASE_AGENTS_FILES=75
BASE_AGENTS_TRACKED=73
BASE_FMT_DIFF_TRACKED=0     # 有基线：入库文件 fmt 差异文件数 = 0
BASE_REF_FACE_A=5           # AGENTS.md 行数（nao 机制引用）
BASE_REF_FACE_B=16          # packages/nue-ui-skill/** + apps/document/skill/** 行数
BASE_REF_FACE_C=1           # vite.config.ts 行数
BASE_REF_FACE_FILES=8
BASE_BARE_MECH=5            # AC3 裸机制引用（A 类）实测基线
BASE_LINT_FILES=469         # 基线 vp check --no-fmt 文件数
POST_LINT_FILES=468         # 迁移后 vp check --no-fmt 文件数（Δ=-1 = 移除 intercom-probe.mts）
REF_EXCLUDE_RE='docs/prds/2026-10-08-nao-fleet-0\.12\.0-migration\.md|docs/reports/'

# AC3 统计口径（git pathspec）：排除 .agents/ 本体 / .gitignore 规则行 / B 类 / C 类 / 本批迁移文档
REF_EXCLUDES=(
  ':(exclude).agents/'
  ':(exclude).gitignore'
  ':(exclude)packages/nue-ui-skill/'
  ':(exclude)apps/document/skill/'
  ':(exclude)vite.config.ts'
  ':(exclude)docs/prds/2026-10-08-nao-fleet-0.12.0-migration.md'
  ':(exclude)docs/reports/'
)
# AC1 迁移后 .agents/ 顶层残留集合（PRD §2 目标；不硬记项数 ⇒ 断言集合相等；集合内顺序由 norm_list 归一化）
POST_AGENTS_TOP="scripts skills commands .nao-obsolete .nao-version .nao-migrated"
# AC2 迁移后 .agents/skills/ 保留集合（自有 + lock 3 目录）
POST_SKILLS_DIRS="skill-creator nue-ui-dev find-skills agent-browser"
# AC8 非范围（本批不得触碰）
NON_SCOPE_RE='^packages/|^apps/|^vite\.config\.ts$|^\.github/workflows/|^pnpm-lock\.yaml$|^\.agents/commands/|^\.agents/skills/nue-ui-dev/'

BASE_REF="$(git merge-base origin/master HEAD 2>/dev/null || git rev-parse origin/master 2>/dev/null || echo '')"

TMP="$(mktemp -d "${TMPDIR:-/tmp}/t508-verify.XXXXXX")"
EMPTY_HOME="$TMP/emptyhome"; mkdir -p "$EMPTY_HOME"
restore_npm() { [ -d "$PROJ/.pi/npm.t508bak" ] && mv "$PROJ/.pi/npm.t508bak" "$PROJ/.pi/npm" 2>/dev/null || true; }
cleanup(){ restore_npm; rm -rf "$TMP"; }
trap cleanup EXIT

PASS=0; FAIL=0; WARN=0
G=$'\033[32m'; R=$'\033[31m'; Y=$'\033[33m'; D=$'\033[2m'; N=$'\033[0m'
pass(){ PASS=$((PASS+1)); printf '%s[PASS]%s %s\n' "$G" "$N" "$*"; }
fail(){ FAIL=$((FAIL+1)); printf '%s[FAIL]%s %s\n' "$R" "$N" "$*"; }
warn(){ WARN=$((WARN+1)); printf '%s[WARN]%s %s\n' "$Y" "$N" "$*"; }
info(){ printf '%s[INFO]%s %s\n' "$D" "$N" "$*"; }
hdr(){ printf '\n%s===== %s =====%s\n' "$D" "$*" "$N"; }

assert_eq(){ [ "$1" = "$2" ] && pass "$3 (= $2)" || fail "$3 (expected [$1] got [$2])"; }
assert_ne(){ [ "$1" != "$2" ] && pass "$3 (= $2)" || fail "$3 (unexpectedly = $1)"; }
assert_file(){ [ -f "$1" ] && pass "$2" || fail "$2 (missing file $1)"; }
assert_dir(){ [ -d "$1" ] && pass "$2" || fail "$2 (missing dir $1)"; }
assert_absent(){ [ ! -e "$1" ] && pass "$2" || fail "$2 (still exists: $1)"; }
assert_contains(){ case "$1" in *"$2"*) pass "$3";; *) fail "$3 (output lacks [$2])";; esac; }
assert_not_contains(){ case "$1" in *"$2"*) fail "$3 (output unexpectedly has [$2])";; *) pass "$3";; esac; }
md5(){ md5sum "$1" 2>/dev/null | awk '{print $1}'; }
now_ms(){ date +%s%3N 2>/dev/null || echo 0; }

# 经项目内 shim 调 fleet（清掉可能干扰的显式覆盖；返回 RC/OUT/ERR）
shim(){ local d="$1"; shift
  ( cd "$d" && env -u NAO_SKILLS -u NAO_SHIM_ENTERED -u PI_CODING_AGENT_DIR \
      bash .agents/scripts/nao-fleet.sh "$@" ) >"$TMP/o" 2>"$TMP/e"
  RC=$?; OUT="$(cat "$TMP/o")"; ERR="$(cat "$TMP/e")"
}

# AC3 口径：入库文件中的 nao 机制引用行数（$1 = 可选修订）
ref_hits(){ if [ -n "${1:-}" ]; then
    git grep -I -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' "$1" -- . "${REF_EXCLUDES[@]}" 2>/dev/null | wc -l | tr -d ' '
  else
    git grep -I -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' -- . "${REF_EXCLUDES[@]}" 2>/dev/null | wc -l | tr -d ' '
  fi; }
# AC3 引用面逐类逐行计数（§3 裁定口径：A 5 · B 16/5 · C 1，合计 22 行 / 8 文件）
ref_face_A(){ git grep -I -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' -- AGENTS.md 2>/dev/null | wc -l | tr -d ' '; }
ref_face_B(){ git grep -I -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' -- packages/nue-ui-skill apps/document/skill 2>/dev/null | wc -l | tr -d ' '; }
ref_face_B_files(){ git grep -I -l -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' -- packages/nue-ui-skill apps/document/skill 2>/dev/null | wc -l | tr -d ' '; }
ref_face_C(){ git grep -I -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' -- vite.config.ts 2>/dev/null | wc -l | tr -d ' '; }
# §3 三类（A∪B∪C）逐行合计与命中文件数（仅排 .agents/ 本体与迁移文档）
ref_face_all(){ git grep -I -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' -- AGENTS.md packages/nue-ui-skill apps/document/skill vite.config.ts 2>/dev/null | wc -l | tr -d ' '; }
ref_face_files(){ git grep -I -l -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' -- AGENTS.md packages/nue-ui-skill apps/document/skill vite.config.ts 2>/dev/null | wc -l | tr -d ' '; }
# 可 lint 扩展名的入库文件数（独立推导 vp check --no-fmt 的报数）
lint_files_tracked(){ git ls-files | grep -cE '\.(mts|ts|tsx|js|mjs|jsx|vue)$'; }
lint_files_rev(){ git ls-tree -r --name-only "$1" 2>/dev/null | grep -cE '\.(mts|ts|tsx|js|mjs|jsx|vue)$'; }

# AC3「裸机制引用」＝ 同口径，但剥离 `$NAO_SKILLS/.agents` 前缀形式（PM 裁定口径）
bare_mech_refs(){ { if [ -n "${1:-}" ]; then
      git grep -I -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' "$1" -- . "${REF_EXCLUDES[@]}" 2>/dev/null
    else
      git grep -I -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' -- . "${REF_EXCLUDES[@]}" 2>/dev/null
    fi; } | sed 's|\$NAO_SKILLS/\.agents|@MECH@|g' | grep -c '\.agents'; }

# 解析 pin 的机制包根（仅用于取包内脚本路径；与 shim D6 同源逻辑）
PKG_ROOT="$(node -e '
  const fs=require("fs"),path=require("path");
  const proj=process.argv[1];
  let s; try{ s=JSON.parse(fs.readFileSync(path.join(proj,".pi/settings.json"),"utf8")); }catch{ process.exit(0); }
  for(const raw of (s.packages||[])){
    const m=/^npm:(.+?)(?:@([^@\/]+))?$/.exec(String(raw)); if(!m) continue;
    let name=m[1]; if(name.startsWith("@")&&name.includes("/@")) name=name.slice(0,name.indexOf("/@"));
    try{
      const pj=require.resolve(name+"/package.json",{paths:[path.join(proj,".pi/npm/node_modules")]});
      const root=path.dirname(pj);
      if(fs.existsSync(path.join(root,".agents","scripts","nao-fleet.sh"))){ process.stdout.write(root); break; }
    }catch{}
  }
' "$PROJ" 2>/dev/null)"

# vp fmt 差异文件数（全树含未入库 / 仅入库文件）
fmt_diff_all(){ ( pnpm exec vp fmt --list-different . 2>/dev/null || true ) \
  | grep -vE '^[[:space:]]*$|^Checking formatting' | wc -l | tr -d ' '; }
fmt_diff_tracked(){ ( pnpm exec vp fmt --list-different $(git ls-files) 2>/dev/null || true ) \
  | grep -vE '^[[:space:]]*$|^Checking formatting' | wc -l | tr -d ' '; }
# 集合归一化（空格分隔 → 排序后用空格连接；与 agents_top/skills_top 的 sort 口径一致）
norm_list(){ printf '%s\n' "$1" | tr ' ' '\n' | sed '/^$/d' | sort | tr '\n' ' ' | sed 's/ *$//'; }
agents_top(){ ls -A "$PROJ/.agents" 2>/dev/null | sort | tr '\n' ' ' | sed 's/ *$//'; }
skills_top(){ ls -A "$PROJ/.agents/skills" 2>/dev/null | sort | tr '\n' ' ' | sed 's/ *$//'; }
dev_manifest(){ find .agents/skills/nue-ui-dev -type f -print0 2>/dev/null | sort -z \
  | xargs -0 sha256sum 2>/dev/null | sha256sum | awk '{print $1}'; }
vp_ver(){ node -p 'require("vite-plus/package.json").version' 2>/dev/null || echo '?'; }

printf 'T508 独立验证 · 项目根 = %s · 模式 = %s · 基线修订 = %s\n' \
  "$PROJ" "$( [ "$BASELINE" = 1 ] && echo baseline || echo post-migration )" "${BASE_REF:-<无>}"
info "工具版本：node=$(node --version 2>/dev/null) pnpm=$(pnpm --version 2>/dev/null) vp=$(vp_ver)"

# =============================================================================
if [ "$BASELINE" = 1 ]; then
hdr "V1/V2 + 基线：迁移前只读体检（现树应停在 0.11.0 态）"

assert_eq "$BASE_NAO_VERSION" "$(tr -d '[:space:]' < "$PROJ/.agents/.nao-version" 2>/dev/null)" "基线/V1: .agents/.nao-version = $BASE_NAO_VERSION"
assert_absent "$PROJ/.agents/.nao-migrated" "基线/V1: .agents/.nao-migrated 尚不存在（未迁移）"
assert_absent "$PROJ/.pi/settings.json" "基线/AC4: .pi/settings.json 尚不存在"
assert_eq "0" "$(git ls-files .pi | wc -l | tr -d ' ')" "基线/AC4: git ls-files .pi = 0"

info "基线/V1: .agents/ 顶层实测 = [$(agents_top)]（计数 $(ls -A .agents 2>/dev/null | wc -l | tr -d ' ')；PRD §1 写「9 项」）"
assert_eq "$(norm_list "$BASE_AGENTS_TOP")" "$(agents_top)" "基线/V1: .agents/ 顶层 9 项与 PRD §1 逐项一致"
for e in prompts common checklists templates roles.yaml scripts skills commands .nao-version; do
  [ -e "$PROJ/.agents/$e" ] && pass "基线/V1: 0.11.0 项在树 .agents/$e" || fail "基线/V1: 机制项缺失 .agents/$e"
done
n_files="$(find "$PROJ/.agents" -type f | wc -l | tr -d ' ')"
n_git="$(git ls-files .agents | wc -l | tr -d ' ')"
n_ign="$(git ls-files --others --ignored --exclude-standard .agents | wc -l | tr -d ' ')"
assert_eq "$BASE_AGENTS_TRACKED" "$n_git" "基线/V1: .agents/ 入库文件数 = $BASE_AGENTS_TRACKED（git ls-files）"
assert_eq "$((n_git + n_ign))" "$n_files" "基线/V1: find 文件数 = git 入库 + gitignored（$n_git + $n_ign；主工作树实测 $BASE_AGENTS_FILES，差额 2 = __pycache__/*.pyc）"
info "基线/V1: gitignored 项 = $n_ign（主工作树实测 2 = skill-creator/scripts/__pycache__/*.pyc；worktree 下为 0，属环境差异，不作判定）"
assert_eq "4" "$(ls -A "$PROJ/.agents/scripts" | wc -l | tr -d ' ')" "基线/AC1: .agents/scripts/ 4 个脚本（nao-fleet 旧副本 + probe + qq-notify + ui-tokens）"
assert_contains "$(cat "$PROJ/.agents/scripts/nao-fleet.sh")" "cmd_ensure" "基线/AC1: nao-fleet.sh 是 0.11.0 全量脚本（含 cmd_ensure，非 shim）"
assert_not_contains "$(cat "$PROJ/.agents/scripts/nao-fleet.sh")" "NAO_SHIM_ENTERED" "基线/AC1: 0.11.0 全量脚本无 NAO_SHIM_ENTERED"
info "基线/V1: nao-fleet.sh 行数 = $(wc -l < "$PROJ/.agents/scripts/nao-fleet.sh" | tr -d ' ')"

# --- 引用面三类逐类计数（AC3 判据基础；V2 关键） ---
hdr "基线/AC3 引用面三类（入库文件，逐类计数）"
A="$(ref_face_A)"; B="$(ref_face_B)"; C="$(ref_face_C)"; BF="$(ref_face_B_files)"
TOT="$(ref_face_all)"; NFILES="$(ref_face_files)"
assert_eq "$BASE_REF_FACE_A" "$A" "基线/AC3: A 类（AGENTS.md）行数 = $BASE_REF_FACE_A"
assert_eq "$BASE_REF_FACE_B" "$B" "基线/AC3: B 类（packages/nue-ui-skill + apps/document/skill）行数 = $BASE_REF_FACE_B"
assert_eq "6" "$BF" "基线/AC3: B 类命中文件数 = 6（cli/install/usage.md + README.md + install.test.ts + bin/nue-ui-skill.mjs）"
assert_eq "$BASE_REF_FACE_C" "$C" "基线/AC3: C 类（vite.config.ts）行数 = $BASE_REF_FACE_C"
assert_eq "$BASE_REF_FACE_FILES" "$NFILES" "基线/AC3: 引用面命中文件数 = $BASE_REF_FACE_FILES（逐行口径）"
assert_eq "$((BASE_REF_FACE_A+BASE_REF_FACE_B+BASE_REF_FACE_C))" "$((A+B+C))" "基线/AC3: 三类行数合计 = $((A+B+C))（PM 裁定逐行口径 22 行：A=$A B=$B C=$C）"
info "基线/AC3: §3 三类逐行合计 = $TOT 行 / $NFILES 文件（裁定口径：22 行 / 8 文件；A=$A B=$B/$BF C=$C）"
assert_eq "0" "$(git grep -I -e '\.agents' -e 'nao-fleet' -e 'NAO_SKILLS' -- .github/ 2>/dev/null | wc -l | tr -d ' ')" "基线/§1: .github/workflows 对 .agents/nao-fleet 0 命中"
info "基线/AC3: A 类裸机制引用实测 = $(bare_mech_refs)"
assert_eq "$BASE_BARE_MECH" "$(bare_mech_refs)" "基线/AC3: A 类裸机制引用 = $BASE_BARE_MECH（PM 裁定判据 5 → 0）"

# --- 自有资产 / lock / AGENTS.md 基线指纹 ---
hdr "基线/AC2 + AC8：自有资产与不可变指纹"
assert_eq "$MD5_AGENTS_MD" "$(md5 "$PROJ/AGENTS.md")" "基线/AC3: AGENTS.md md5 基线"
assert_eq "$MD5_SKILLS_LOCK" "$(md5 "$PROJ/skills-lock.json")" "基线/AC2: skills-lock.json md5 基线"
assert_eq "$MD5_PNPM_LOCK" "$(md5 "$PROJ/pnpm-lock.yaml")" "基线/V6: pnpm-lock.yaml md5 基线"
assert_eq "$MD5_VITE_CONFIG" "$(md5 "$PROJ/vite.config.ts")" "基线/AC4: vite.config.ts md5 基线"
assert_eq "$MD5_COMMIT_CMD" "$(md5 "$PROJ/.agents/commands/commit.md")" "基线/AC2/BR6: .agents/commands/commit.md md5 基线（自有，须保留）"
assert_eq "$MD5_CHECK_LF" "$(md5 "$PROJ/scripts/check-lf.mjs")" "基线/AC5: scripts/check-lf.mjs md5 基线"
assert_eq "$MD5_SKILL_README" "$(md5 "$PROJ/packages/nue-ui-skill/README.md")" "基线/AC3-B: packages/nue-ui-skill/README.md md5 基线"
assert_eq "$MD5_SKILL_TEST" "$(md5 "$PROJ/packages/nue-ui-skill/__tests__/install.test.ts")" "基线/AC3-B: install.test.ts md5 基线"
assert_eq "$MD5_SKILL_BIN" "$(md5 "$PROJ/packages/nue-ui-skill/bin/nue-ui-skill.mjs")" "基线/AC3-B: bin/nue-ui-skill.mjs md5 基线"
assert_eq "$MD5_DOC_USAGE" "$(md5 "$PROJ/apps/document/skill/usage.md")" "基线/AC3-B: apps/document/skill/usage.md md5 基线"
assert_eq "$MD5_DOC_CLI" "$(md5 "$PROJ/apps/document/skill/cli.md")" "基线/AC3-B: apps/document/skill/cli.md md5 基线"
assert_eq "$MD5_DOC_INSTALL" "$(md5 "$PROJ/apps/document/skill/install.md")" "基线/AC3-B: apps/document/skill/install.md md5 基线"
assert_eq "14" "$(git ls-files packages/nue-ui-skill apps/document/skill | wc -l | tr -d ' ')" "基线/AC8: B 类入库文件数 = 14（迁移后须不变）"

lock_keys="$(node -e 'const s=require(process.argv[1]);process.stdout.write(Object.keys(s.skills||{}).sort().join(","))' "$PROJ/skills-lock.json" 2>/dev/null)"
assert_eq "agent-browser,find-skills,frontend-design,skill-creator" "$lock_keys" "基线/AC2: skills-lock 4 键含 frontend-design（迁移须文本级去重）"
assert_eq "true" "$(node -e 'const fs=require("fs");const r=fs.readFileSync(process.argv[1],"utf8");process.stdout.write(String(JSON.stringify(JSON.parse(r),null,4)===r))' "$PROJ/skills-lock.json" 2>/dev/null)" "基线/AC2: skills-lock = 4 空格缩进 + 无尾换行的规范化文本（便于迁移后逐字节判等）"

assert_dir "$PROJ/.agents/skills/nue-ui-dev" "基线/V3: 自有 skill nue-ui-dev 在树"
assert_eq "$N_NUE_UI_DEV" "$(find "$PROJ/.agents/skills/nue-ui-dev" -type f | wc -l | tr -d ' ')" "基线/V3: nue-ui-dev 文件数 = $N_NUE_UI_DEV"
assert_eq "$SHA_NUE_UI_DEV" "$(dev_manifest)" "基线/V3: nue-ui-dev 内容指纹基线（AC2「触碰数 = 0」判据）"
for d in agent-browser find-skills skill-creator; do assert_dir "$PROJ/.agents/skills/$d" "基线/AC2: lock 技能目录 .agents/skills/$d"; done
assert_dir "$PROJ/.agents/skills/frontend-design" "基线/AC2: nao 资产 frontend-design 在树（待迁移备份移除）"
n_md="$(ls "$PROJ/.agents/skills"/*.md 2>/dev/null | wc -l | tr -d ' ')"
assert_eq "13" "$n_md" "基线/AC2: nao 顶层 *.md 数 = 13（PRD §1/§2 写「14 个」⇒ 口径差异见 WARN）"
warn "基线/AC2 口径差异（须 PM 确认）：PRD §1/§2 写「14 个 nao *.md」，实测 $n_md 个；包内 LEGACY_SKILL_ENTRIES 亦列 13 个 *.md（另含 2 个目录条目）"
info "基线/AC2: .agents/skills/ 顶层实测 = [$(skills_top)]"

# --- V2：vp check 差异文件数（关键） ---
hdr "V2：vp check / vp fmt 迁移前差异（AGENTS.md 陈述 vs 配置 vs 实测）"
assert_contains "$(cat "$PROJ/AGENTS.md")" "稳定报 3 个文件" "基线/V2: AGENTS.md 现文含「稳定报 3 个文件」陈述（待 AC3 退役）"
assert_contains "$(cat "$PROJ/vite.config.ts")" "'.agents/**'" "基线/V2: vite.config.ts fmt.ignorePatterns 含 .agents/**（与陈述矛盾）"
assert_absent "$PROJ/.agents/.nao-obsolete" "基线/AC1: .agents/.nao-obsolete 尚不存在（未迁移）"
# 注：vp fmt --check 对「被 ignore 规则排除」的目标 rc=2，故不可用 `| grep -q`（pipefail 会误判成功）
f_probe(){ pnpm exec vp fmt --check "$1" >"$TMP/fp.log" 2>&1; local rc=$?; printf 'rc=%s %s' "$rc" "$(tr '\n' ' ' < "$TMP/fp.log" | sed 's/  */ /g')"; }
probe_roles="$(f_probe .agents/roles.yaml)"
assert_contains "$probe_roles" "excluded by ignore rules" "基线/V2: .agents/roles.yaml 被 fmt ignore 规则排除（实证 .agents/** 生效）"
assert_contains "$(f_probe .agents/scripts/intercom-probe.mts)" "excluded by ignore rules" "基线/V2: .agents/scripts/intercom-probe.mts 被 fmt ignore 规则排除"
probe_mjs="$(f_probe packages/nue-ui-skill/bin/nue-ui-skill.mjs)"
assert_contains "$probe_mjs" "correct format" "基线/V2: packages/nue-ui-skill/bin/nue-ui-skill.mjs 现为**合规格式**（AGENTS.md 的「格式债」已过期；$(printf '%s' "$probe_mjs" | awk '{print $1}')）"
ft="$(fmt_diff_tracked)"; fa="$(fmt_diff_all)"
assert_eq "$BASE_FMT_DIFF_TRACKED" "$ft" "基线/AC5: 入库文件 vp fmt 差异文件数 = $BASE_FMT_DIFF_TRACKED（AC5 判据基线）"
info "基线/V2: 全树 vp fmt 差异文件数 = $fa（含本批新增未入库 docs/prds/*.md 未格式化 ⇒ 与 git HEAD 树有差异）"
warn "基线/V2 实测结论（已由 PM 裁定）：AGENTS.md 原「稳定报 3 个文件」与实测矛盾 —— 入库文件差异 = $ft（commit a8a11307「全仓 vp check 差异归零」+ 90852c83「fmt 排除 .agents/**」已在 HEAD 内）；AC3② 据此改为**整段退役**（不重定豁免清单）"
if [ "$fa" != "0" ]; then
  info "基线/V2: 全树差异清单 = [$( ( pnpm exec vp fmt --list-different . 2>/dev/null || true ) | grep -vE '^[[:space:]]*$|^Checking formatting' | tr '\n' ' ' )]（本批 PRD 入库前须格式化，否则 AC5「差异数不增加」不成立）"
fi
t0=$(now_ms); pnpm exec vp check --no-fmt >"$TMP/ck.log" 2>&1; rc=$?; t1=$(now_ms)
assert_eq "0" "$rc" "基线/AC5: vp check --no-fmt（lint+type）exit=0（$((t1-t0))ms）"
info "基线/AC5: $(grep -o 'Found no warnings.*' "$TMP/ck.log" | head -1)"
bl="$(grep -o 'in [0-9]* files' "$TMP/ck.log" | grep -o '[0-9]*' | head -1)"
assert_eq "$BASE_LINT_FILES" "$bl" "基线/AC5: vp check --no-fmt 文件数 = $BASE_LINT_FILES"
assert_eq "$(lint_files_rev master)" "$bl" "基线/AC5: 报数 = master 上可 lint 扩展名入库文件数（独立推导）"

# --- V3/V4/V5/V6 ---
hdr "V4/V5/V6：环境事实"
t0=$(now_ms)
( npx --yes @nathan33/nao-skill@0.12.0 --version ) >"$TMP/npx.log" 2>&1; rc=$?; t1=$(now_ms)
assert_eq "1" "$rc" "V4: 仓内 npx --yes @nathan33/nao-skill@0.12.0 --version 非 0（$((t1-t0))ms）"
assert_contains "$(cat "$TMP/npx.log")" "EBADDEVENGINES" "V4: 阻断原因为 EBADDEVENGINES（佐证「必须仓外执行」）"
info "V4: 实测报文首行 = $(grep -m1 'EBADDEVENGINES' "$TMP/npx.log")"
assert_contains "$(cat "$PROJ/.vite-hooks/pre-push")" "pnpm run test:run" "V5: pre-push 跑全量测试（NFR5 不得 --no-verify）"
assert_contains "$(cat "$PROJ/.vite-hooks/pre-commit")" "lint:lint-staged" "V5: pre-commit 仅 staged 范围"
info "V6: pnpm-lock.yaml / packages/nue-ui-skill 迁移后须逐字节不变（md5 已固化，默认模式断言）"

# --- 门禁基线（PM 指定：pnpm test:run / pnpm check:lf 的 rc 与耗时） ---
hdr "AC5 门禁基线：pnpm test:run / pnpm check:lf"
if [ "${T508_SKIP_GATES:-}" = "1" ]; then
  info "AC5: 跳过门禁（T508_SKIP_GATES=1）"
else
  t0=$(now_ms); pnpm test:run >"$TMP/t.log" 2>&1; rc=$?; t1=$(now_ms)
  assert_eq "0" "$rc" "基线/AC5: pnpm test:run exit=0（耗时 $(( (t1-t0)/1000 ))s）"
  info "基线/AC5: test:run 结果 = $(grep -E '^ *Test Files|^ *Tests ' "$TMP/t.log" | tr -s ' ' | tr '\n' ' ')"
  t0=$(now_ms); pnpm check:lf >"$TMP/lf.log" 2>&1; rc=$?; t1=$(now_ms)
  assert_eq "0" "$rc" "基线/AC5: pnpm check:lf exit=0（耗时 $(( (t1-t0)/1000 ))s）"
  info "基线/AC5: check:lf 结论 = $(grep -E '全部通过|发现' "$TMP/lf.log" | head -1)"
fi

hdr "汇总（baseline）"
printf 'PASS=%d  FAIL=%d  WARN=%d\n' "$PASS" "$FAIL" "$WARN"
if [ "$FAIL" -eq 0 ]; then printf '%sBASELINE GREEN%s（warn=%d）\n' "$G" "$N" "$WARN"; exit 0
else printf '%sBASELINE FAIL=%d%s\n' "$R" "$FAIL" "$N"; exit 1; fi
fi

# =============================================================================
hdr "前置：迁移态与物化"
assert_file "$PROJ/.agents/.nao-migrated" "前置: .agents/.nao-migrated 存在（迁移已执行）"
assert_file "$PROJ/.pi/settings.json" "前置: .pi/settings.json 存在（pin 入库）"
if [ -n "$PKG_ROOT" ]; then
  pass "前置: 机制包已物化（$PKG_ROOT）"
  assert_eq "$TARGET_NAO_VERSION" "$(node -p 'require(process.argv[1]).version' "$PKG_ROOT/package.json" 2>/dev/null)" "前置: 机制包版本 = $TARGET_NAO_VERSION"
  assert_eq "0" "$(git ls-files .pi/npm | wc -l | tr -d ' ')" "前置/AC4: .pi/npm/** 未入库（gitignored 物化产物）"
else
  fail "前置: 机制包未物化（.pi/npm 缺 @nathan33/nao-skill）"
fi

# ---------------------------------------------------------------------------
hdr "AC1 主路径：机制类资产归零 + 顶层残留集合 + shim check"
for d in prompts common checklists templates; do
  assert_absent "$PROJ/.agents/$d" "AC1: .agents/$d 已移除（机制副本不落项目）"
done
assert_absent "$PROJ/.agents/roles.yaml" "AC1: .agents/roles.yaml 已移除"
for s in intercom-probe.mts qq-notify ui-tokens-check.sh; do
  assert_absent "$PROJ/.agents/scripts/$s" "AC1: 机制脚本 .agents/scripts/$s 已移除"
done
assert_eq "nao-fleet.sh" "$(ls -A "$PROJ/.agents/scripts" 2>/dev/null | tr '\n' ' ' | sed 's/ *$//')" "AC1: .agents/scripts/ 仅 shim nao-fleet.sh"
shim_src="$(cat "$PROJ/.agents/scripts/nao-fleet.sh" 2>/dev/null)"
assert_contains "$shim_src" "NAO_SHIM_ENTERED" "AC1: 项目内 nao-fleet.sh 是 shim（含 NAO_SHIM_ENTERED）"
assert_contains "$shim_src" "DEGRADED:" "AC1/NFR3: shim 含 DEGRADED: 降级通道"
assert_not_contains "$shim_src" "cmd_ensure" "AC1: shim 非旧版全量脚本（无 cmd_ensure）"
assert_eq "$TARGET_NAO_VERSION" "$(tr -d '[:space:]' < "$PROJ/.agents/.nao-version" 2>/dev/null)" "AC1: .agents/.nao-version = $TARGET_NAO_VERSION"
assert_eq "$TARGET_NAO_VERSION" "$(tr -d '[:space:]' < "$PROJ/.agents/.nao-migrated" 2>/dev/null)" "AC1: .agents/.nao-migrated = $TARGET_NAO_VERSION"
assert_dir "$PROJ/.agents/.nao-obsolete" "AC1: .agents/.nao-obsolete 存在（备份）"
stamp_dir="$(ls -d "$PROJ/.agents/.nao-obsolete"/*/ 2>/dev/null | head -1)"
[ -n "$stamp_dir" ] && pass "AC1/AC2: 备份 stamp 存在（${stamp_dir#$PROJ/}）" || fail "AC1/AC2: 未找到 .nao-obsolete/<stamp>/"
top="$(agents_top)"
info "AC1: .agents/ 顶层实测 = [$top]（计数 $(ls -A "$PROJ/.agents" | wc -l | tr -d ' ')）"
assert_eq "$(norm_list "$POST_AGENTS_TOP")" "$top" "AC1/§2: 顶层残留集合 = PRD §2 目标集合（不硬记项数）"
assert_eq "0" "$(git ls-files .agents/.nao-obsolete | wc -l | tr -d ' ')" "AC1/BR4/AC8: .nao-obsolete 备份不入库"
shim "$PROJ" check
assert_eq "0" "$RC" "AC1: 经 shim 的 fleet check exit=0"
assert_contains "$OUT$ERR" "check: OK" "AC1: check 输出含 'check: OK'"
assert_contains "$OUT$ERR" "roles=6" "AC1: check 报 roles=6（BR2）"
assert_not_contains "$OUT$ERR" "DEGRADED" "AC1: 正常路径无 DEGRADED"

# ---------------------------------------------------------------------------
hdr "AC2 边界：自有资产保留 / nao 资产已备份移除 / skills-lock 文本级去重"
assert_eq "$(norm_list "$POST_SKILLS_DIRS")" "$(skills_top)" "AC2/BR6: .agents/skills/ 仅自有 nue-ui-dev + lock 3 目录"
assert_absent "$PROJ/.agents/skills/frontend-design" "AC2: nao 资产 .agents/skills/frontend-design 已从 live 移除"
assert_eq "0" "$(ls "$PROJ/.agents/skills"/*.md 2>/dev/null | wc -l | tr -d ' ')" "AC2: 13 个 nao *.md 已从 live 移除"
assert_file "$PROJ/.agents/commands/commit.md" "AC2/BR6: 自有 .agents/commands/commit.md 保留"
assert_eq "$MD5_COMMIT_CMD" "$(md5 "$PROJ/.agents/commands/commit.md")" "AC2/BR6: commit.md 逐字节不变"
assert_eq "$N_NUE_UI_DEV" "$(find "$PROJ/.agents/skills/nue-ui-dev" -type f | wc -l | tr -d ' ')" "AC2/V3: nue-ui-dev 文件数仍 = $N_NUE_UI_DEV"
assert_eq "$SHA_NUE_UI_DEV" "$(dev_manifest)" "AC2/V3: nue-ui-dev 内容指纹不变（触碰数 = 0）"
if [ -n "$BASE_REF" ]; then
  assert_eq "" "$(git diff --name-only "$BASE_REF..HEAD" -- .agents/skills/nue-ui-dev 2>/dev/null | tr '\n' ' ' | sed 's/ *$//')" "AC2/V3: git diff 中 nue-ui-dev 触碰数 = 0"
  assert_eq "" "$(git diff --name-only "$BASE_REF" -- .agents/commands 2>/dev/null | tr '\n' ' ' | sed 's/ *$//')" "AC2/BR6: .agents/commands/ 无改动"
fi
# 备份完整性（nao 资产与旧机制脚本须已备份）
for pat in 'roles.yaml' 'scripts/intercom-probe.mts' 'scripts/nao-fleet.sh' 'skills/frontend-design' 'skills/test-design.md'; do
  hit="$(find "$PROJ/.agents/.nao-obsolete" -path "*$pat*" 2>/dev/null | head -1)"
  [ -n "$hit" ] && pass "AC2: 备份含 ${pat}（${hit#$PROJ/}）" || fail "AC2: 备份缺 ${pat}"
done
old_fleet="$(find "$PROJ/.agents/.nao-obsolete" -path '*scripts/nao-fleet.sh' 2>/dev/null | head -1)"
assert_contains "$(cat "$old_fleet" 2>/dev/null)" "cmd_ensure" "AC1/AC2: 备份内旧 nao-fleet.sh 为 0.11.0 全量脚本（含 cmd_ensure）"
ob_n="$(find "$PROJ/.agents/.nao-obsolete" -type f 2>/dev/null | wc -l | tr -d ' ')"
info "AC2: .nao-obsolete 备份文件数 = $ob_n（旧树 tracked 73 中机制类应尽数入备份）"
[ "$ob_n" -ge 20 ] && pass "AC2: 备份文件数 >= 20（实测 $ob_n）" || fail "AC2: 备份文件数过少（$ob_n）"
if git check-ignore -q ".agents/.nao-obsolete/"; then pass "AC2/BR4: .agents/.nao-obsolete/ 被 git 忽略（不入库）"; else fail "AC2/BR4: .agents/.nao-obsolete/ 未被 git 忽略"; fi

lock_keys="$(node -e 'const s=require(process.argv[1]);process.stdout.write(Object.keys(s.skills||{}).sort().join(","))' "$PROJ/skills-lock.json" 2>/dev/null)"
assert_eq "agent-browser,find-skills,skill-creator" "$lock_keys" "AC2: skills-lock 键 = 3（frontend-design 已移除）"
if [ -n "$BASE_REF" ]; then
  exp_lock="$(node -e '
    const {execSync}=require("child_process");
    const raw=execSync("git show "+process.argv[1]+":skills-lock.json",{encoding:"utf8"});
    const o=JSON.parse(raw); delete o.skills["frontend-design"];
    process.stdout.write(JSON.stringify(o,null,4));
  ' "$BASE_REF" 2>/dev/null)"
  if [ "$exp_lock" = "$(cat "$PROJ/skills-lock.json")" ]; then
    pass "AC2: skills-lock.json = 基线文本级移除 frontend-design 条目（其余字节/缩进/无尾换行不变，逐字节判等）"
  else
    fail "AC2: skills-lock.json 与「基线文本级去重」结果不符（其余字节被改动或重排）"
  fi
  assert_eq "$(md5 "$PROJ/skills-lock.json")" "$(printf '%s' "$exp_lock" | md5sum | awk '{print $1}')" "AC2: skills-lock.json md5 = 期望文本 md5"
  # 独立复算：与 master 比只删不加（frontend-design 条目 = 6 行）
  assert_eq "0	6	skills-lock.json" "$(git diff --numstat "$BASE_REF" -- skills-lock.json 2>/dev/null | tr -s '\t' '\t')" "AC2: git diff master→工作区 skills-lock.json = +0 / -6 行（与原文删 6 行逐字节相等）"
  bak_lock="$(find "$PROJ/.agents/.nao-obsolete" -name 'skills-lock.json' 2>/dev/null | head -1)"
  [ -n "$bak_lock" ] && assert_eq "$MD5_SKILLS_LOCK" "$(md5 "$bak_lock")" "AC2: 原 skills-lock.json 已备份且 md5 = 基线" || fail "AC2: 未找到 skills-lock.json 备份"
fi

# ---------------------------------------------------------------------------
hdr "AC3 设计一致性：AGENTS.md 机制段改写（三要点） + B/C 类零改写 + 裸机制引用 $BASE_BARE_MECH → 0"
agents_txt="$(cat "$PROJ/AGENTS.md" 2>/dev/null)"
# ---- AC3① 改写正向要求 ----
assert_contains "$agents_txt" '$NAO_SKILLS' "AC3①: AGENTS.md 引入 \$NAO_SKILLS 指针"
assert_contains "$agents_txt" '.pi/settings.json' "AC3①: 版本唯一事实来源指向 .pi/settings.json"
assert_contains "$agents_txt" "$PIN_SPEC" "AC3①: AGENTS.md 明示 pin = $PIN_SPEC"
assert_contains "$agents_txt" '已退役的判据' "AC3①: 旧判据被显式标注「已退役」"
assert_contains "$agents_txt" '作废' "AC3①: 旧判据被显式标注「作废」"
# ---- AC3①/② 旧**祈使句**必须消失（不得仅凭 token 出现与否判定：新文会在退役语境中提及旧字样）----
for old in '同步完成后必须用' '不要为了通过 fmt 而去格式化前两个文件' '逐字节同步的资产' '属**本仓自身**的格式债'; do
  assert_not_contains "$agents_txt" "$old" "AC3①/②: 旧祈使句已退役：[$old]"
done
# 承载 sha256sum / 「稳定报 3 个文件」的行必须处于退役语境（含 退役/作废/不成立）
while IFS= read -r ln; do
  case "$ln" in
    *退役*|*作废*|*不成立*) pass "AC3①/②: 旧判据字样仅出现于退役语境（$(printf '%s' "$ln" | cut -c1-40)…）" ;;
    *) fail "AC3①/②: 旧判据字样出现在非退役语境：$(printf '%s' "$ln" | cut -c1-80)" ;;
  esac
done < <(printf '%s\n' "$agents_txt" | grep -E 'sha256sum|稳定报 3 个文件' || true)
assert_contains "$agents_txt" '不再为对齐 fmt 而格式化' "AC3③: 明示「不再为对齐 fmt 而格式化机制资产」"
assert_contains "$agents_txt" 'scripts/nao-fleet.sh' "AC3: 入口 shim 用法仍在 AGENTS.md（旧命令照常可用）"
# ---- AC3 主判据：裸机制引用 5 → 0 ----
b="$(bare_mech_refs)"
assert_eq "0" "$b" "AC3 主判据: 入库文件裸机制引用 = 0（基线 $BASE_BARE_MECH；PM 裁定口径）"
# ---- AC3 副指标（§3 逐行口径）：B/C 类不变，A 类全部转为 $NAO_SKILLS 前缀形式 ----
A2="$(ref_face_A)"; B2="$(ref_face_B)"; C2="$(ref_face_C)"; BF2="$(ref_face_B_files)"
assert_eq "$BASE_REF_FACE_B" "$B2" "AC3: B 类行数不变 = $BASE_REF_FACE_B（逐行口径）"
assert_eq "6" "$BF2" "AC3: B 类命中文件数不变 = 6（逐行口径）"
assert_eq "$BASE_REF_FACE_C" "$C2" "AC3: C 类行数不变 = $BASE_REF_FACE_C"
assert_eq "0" "$(sed 's|\$NAO_SKILLS/\.agents|@MECH@|g' <<<"$agents_txt" | grep -c '\.agents')" "AC3: AGENTS.md 内机制路径均为 \$NAO_SKILLS 前缀形式（无裸引用行）"
info "AC3: 引用面逐行实测 = A=$A2 · B=$B2（$BF2 文件）· C=$C2 · 合计 $(ref_face_all) 行 / $(ref_face_files) 文件（基线 22 行 / 8 文件；A 类改写后含 \$NAO_SKILLS 指针属预期，裸引用已归零）"
assert_eq "$MD5_VITE_CONFIG" "$(md5 "$PROJ/vite.config.ts")" "AC3-C/BR5: vite.config.ts 逐字节不变（.pi/** 已在 fmt.ignorePatterns）"
assert_eq "$MD5_SKILL_README" "$(md5 "$PROJ/packages/nue-ui-skill/README.md")" "AC3-B: packages/nue-ui-skill/README.md 逐字节不变"
assert_eq "$MD5_SKILL_TEST" "$(md5 "$PROJ/packages/nue-ui-skill/__tests__/install.test.ts")" "AC3-B: install.test.ts 逐字节不变"
assert_eq "$MD5_SKILL_BIN" "$(md5 "$PROJ/packages/nue-ui-skill/bin/nue-ui-skill.mjs")" "AC3-B: bin/nue-ui-skill.mjs 逐字节不变"
assert_eq "$MD5_DOC_USAGE" "$(md5 "$PROJ/apps/document/skill/usage.md")" "AC3-B: apps/document/skill/usage.md 逐字节不变"
assert_eq "$MD5_DOC_CLI" "$(md5 "$PROJ/apps/document/skill/cli.md")" "AC3-B: apps/document/skill/cli.md 逐字节不变"
assert_eq "$MD5_DOC_INSTALL" "$(md5 "$PROJ/apps/document/skill/install.md")" "AC3-B: apps/document/skill/install.md 逐字节不变"
assert_eq "14" "$(git ls-files packages/nue-ui-skill apps/document/skill | wc -l | tr -d ' ')" "AC3-B: B 类入库文件数仍 = 14"
assert_eq ".agents/skills/nue-ui" "$(git grep -I -h -o '\.agents/skills/nue-ui\b' -- packages/nue-ui-skill apps/document/skill 2>/dev/null | sort -u | tr '\n' ' ' | sed 's/ *$//')" "AC3-B: B 类保留的自有安装目标语义 .agents/skills/nue-ui 未被改写"

# ---------------------------------------------------------------------------
hdr "AC4 配置：.gitignore 放行 pin / settings 内容 / V6 零副作用"
if git check-ignore -q ".pi/settings.json"; then fail "AC4: .pi/settings.json 仍被忽略（应被 !.pi/settings.json 放行）"; else pass "AC4: .pi/settings.json 未被忽略（可入库）"; fi
if git check-ignore -q ".pi/npm/package.json"; then pass "AC4: .pi/npm/** 仍被忽略（本地物化产物）"; else fail "AC4: .pi/npm/** 未被忽略"; fi
pi_rule="$(grep -n '^\.pi/\*$' "$PROJ/.gitignore" | head -1 | cut -d: -f1)"
pi_neg="$(grep -n '^!\.pi/settings\.json$' "$PROJ/.gitignore" | head -1 | cut -d: -f1)"
[ -n "$pi_rule" ] && pass "AC4: .gitignore 含 .pi/* 规则（L$pi_rule）" || fail "AC4: .gitignore 缺 .pi/* 规则"
[ -n "$pi_neg" ] && pass "AC4: .gitignore 含 !.pi/settings.json 放行（L$pi_neg）" || fail "AC4: .gitignore 缺 !.pi/settings.json"
if [ -n "$pi_rule" ] && [ -n "$pi_neg" ]; then
  [ "$pi_rule" -lt "$pi_neg" ] && pass "AC4: 忽略在前、放行在后（gitignore 语义顺序正确）" || fail "AC4: 规则顺序错误（放行须在忽略之后）"
fi
grep -q '^\.agents/\.nao-obsolete/$' "$PROJ/.gitignore" && pass "AC4: .gitignore 新增 .agents/.nao-obsolete/ 忽略" || fail "AC4: .gitignore 缺 .agents/.nao-obsolete/ 忽略"
assert_eq ".pi/settings.json" "$(git ls-files .pi | tr '\n' ' ' | sed 's/ *$//')" "AC4: git ls-files .pi = 恰好 .pi/settings.json（基线 0 ⇒ 恰好 +1）"
assert_eq "1" "$(git ls-files .pi | wc -l | tr -d ' ')" "AC4: 迁移前后 .pi 入库变化 = 恰好 +1"
pin="$(node -e 'const s=require(process.argv[1]);const a=(s.packages||[]).filter(p=>/nao-skill/.test(p));process.stdout.write(a.join(","))' "$PROJ/.pi/settings.json" 2>/dev/null)"
assert_eq "$PIN_SPEC" "$pin" "AC4: .pi/settings.json pin = $PIN_SPEC（语义断言，排版不约束）"
assert_eq "$MD5_VITE_CONFIG" "$(md5 "$PROJ/vite.config.ts")" "AC4/BR5: vite.config.ts 不改（md5 基线）"
assert_eq "$MD5_PNPM_LOCK" "$(md5 "$PROJ/pnpm-lock.yaml")" "AC4/V6: pnpm-lock.yaml 未被 pi install -l 改动（md5 基线）"
if [ -n "$BASE_REF" ]; then
  assert_eq "" "$(git diff --name-only "$BASE_REF..HEAD" -- pnpm-lock.yaml packages/nue-ui-skill 2>/dev/null | tr '\n' ' ' | sed 's/ *$//')" "AC4/V6/AC8: 本批未改动 pnpm-lock.yaml 与 packages/nue-ui-skill"
fi

# ---------------------------------------------------------------------------
hdr "AC5 门禁：fleet check / test:run / 4 build / check:lf / vp check 差异数"
shim "$PROJ" check
assert_eq "0" "$RC" "AC5: fleet check exit=0（roles=6 见 AC1）"
if [ "${T508_SKIP_GATES:-}" = "1" ]; then
  info "AC5: 跳过门禁（T508_SKIP_GATES=1；由批末全仓门禁统一跑）"
else
  t0=$(now_ms); pnpm test:run >"$TMP/t.log" 2>&1; rc=$?; t1=$(now_ms)
  assert_eq "0" "$rc" "AC5: pnpm test:run exit=0（$(( (t1-t0)/1000 ))s）"
  info "AC5: test:run 结果 = $(grep -E '^ *Test Files|^ *Tests ' "$TMP/t.log" | tr -s ' ' | tr '\n' ' ')"
  if [ "${T508_SKIP_BUILDS:-}" = "1" ]; then
    info "AC5: 跳过 4 个 build（T508_SKIP_BUILDS=1）"
  else
    for b in "core build" "shadlike-theme build" "iconfont build" "document build"; do
      t0=$(now_ms); pnpm $b >"$TMP/b.log" 2>&1; rc=$?; t1=$(now_ms)
      assert_eq "0" "$rc" "AC5: pnpm $b exit=0（$(( (t1-t0)/1000 ))s）"
    done
  fi
  t0=$(now_ms); pnpm check:lf >"$TMP/lf.log" 2>&1; rc=$?; t1=$(now_ms)
  assert_eq "0" "$rc" "AC5: pnpm check:lf exit=0（$(( (t1-t0)/1000 ))s）"
fi
ft="$(fmt_diff_tracked)"; fa="$(fmt_diff_all)"
assert_eq "0" "$ft" "AC5: 入库文件 vp fmt 差异文件数 = 0（≤ 基线 $BASE_FMT_DIFF_TRACKED）"
assert_eq "0" "$fa" "AC5: 全树 pnpm exec vp fmt --list-different . = 0 文件（PM 裁定：本批 docs/** 纳入，不排除）"
info "AC5: 差异清单 = [$( ( pnpm exec vp fmt --list-different . 2>/dev/null || true ) | grep -vE '^[[:space:]]*$|^Checking formatting' | tr '\n' ' ' )]"
t0=$(now_ms); pnpm exec vp check --no-fmt >"$TMP/ck.log" 2>&1; rc=$?; t1=$(now_ms)
assert_eq "0" "$rc" "AC5: vp check --no-fmt（lint+type）exit=0（$((t1-t0))ms）"
lr="$(grep -o 'in [0-9]* files' "$TMP/ck.log" | grep -o '[0-9]*' | head -1)"
assert_eq "$(lint_files_tracked)" "$lr" "AC5: 报数 = 当前入库可 lint 扩展名文件数（独立推导）"
assert_eq "$POST_LINT_FILES" "$lr" "AC5: vp check --no-fmt 文件数 = $POST_LINT_FILES"
assert_eq "$BASE_LINT_FILES" "$(lint_files_rev master)" "AC5: master 可 lint 文件数 = $BASE_LINT_FILES（基线）"
info "AC5 差值原因（Δ = $((POST_LINT_FILES-BASE_LINT_FILES))）：master $BASE_LINT_FILES → HEAD $POST_LINT_FILES，差额恰为离开的唯一可 lint 文件 .agents/scripts/intercom-probe.mts；.md/.json 不参与 lint ⇒ 新增 docs/prds/*.md、.pi/settings.json、.agents/.nao-migrated 均不增数"

# ---------------------------------------------------------------------------
hdr "AC6 负向闭环：旧命令经 shim / qq-notify / 缺包降级 / 回滚"
shim "$PROJ" status
assert_eq "0" "$RC" "AC6: shim status exit=0（旧命令仍可用）"
shim "$PROJ" ensure __t508_probe__
assert_ne "0" "$RC" "AC6: shim ensure 对未知角色非 0（证明转发到包内 fleet，未静默）"
assert_contains "$OUT$ERR" "未知角色" "AC6: ensure 报错来自包内 fleet（未知角色）"
shim "$PROJ" ensure
assert_ne "0" "$RC" "AC6: shim ensure 无参数非 0（进入包内 cmd_ensure 守卫）"
assert_contains "$OUT$ERR" "至少一个角色" "AC6: ensure 无参守卫报文来自包内 fleet"
info "AC6 说明：真实角色 ensure <role> 会经 spawn_one→detect_host 拉起 tmux/GUI 宿主会话（PM 已知 close 对跨仓派生会话有缺陷）⇒ 本脚本不执行真实角色拉起，改以 status rc=0 + 未知角色/无参守卫 + check roles=6 覆盖「转发通路 + 角色表完整性」；此为本仓偏离 PM 建议演练项的一个显式安全取舍"
if [ -n "$PKG_ROOT" ] && [ -x "$PKG_ROOT/.agents/scripts/qq-notify" ]; then
  pass "AC6: \$NAO_SKILLS/.agents/scripts/qq-notify 存在且可执行"
  ( "$PKG_ROOT/.agents/scripts/qq-notify" --dry-run "T508 qa dry-run" ) >"$TMP/qq.log" 2>&1
  assert_eq "0" "$?" "AC6: qq-notify --dry-run \"文本\" exit=0"
  assert_contains "$(cat "$TMP/qq.log")" "dry-run" "AC6: qq-notify dry-run 输出可辨认"
  ( "$PKG_ROOT/.agents/scripts/qq-notify" --dry-run ) >"$TMP/qq2.log" 2>&1; rc2=$?
  info "AC6 口径：裸 \`qq-notify --dry-run\`（无文本）实测 rc=$rc2 —— 契约形式须带文本（rc=1 属其文档契约，不作失败）"
else
  fail "AC6: 包内 qq-notify 不存在或不可执行"
fi
# 缺包降级：temp fixture（不动真树）
fx="$TMP/fixture-proj"; mkdir -p "$fx/.agents/scripts" "$fx/.pi" "$fx/home"
cp "$PROJ/.agents/scripts/nao-fleet.sh" "$fx/.agents/scripts/nao-fleet.sh"
printf '{"packages":["%s"]}\n' "$PIN_SPEC" > "$fx/.pi/settings.json"
( cd "$fx" && env -u NAO_SKILLS -u NAO_SHIM_ENTERED -u PI_CODING_AGENT_DIR HOME="$fx/home" \
    bash .agents/scripts/nao-fleet.sh check ) >"$TMP/d.log" 2>&1; rc=$?
joined="$(cat "$TMP/d.log")"
assert_eq "2" "$rc" "AC6/NFR3: 缺包场景 shim exit=2"
assert_eq "1" "$(printf '%s\n' "$joined" | grep -cE '^DEGRADED:' || true)" "AC6/NFR3: 恰一行 DEGRADED:"
assert_contains "$joined" "pi install" "AC6/NFR3: 含可复制恢复命令（pi install）"
assert_not_contains "$joined" "check: OK" "AC6/NFR3: 不静默成功"
if [ "${T508_REAL_DEGRADED:-}" = "1" ]; then
  if [ -d "$PROJ/.pi/npm" ]; then
    mv "$PROJ/.pi/npm" "$PROJ/.pi/npm.t508bak"
    ( cd "$PROJ" && env -u NAO_SKILLS -u NAO_SHIM_ENTERED -u PI_CODING_AGENT_DIR HOME="$EMPTY_HOME" \
        bash .agents/scripts/nao-fleet.sh check ) >"$TMP/rd.log" 2>&1; rc=$?
    restore_npm
    joined="$(cat "$TMP/rd.log")"
    assert_eq "2" "$rc" "AC6/NFR3(真树): 移走 .pi/npm 后 shim exit=2"
    assert_eq "1" "$(printf '%s\n' "$joined" | grep -cE '^DEGRADED:' || true)" "AC6/NFR3(真树): 恰一行 DEGRADED:"
    assert_contains "$joined" "pi install" "AC6/NFR3(真树): 含恢复命令"
    info "AC6/NFR3(真树): .pi/npm 已恢复（$( [ -d "$PROJ/.pi/npm" ] && echo ok || echo MISSING )）"
  else
    warn "AC6/NFR3(真树): .pi/npm 不存在，跳过"
  fi
else
  info "AC6/NFR3(真树): 未启用（T508_REAL_DEGRADED=1 时在独占窗口执行）"
fi

# ---------------------------------------------------------------------------
hdr "AC6 / NFR1 回滚：git worktree 内 revert 本批提交后 check exit=0"
if [ "${T508_ROLLBACK:-}" = "1" ]; then
  if [ -z "$BASE_REF" ]; then
    warn "AC6/NFR1: 无法确定 origin/master 基线，跳过回滚实测"
  else
    wt="$TMP/wt-rollback"
    if git worktree add --detach "$wt" HEAD >/dev/null 2>&1; then
      revs="$(git rev-list "$BASE_REF..HEAD")"   # 逆时序（新→旧）——撤销一批提交须从新到旧
      ok=1
      for c in $revs; do ( cd "$wt" && git revert --no-edit "$c" ) >/dev/null 2>&1 || ok=0; done
      if [ "$ok" = "1" ]; then
        pass "AC6/NFR1: worktree 内逆时序 revert 本批 $(printf '%s' "$revs" | wc -w | tr -d ' ') 个提交成功"
        assert_dir "$wt/.agents/prompts" "AC6/NFR1: revert 后旧机制目录 .agents/prompts 恢复"
        assert_absent "$wt/.agents/.nao-migrated" "AC6/NFR1: revert 后 .nao-migrated 消失（回到 0.11 形态）"
        assert_contains "$(cat "$wt/.agents/scripts/nao-fleet.sh" 2>/dev/null)" "cmd_ensure" "AC6/NFR1: revert 后 nao-fleet.sh 回到 0.11.0 全量脚本"
        ( cd "$wt" && env -u NAO_SKILLS -u NAO_SHIM_ENTERED bash .agents/scripts/nao-fleet.sh check ) >"$TMP/rb.log" 2>&1
        assert_eq "0" "$?" "AC6/NFR1: revert 后 .agents/scripts/nao-fleet.sh check exit=0"
        tail -1 "$TMP/rb.log" | sed 's/^/[rollback check] /'
      else
        fail "AC6/NFR1: worktree 内 revert 失败（冲突或非本批提交）"
      fi
      git worktree remove --force "$wt" >/dev/null 2>&1 || true
    else
      fail "AC6/NFR1: git worktree add 失败"
    fi
  fi
else
  info "AC6/NFR1 回滚：未启用（T508_ROLLBACK=1 时执行）"
fi

# ---------------------------------------------------------------------------
hdr "幂等：二次 migrate / check 的 rc 与 effect"
if [ "${T508_IDEMPOTENT:-}" = "1" ]; then
  if [ -n "$PKG_ROOT" ]; then
    before_status="$(git status --porcelain | sort)"
    before_obs="$(ls -A "$PROJ/.agents/.nao-obsolete" 2>/dev/null | sort | tr '\n' ' ')"
    before_md5="$(md5 "$PROJ/AGENTS.md") $(md5 "$PROJ/.pi/settings.json") $(md5 "$PROJ/skills-lock.json") $(md5 "$PROJ/.agents/scripts/nao-fleet.sh") $(md5 "$PROJ/.agents/.nao-version")"
    ( cd "$TMP" && node "$PKG_ROOT/bin/nao-skill.js" migrate "$PROJ" -v ) >"$TMP/idem.log" 2>&1; rc=$?
    assert_eq "0" "$rc" "幂等: 二次 migrate（包内同一 0.12.0 二进制）exit=0"
    assert_eq "$before_status" "$(git status --porcelain | sort)" "幂等: 二次 migrate 后 git status 不变"
    assert_eq "$before_obs" "$(ls -A "$PROJ/.agents/.nao-obsolete" 2>/dev/null | sort | tr '\n' ' ')" "幂等: 未新增 .nao-obsolete/<stamp> 备份目录"
    assert_eq "$before_md5" "$(md5 "$PROJ/AGENTS.md") $(md5 "$PROJ/.pi/settings.json") $(md5 "$PROJ/skills-lock.json") $(md5 "$PROJ/.agents/scripts/nao-fleet.sh") $(md5 "$PROJ/.agents/.nao-version")" "幂等: 关键文件 md5 均不变"
    shim "$PROJ" check
    assert_eq "0" "$RC" "幂等: 二次 check exit=0"
    info "幂等: 二次 migrate 输出 = $(tr '\n' ' ' < "$TMP/idem.log" | cut -c1-400)"
  else
    warn "幂等: 机制包未物化，跳过"
  fi
else
  info "幂等: 未启用（T508_IDEMPOTENT=1 时执行二次 migrate + check）"
fi

# ---------------------------------------------------------------------------
hdr "AC7/AC8 治理与非范围守护（git 口径，base = origin/master）"
if [ -n "$BASE_REF" ]; then
  n="$(git rev-list --count "$BASE_REF..HEAD" 2>/dev/null || echo '?')"
  info "AC7: 分支提交数 = $n（AC7 的「恰好 1 条」在 squash 合并后的 master 上成立；分支可含 PRD 收录 + 迁移 + QA 脚本等多条）"
  wipn="$(git log --format=%s "$BASE_REF..HEAD" 2>/dev/null | grep -ciE '^wip[(:]' || true)"
  info "AC7: 分支上 wip() 提交数 = $wipn（squash 前预期 >1；按 PM 要求只记录不判失败）"
  assert_eq "0" "$(git log --format=%s origin/master 2>/dev/null | grep -ciE '^wip[(:]' || true)" "AC7: origin/master 上无 wip() 提交"
  clean="$(git status --porcelain 2>/dev/null)"
  assert_eq "" "$clean" "AC7: 工作区干净"
  st="$(git diff --name-status "$BASE_REF..HEAD" 2>/dev/null)"
  hit="$(printf '%s\n' "$st" | awk '{print $2}' | grep -E "$NON_SCOPE_RE" | head -5 | tr '\n' ' ')"
  assert_eq "" "$hit" "AC8: 本批未触碰 packages/** · apps/** · vite.config.ts · .github/workflows/** · pnpm-lock.yaml · .agents/commands/ · .agents/skills/nue-ui-dev/"
  del="$(printf '%s\n' "$st" | awk '$1=="D"{print $2}' | grep -vE '^\.agents/(prompts|common|checklists|templates)/|^\.agents/roles\.yaml$|^\.agents/scripts/(intercom-probe\.mts|qq-notify|ui-tokens-check\.sh)$|^\.agents/skills/(frontend-design/.+|[a-z0-9-]+\.md)$' | head -5 | tr '\n' ' ')"
  assert_eq "" "$del" "AC8: 本批删除项仅限 LEGACY 机制资产（无越界删除）"
  adds="$(git log --all --format=%s --diff-filter=A -- docs/reports/ 2>/dev/null | tr '\n' '|')"
  if [ -z "$adds" ]; then
    warn "AC8: docs/reports/ 尚未入库（提交前属预期）"
  elif printf '%s' "$adds" | grep -qi 'qa'; then
    pass "AC8: docs/reports/ 由 QA 提交引入（非 RD 迁移提交）：$adds"
  else
    fail "AC8: docs/reports/ 由非 QA 提交引入：$adds"
  fi
  # 全部触碰 docs/reports/ 的提交都必须是 QA 的（含修改）
  rdocs="$(git log --all --format='%h %s' -- docs/reports/ 2>/dev/null)"
  if [ -z "$rdocs" ]; then
    warn "AC8: 无任何提交触碰 docs/reports/（提交前属预期）"
  elif printf '%s\n' "$rdocs" | grep -viE 'qa' | grep -q .; then
    fail "AC8: 存在非 QA 提交触碰 docs/reports/：$(printf '%s\n' "$rdocs" | grep -viE 'qa' | tr '\n' '|')"
  else
    pass "AC8: 触碰 docs/reports/ 的提交均为 QA 提交（$(printf '%s\n' "$rdocs" | wc -l | tr -d ' ') 条）"
  fi
  # PR #73 / CI（无 gh 或离线则如实申报，不伪造）
  if command -v gh >/dev/null 2>&1; then
    prj="$(gh pr view 73 --json isDraft,title,headRefName,baseRefName,state,mergeStateStatus 2>/dev/null || true)"
    if [ -n "$prj" ]; then
      pdraft="$(printf '%s' "$prj" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const o=JSON.parse(s);process.stdout.write([o.state,"draft="+o.isDraft,"head="+o.headRefName,"base="+o.baseRefName,"title="+o.title].join(" | "))}catch(e){process.stdout.write("parse-fail")}})')"
      info "AC7: PR #73 = $pdraft"
      assert_contains "$pdraft" "head=feat/72-nao-fleet-migration" "AC7: PR #73 head 分支正确"
      assert_contains "$pdraft" "base=master" "AC7: PR #73 base = master"
      case "$pdraft" in
        *draft=true*) info "AC7: PR #73 仍为 Draft（PM 未授权前不合并，符合要求）";;
        *) warn "AC7: PR #73 已非 Draft（请复核是否已获授权）";;
      esac
      prcheck="$(gh pr checks 73 2>&1 | tail -20 || true)"
      if [ -n "$prcheck" ]; then
        info "AC7: PR #73 CI = $(printf '%s' "$prcheck" | tr '\n' '|' | cut -c1-300)"
      else
        info "AC7: PR #73 无 CI 检查项（本仓 workflow 对 .agents/nao-fleet 0 命中，符合预期）"
      fi
    else
      warn "AC7: gh 查询 PR #73 失败（离线/无权限）⇒ 如实申报，未核 PR 状态"
    fi
  else
    warn "AC7: 本机无 gh ⇒ PR #73 状态未核（如实申报，不推测）"
  fi
else
  warn "AC7/AC8: 无 origin/master 基线，跳过"
fi

# ---------------------------------------------------------------------------
hdr "汇总"
printf 'PASS=%d  FAIL=%d  WARN=%d\n' "$PASS" "$FAIL" "$WARN"
if [ "$FAIL" -eq 0 ]; then printf '%sALL GREEN%s（warn=%d）\n' "$G" "$N" "$WARN"; exit 0
else printf '%sFAIL=%d%s\n' "$R" "$FAIL" "$N"; exit 1; fi

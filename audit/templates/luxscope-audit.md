# LuxScope Audit — {{CLIENT_NAME}}

**Repository:** {{REPO_NAME}} · {{COMMIT_SHA}}
**Prepared by:** Daniel Oceno · Stelnyx
**Date:** {{DATE}}
**Engagement:** LuxScope Audit ($499) — codebase intelligence, one-time, with a live debrief
**Confidential.** Prepared for {{CLIENT_NAME}} under NDA dated {{NDA_DATE}}. Scan artifacts deleted on {{ARTIFACT_DELETE_DATE}}.

---

## 1. Executive summary

> 3–5 sentences a non-engineer (board member, acquirer, investor) can read. State the headline codebase-health score, the single biggest structural risk, and the top recommendation. No jargon.

- **Codebase health score:** {{SCORE}} / 100  (LuxScope rule {{RULE_VERSION}})
- **Bottom line:** {{ONE_LINE_VERDICT}}
- **Biggest risk:** {{TOP_RISK}}
- **First thing I'd do:** {{TOP_RECOMMENDATION}}

| Verdict band | Meaning |
|---|---|
| 85–100 | Healthy. Changes are predictable; onboarding is fast. |
| 70–84 | Workable, with hotspots. Specific modules need attention before major changes. |
| 50–69 | Risky. Change-impact is hard to predict; diligence will surface this. |
| < 50 | Structural debt. Treat refactor as a line item before a raise or sale. |

## 2. Scope & methodology

- Tool: LuxScope CLI, deterministic static analysis — no LLMs, no network calls, no synthesized claims. Same input, same output.
- Command run: `luxscope analyze . --format json` (+ `--format sarif` for the appendix).
- Scope: {{LANGUAGES}} · {{FILE_COUNT}} files · {{LOC}} LOC. Excluded: {{EXCLUSIONS}} (vendored deps, generated code, etc.).
- Manual layer: I read the top-{{N}} risk-scored modules myself and the dependency graph around them. The score is the machine's; the interpretation, the fix order, and the effort estimates are mine.
- Not covered by this engagement: runtime behavior, security scanning (see SecGate), test quality, infra/CI. Called out where relevant but not scored.

## 3. Scorecard

| Dimension | Score | Notes |
|---|---|---|
| Dependency clarity | {{}} / 100 | {{}} |
| Change-impact predictability | {{}} / 100 | {{}} |
| Module ownership / cohesion | {{}} / 100 | {{}} |
| Dead code / cruft | {{}} / 100 | {{}} |
| Documentation accuracy | {{}} / 100 | {{}} |
| **Overall** | **{{SCORE}} / 100** | |

## 4. Architecture map

> Insert the LuxScope-generated dependency diagram(s). Annotate: where the system's "spine" is, which modules everything depends on (the load-bearing walls), and where the graph is unexpectedly tangled.

- System spine: {{}}
- Highest fan-in modules (touch these, touch everything): {{}}
- Unexpected coupling: {{}}
- Isolated / safely-removable subsystems: {{}}

## 5. Change-impact hotspots

For each hotspot — what it is, why it's risky, what's downstream, and the cost of leaving it.

### Hotspot 1 — {{MODULE}}
- **Blast radius:** {{N}} modules / {{N}} call sites downstream.
- **Why it's risky:** {{}}
- **What breaks if you change it carelessly:** {{}}
- **Recommendation:** {{}}  ·  **Effort:** {{S/M/L}}  ·  **Impact:** {{}}

### Hotspot 2 — {{MODULE}}
{{…repeat…}}

## 6. Dependency drift

- Outdated / unmaintained packages on the critical path: {{}}
- Duplicate or conflicting dependency versions: {{}}
- Packages doing far more than the code uses (replaceable / removable): {{}}
- Supply-chain notes (deep transitive trees, single-maintainer deps): {{}}

## 7. Dead code & cruft

- Unreferenced modules / exports: {{}}
- Orphaned subsystems (no inbound edges): {{}}
- Feature-flag graveyard / commented-out blocks of significance: {{}}
- Estimated removable surface: ~{{N}} files / ~{{LOC}} LOC. (Diligence finds this; better you do.)

## 8. Documentation accuracy

- Where the README / docs diverge from what the code does: {{}}
- Modules with zero explanatory comments and high complexity: {{}}
- The two-week-onboarding tax: {{}}
- Generated docs delivered alongside this report: {{ATTACHMENT}}

## 9. Prioritized fix list

Ordered by impact-per-effort. This is the punch list.

| # | Fix | Why it matters | Effort | Impact | Owner suggestion |
|---|---|---|---|---|---|
| 1 | {{}} | {{}} | S | High | {{}} |
| 2 | {{}} | {{}} | M | High | {{}} |
| 3 | {{}} | {{}} | S | Med | {{}} |
| 4 | {{}} | {{}} | L | High | {{}} |
| 5 | {{}} | {{}} | M | Med | {{}} |

**If you do only three things:** {{1}}, {{2}}, {{3}}.

## 10. What continuous monitoring would catch

This audit is a snapshot. Between now and your next major change, the score drifts. If you want the timeline — scan history, drift alerts when health drops, cross-repo architecture maps, private-repo scans in CI — that's the LuxScope Team tier (roadmap). For the next 30 days I'll re-run LuxScope against your repo once on request and send the diff at no extra cost: {{RESCAN_BY_DATE}}.

## 11. Live debrief

- Scheduled: {{CAL_LINK_OR_TIME}} ({{DURATION}} min)
- Bring: whoever owns the modules in §5, and whoever's deciding what to fix.
- We'll walk §1, §4, §5, and §9. The rest is reference.

## Appendix A — raw scan output

- `luxscope-{{CLIENT}}-{{DATE}}.json` (full deterministic report)
- `luxscope-{{CLIENT}}-{{DATE}}.sarif` (for your code-scanning UI)
- Generated diagrams: {{}}

## Appendix B — how to reproduce this

```bash
git clone <repo> && cd <repo>
# build LuxScope from source (npm package shipping shortly):
git clone https://github.com/tinydarkforge/luxscope && (cd luxscope && pnpm i && pnpm build)
node luxscope/packages/cli/dist/index.js analyze . --format json > luxscope-report.json
```

Deterministic — you'll get the same score I did on the same commit. That's the point.

# Product Discovery v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dense PDD v1 with a verified, readable 30–45 page hybrid product/academic document while preserving v1 and publishing v2 to the web and D1.

**Architecture:** Treat source verification, synthesis, document validation, web registry, and D1 publication as separate boundaries. The Markdown file remains the committed source; D1 receives an exact published copy and revision record. V1 remains an immutable archive document.

**Tech Stack:** Markdown, Python validator, Next.js static export, Vitest, Cloudflare Workers, D1, Wrangler.

## Global Constraints

- Preserve `content/archive/product-discovery-v1-2026-07-28.md` unchanged.
- Main audience combines nontechnical stakeholders and product/UI/development teams.
- Target 30–45 exported pages; use 12,000–18,000 Indonesian words as a practical corridor.
- Keep facts, interpretations, assumptions, recommendations, and validation needs explicitly separated.
- Do not fabricate interviews, statistics, competitor features, or security guarantees.
- Keep the existing five research labels and explain technical terms on first use.
- Maintain V1/V1.1/Future scope boundaries.
- GitHub Pages may remain as legacy fallback; Cloudflare Worker is the active deployment.

---

### Task 1: Research Ledger Refresh

**Files:**
- Create: `content/sources/product-discovery-v2-sources.md`
- Read: `content/competitor-research.md`
- Read: `content/security-privacy-research.md`

**Interfaces:**
- Produces: verified source ledger with direct URL, title, accessed date, evidence class, claim, decision impact, and status.

- [ ] Verify official competitor, Google/Microsoft Forms, OWASP/NIST/WCAG, UU PDP, and Indonesian campus study URLs.
- [ ] Record failed URLs as research traces only, never evidence.
- [ ] Write contradiction and evidence-limit notes.
- [ ] Check every cited URL with HTTP requests.
- [ ] Commit the refreshed ledger.

### Task 2: Product Discovery v2 Draft

**Files:**
- Modify: `content/product-discovery.md`
- Read: `content/archive/product-discovery-v1-2026-07-28.md`
- Read: `docs/superpowers/specs/2026-07-29-product-discovery-v2-design.md`

**Interfaces:**
- Consumes: Task 1 ledger.
- Produces: 40-section Markdown document following the approved decision flow.

- [ ] Write Part I for decision makers in plain Indonesian.
- [ ] Write Part II discovery evidence and decisions.
- [ ] Write Part III product definition and traceability.
- [ ] Write Part IV security/technical explanation with first-use definitions.
- [ ] Write Part V validation/execution and references.
- [ ] Remove repetition and run anti-slop review.
- [ ] Verify word corridor and required sections.
- [ ] Commit the draft.

### Task 3: Deterministic Document Validator

**Files:**
- Create: `scripts/validate-pdd-v2.py`
- Create: `scripts/validate-pdd-v2.test.py`
- Modify: `package.json`

**Interfaces:**
- Produces: command `npm run validate:pdd` that exits nonzero for missing sections, placeholders, broken local links, missing labels, duplicate heading IDs, too-short content, or missing source ledger.

- [ ] Write fixtures/tests for one valid and several invalid documents.
- [ ] Run tests and observe failures before implementation.
- [ ] Implement validation functions and CLI.
- [ ] Run validator against the real PDD.
- [ ] Commit validator and tests.

### Task 4: Archive Web Integration

**Files:**
- Modify: `src/lib/documents.ts`
- Modify: `src/components/shell.tsx`
- Modify: `src/app/globals.css`
- Copy/create: `content/product-discovery-v1-archive.md`

**Interfaces:**
- Produces: archive route `/documents/product-discovery-v1-archive`, grouped navigation, search coverage, and raw download.

- [ ] Write a failing registry/search test for the archive.
- [ ] Add the archive as a registered document.
- [ ] Add navigation grouping metadata and restrained group labels.
- [ ] Build and verify all routes.
- [ ] Commit web integration.

### Task 5: D1 Revision and Exact Publication

**Files:**
- Create temporary SQL under `/tmp` only.
- Modify no secrets.

**Interfaces:**
- Consumes: committed `content/product-discovery.md`.
- Produces: one D1 revision preserving old published Markdown and exact v2 content as current published Markdown.

- [ ] Query current D1 published hash/length.
- [ ] Insert current publication into `document_revisions` with note `Archive before PDD v2`.
- [ ] Update Product Discovery with exact v2 Markdown in one remote D1 operation.
- [ ] Add archive document if absent.
- [ ] Verify remote lengths and hashes by retrieving API content.

### Task 6: Full Verification and Deployment

**Files:**
- Modify: `README.md` if publication workflow changed.

**Interfaces:**
- Produces: deployed Cloudflare version, public verification evidence, final commit, and clean tree.

- [ ] Run PDD validator, unit tests, lint, type-check, and production build.
- [ ] Deploy Worker and assets.
- [ ] Verify PDD v2, archive, source ledger/raw files, search, tables, Mermaid, labels, desktop and mobile.
- [ ] Verify no browser console errors and no page-level overflow.
- [ ] Verify production API Markdown equals committed Markdown.
- [ ] Run `git diff --check`, commit, push, and report commit/version/URLs.

## Self-Review

- Spec coverage: all 13 design sections map to Tasks 1–6.
- Placeholder scan: no implementation placeholders are present.
- Boundary check: Markdown is source; D1 is published copy; archive is immutable.
- Scope check: this plan changes documentation and its reader only, not the One Voting application.
- Verification requires both deterministic checks and browser inspection.
- OAuth secrets remain untouched.

## Execution Choice

Approved user instruction is `go`; execute inline with checkpoints only when blocked by external authorization.
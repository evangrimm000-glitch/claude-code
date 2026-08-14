# ARES Governed Reporting Layer — Qualia → Power BI

Design docs for turning Qualia (the system of record) into five role-scoped
Power BI dashboards behind authentication, on the firm's existing Microsoft
footprint. These are **architecture and mapping specs only** — no real order,
employee, or customer data lives here (fixtures/synthetic only), per the
governance rule below.

## Why this exists (governance is the point)

An ARES "Closings Dashboard" was previously published to a **public web URL
with no login** — exposing closed-file counts, pipeline, per-agency
throughput, and **named employees with roles, coverage, and productivity**.
Under GLBA, ALTA Best Practices, and state DOI rules on nonpublic personal
information (NPI), that is a compliance failure.

This layer is the responsible version of the same idea: **every number the
leak exposed, delivered with more depth, behind SSO, inside a governed data
path that never replicates to a public or ungoverned location.**

> Direct consequence for this repo: the `ares-command/` prototype ships with
> **invented sample data only**. Real roster, revenue, and the Qualia order
> export must **never** be committed here or published to any public artifact.
> See [`../../README.md`](../../README.md#data--governance) for the local,
> git-ignored data seam used to run the prototype on real numbers privately.

## The five audiences (from the Executive Summary)

| Audience view        | What it answers |
| -------------------- | --------------- |
| Executive / Owner    | Pipeline and revenue projection; operational health → revenue; macro view by agency, state, and month. |
| Sales                | Source-of-business mix; producer/referral conversion; 1/3/6-month company and contact trends; leaderboard. |
| Operations           | Workflow by stage; assignments by person, role, and state; turn-time; overdue/critical tasks; capacity by processor/office. |
| Accounting / Escrow  | Upcoming and disbursed amounts; remaining and negative balances; holdbacks; uncleared disbursements; exceptions. |
| Compliance / Tax     | 1099 suite; remittance, premiums, and policies; state data-call reporting; licensing-by-state tracker. |

## Documents

1. [`semantic-model.md`](semantic-model.md) — star schema: fact, dimensions,
   relationships, role-playing dates, RLS + OLS design.
2. [`field-mapping.md`](field-mapping.md) — the real Qualia export columns →
   model tables/columns, with Power Query transform notes.
3. [`dax-measures.md`](dax-measures.md) — measures grouped by the question
   each audience view answers.
4. [`data-integrity.md`](data-integrity.md) — the deterministic validation
   layer and standing exception report ("what makes the dashboards worth
   believing").

## Delivery approach

- **Phase 1 — no Qualia API assumed.** Governed manual export (preset, custom,
  and scheduled report packages) lands in a controlled area; Power Query shapes
  it into the model. The extract layer is kept **swappable**.
- **Phase 2 — Qualia Connect / API.** Replaces only the extract step; the
  model, RLS, and measures are unchanged.
- **Identity.** SSO through the firm's existing M365 tenant. No new credential
  stores. RLS/OLS configured explicitly, never assumed.
- **Testing.** Synthetic fixtures only; the data-integrity functions ship with
  unit tests.

## Open inputs still needed from the firm

Carried from the Executive Summary — these are the firm's to provide, not to
guess:

1. A representative Qualia export set (preset + custom + scheduled packages) so
   the model maps to every real field.
2. Whether Qualia Connect / an API is available now, or Phase 1 runs on manual
   export.
3. Power BI workspace + M365 tenant details (credentials plugged in by the
   firm, not by the build).
4. License costs for Qualia Connect, Shield, and Power BI (build-vs-buy).
5. The RLS policy: who sees what, by role and by agency/office.

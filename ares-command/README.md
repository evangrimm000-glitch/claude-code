# ARES Command — ops prototype

A self-contained, single-file prototype (`index.html`, no build step, no
dependencies) for the ARES operations turnaround. Open the file in a browser.

## What it is

Three views over a title/escrow closing operation, driven by a hardcoded
sample dataset (`STAFF` in the inline `<script>`):

- **My Board** — a per-employee closer board: pipeline by stage
  (Pending contract → Under contract → Scheduled to close → In funding),
  a file queue with exception/stall flags, and per-file tasks + email
  timeline (the "email-in-file" concept — every message filed on the order,
  no inbox-hunting).
- **Command Tower** — the whole team at a glance: files in production,
  closing/funding, pending, open exceptions, unanswered emails, plus a
  roster table with load-vs-capacity and a load-imbalance insight. No CC
  required for management visibility.
- **Capacity Model** — the "20 vs 100 files per closer" thesis expressed in
  monthly/annual revenue capacity across three scenarios (today / email-in-file
  / + Smart Action automation). All numbers are **illustrative assumptions**,
  clearly labeled as such.

The top rail is the per-employee switcher; clicking a teammate (rail or Tower
row) opens their board.

## Status

- Reporting engine: SPECCED (external drafts)
- Automation catalog: CAPTURED (~64 triggers, external drafts)
- Outcome model ("Daily Work Board"): LOCKED (external drafts)
- Prototype: BUILT (this file, UI v2)

Everything on screen is **sample data**. The banner and the "add the roster"
hint make that explicit so it is never mistaken for live numbers.

## Making it real (open items — do NOT guess these)

The prototype's shape is done; instantiating it with truth needs your data:

- [ ] **Roster** — employee names + roles → populates the per-person switcher
      (replace the `STAFF` array).
- [ ] **Nicole's actual role** + the Core Workflow milestone names
      (replace `STAGES`).
- [ ] **Real closer count + revenue per closed file** → makes the Capacity
      Model your P&L (replace `CAP.closers` / `CAP.rev`, calibrate `CAP.scen`).
- [ ] **SharePoint breadth** — whole site vs owned-only.
- [ ] **Qualia → Power BI** data path — API / Qualia Connect vs scheduled export.
- [ ] **Current Qualia pricing** — cost analysis is ~1yr old; re-verify.
- [ ] **ResWare + Qualia email/text docs** — locks the email-in-file mechanism.

## Where the data lives

All state is three top-of-script constants, kept deliberately separate from
rendering so real data can be dropped in without touching the UI:

- `STAGES` — the pipeline milestones (key, label, color).
- `STAFF`  — the roster; each person has `stages` counts and detailed `files`
  (`F(...)`), each file with `tasks` (`T(...)`) and `emails` (`M(...)`).
- `CAP`    — capacity model assumptions (closers, revenue/file, scenarios).

## Recommended next step

Bring the roster + milestone names + closer/revenue numbers to instantiate
every employee's real board and turn the Capacity Model into the actual P&L.
Then design the Power BI semantic model (tables / relationships / RLS / DAX)
against the locked reporting spec. The email-in-file architecture waits on the
ResWare/Qualia email docs.

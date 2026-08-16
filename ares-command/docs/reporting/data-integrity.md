# Data-Integrity Layer & Exception Report

> "Trust is engineered, not assumed." — a core deliverable, not a nicety. This
> is what makes the dashboards worth believing.

A set of **deterministic validation functions** run at ingest (Power Query /
the extract step), each with unit tests against synthetic fixtures. Every rule
that fails emits a row into a standing **exception report** surfaced as its own
Power BI page and as an Operations-view tile. No real data is used in tests —
fixtures only.

## Validation rules

Each rule: an id, the condition that flags a row, and the owning view.

| ID    | Flags when… | Severity | Owner |
| ----- | ----------- | -------- | ----- |
| `V01-UNASSIGNED-CLOSER` | `File Closer First Name` is blank/"Unassigned" on a non-cancelled file | high | Operations |
| `V02-MISSING-SOURCE`    | `Source of Business Company Name` is blank | medium | Sales |
| `V03-CLOSED-NO-CLOSEDATE` | `Order Status` ∈ closed/funded but `Close Date` is null | high | Accounting |
| `V04-FUNDED-NO-FUNDDATE` | funded status but `Funding Date` is null | high | Accounting |
| `V05-CLOSED-NO-REVENUE` | closed file with null/zero `Revenue` | high | Executive |
| `V06-DISBDATE-NO-AMOUNT` | `Aggregate Disbursement Date` present but no disbursement amount | medium | Accounting |
| `V07-BAD-STATUS`        | `Order Status` not in the allowed enum / unmapped to a stage | high | Operations |
| `V08-MISSING-STATE`     | `State` blank or not a valid 2-letter code | medium | Compliance |
| `V09-DUP-ORDER`         | `Order Number` appears more than once | high | Operations |
| `V10-DATE-ORDER`        | `Close Date` < `Order Open Date`, or `Funding Date` < `Close Date` | medium | Operations |
| `V11-STALE-PIPELINE`    | in-production file with no milestone-date change in > N days | low | Operations |
| `V12-PII-IN-WRONG-FIELD`| NPI (name/SSN-like) detected in a non-PII column | high | Compliance |

Rules are **data-driven** where possible (allowed status enum, stage map, state
list live in reference tables) so policy changes don't require code changes.

## Exception report shape

`fact_exception` (one row per rule-hit):

| Column | Meaning |
| ------ | ------- |
| `OrderNumber` | the file flagged (degenerate key back to `fact_order`) |
| `RuleId` | e.g. `V03-CLOSED-NO-CLOSEDATE` |
| `Severity` | high / medium / low |
| `OwnerView` | which dashboard should action it |
| `DetectedDateKey` | when the ingest run flagged it |
| `Detail` | human-readable specifics (no NPI) |

Measures: `Open Exceptions = DISTINCTCOUNT(fact_exception[OrderNumber])`,
`Exceptions by Severity`, `Data Health % = 1 − DIVIDE([Files with Exception],
[Orders])`. The Executive view shows `Data Health %`; each role view shows the
exceptions it owns.

## Unit-test approach

- One fixture file per rule: a minimal synthetic dataset with both passing and
  failing rows.
- Each validation function is pure (input rows → flagged rows); tests assert
  exact flagged set.
- Fixtures live under version control; **real exports never do.**
- CI runs the suite on every change to the extract/validation layer.

## Why this gates the dashboards

A dashboard built on an export with unassigned closers, missing close dates, or
duplicate orders will silently mislead. The exception report makes those gaps
**visible and owned** before anyone trusts a number — and `Data Health %` gives
leadership a single signal for whether today's figures can be relied on.

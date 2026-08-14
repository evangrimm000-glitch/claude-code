# Semantic Model — Star Schema

Grain and shape for the governed Qualia → Power BI dataset. Modeled as a star:
one **fact table at the order/file grain**, surrounded by conformed dimensions.
This is the minimum viable model that answers every one of the five audience
views; it extends cleanly as more Qualia report packages are added.

## Fact table — `fact_order`

**Grain: one row per Qualia order (file).** The base export
(`727_plus_ARES_ORDERS`) is already at this grain.

| Column (model)            | Source column                     | Type      | Notes |
| ------------------------- | --------------------------------- | --------- | ----- |
| `OrderNumber` (DD)        | Order Number                      | text      | Degenerate dimension (natural key). |
| `CloserKey`               | File Closer First Name → surrogate | int      | FK → `dim_closer`. |
| `SourceKey`               | Source of Business Company Name   | int       | FK → `dim_source`. |
| `StateKey`                | State                             | int       | FK → `dim_state`. |
| `StatusKey`               | Order Status                      | int       | FK → `dim_status`. |
| `OpenDateKey`             | Order Open Date                   | int (yyyymmdd) | FK → `dim_date` (role: Open). |
| `CloseDateKey`            | Close Date                        | int       | FK → `dim_date` (role: Close). |
| `FundingDateKey`          | Funding Date                      | int       | FK → `dim_date` (role: Funding). |
| `DisbursementDateKey`     | Aggregate Disbursement Date       | int       | FK → `dim_date` (role: Disbursement). |
| `Revenue`                 | Revenue                           | decimal   | Additive measure base. |
| `AggregatePayee`          | Aggregate Payee                   | text      | Escrow attribute; OLS-restricted. |
| `PropertyAddress` (PII)   | Full Address                      | text      | **NPI** — OLS-masked except Escrow/Compliance. |
| `SellerFullName` (PII)    | Seller Full Name                  | text      | **NPI** — OLS-masked except Escrow/Compliance. |

Bridge (many-to-many): `All Labels (Settlement)` is multi-valued per file →
split into `bridge_order_label` (`OrderNumber`, `LabelKey`).

Derived measure-support columns computed in Power Query (not stored as text):
`TurnDays = Close Date − Order Open Date`, `IsClosed`, `IsCancelled`,
`IsFunded`, `IsPipeline` (open, not closed/cancelled).

## Dimensions

### `dim_date` (role-playing)
One conformed date dimension, related to `fact_order` **four times**
(Open / Close / Funding / Disbursement). Keep **one active** relationship
(Open, the pipeline-entry date) and activate the others per measure with
`USERELATIONSHIP`. Columns: `DateKey`, `Date`, `Year`, `Quarter`, `Month`,
`MonthName`, `YearMonth`, `WeekOfYear`, `IsBusinessDay`, `FiscalPeriod`.
Mark as the model's official date table.

### `dim_closer`
The per-person switcher and Operations capacity backbone. Seeded from distinct
`File Closer First Name`; enriched from the **roster** when provided.
Columns: `CloserKey`, `CloserName`, `Role`, `Office`, `StatesCovered`,
`CapacityTarget` (files/period), `IsActive`, `UserPrincipalName` (for dynamic
RLS). Until the roster lands, `Role`/`Office`/`Target` are null and flagged by
the data-integrity layer (unassigned-role exception).

### `dim_source`
`SourceKey`, `SourceCompany`, `SourceType` (lender / broker / agent / builder /
attorney / direct), `Producer`, `IsReferral`. Drives Sales mix and leaderboard.

### `dim_state`
`StateKey`, `StateCode`, `StateName`, `IsPromulgatedRate` (e.g. FL = true),
`RegulatorNotes`. Supports state data-call and licensing views.

### `dim_status`
`StatusKey`, `OrderStatus` (raw Qualia value), `Stage` (bucketed workflow
milestone — see below), `StageOrder`, `IsTerminal`. **The `Stage` bucket is the
bridge between Qualia's `Order Status` values and the prototype's four
pipeline stages** (Pending contract → Under contract → Scheduled to close →
In funding). The exact raw→bucket map must be confirmed against the distinct
`Order Status` values in a live export; the mapping table is data-driven so it
changes without a model rebuild.

### `dim_label`
`LabelKey`, `Label`, `LabelGroup`. Joined via `bridge_order_label`.

### `dim_agency` (when multi-agency)
`AgencyKey`, `AgencyName`, `State`, `Office`. Sourced from a firm-maintained
mapping or a Qualia field once confirmed. Anchors the Executive macro view and
per-agency RLS.

## Relationships (summary)

```
dim_date ──(Open, active)──▶ fact_order
dim_date ──(Close, inactive)──▶ fact_order       (USERELATIONSHIP)
dim_date ──(Funding, inactive)──▶ fact_order      (USERELATIONSHIP)
dim_date ──(Disbursement, inactive)──▶ fact_order (USERELATIONSHIP)
dim_closer ──▶ fact_order
dim_source ──▶ fact_order
dim_state  ──▶ fact_order
dim_status ──▶ fact_order
dim_agency ──▶ fact_order            (via closer/office or explicit key)
fact_order ──▶ bridge_order_label ◀── dim_label   (many-to-many)
```

All dimension→fact relationships are single-direction (1→*), filter flowing
dim→fact. The label bridge is the only bidirectional edge.

## Security — RLS (rows) + OLS (columns)

Two layers, both configured **explicitly**:

**Row-Level Security (who sees which rows).** Dynamic RLS via a mapping table
keyed on `USERPRINCIPALNAME()`:

| Role            | Row scope |
| --------------- | --------- |
| Executive/Owner | All rows. |
| Sales           | Rows where the viewer is the `Producer`/owning source, plus aggregate mix (configurable to full-book for sales leadership). |
| Operations      | All in-production rows for the viewer's office/state; capacity across the team. |
| Accounting      | All rows (financial completeness required). |
| Compliance/Tax  | All rows (regulatory completeness required). |

**Object-Level Security (which columns).** NPI and financial detail are masked
by role:

| Column                          | Exec | Sales | Ops | Acct | Compliance |
| ------------------------------- | :--: | :---: | :-: | :--: | :--------: |
| `SellerFullName`, `PropertyAddress` | ● | mask | mask | ● | ● |
| `Revenue`                       |  ●   |  ●    | agg-only | ● | ● |
| Disbursement amounts / balances |  ●   | mask  | mask | ● | ● |
| 1099 / remittance fields        |  ●   | mask  | mask | ● | ● |

(● = visible, "mask" = column hidden or bucketed, "agg-only" = visible only in
aggregate measures, never row-level.)

Nothing in the model replicates outside the governed workspace; refresh is
Extract → modeled dataset → Power BI workspace on a schedule.

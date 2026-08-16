# Field Mapping — Qualia Export → Model

Maps the columns in the real Qualia orders export
(`727_plus_ARES_ORDERS_2026-07-01`) to the semantic model. This is the Phase-1
contract: as long as an export carries these columns, Power Query produces the
model without change. Additional Qualia report packages extend the map; they
don't replace it.

## Base export columns (14)

| # | Export column                    | Lands in            | As | Transform / notes |
|---|----------------------------------|---------------------|----|-------------------|
| 1 | File Closer First Name           | `dim_closer`        | `CloserName` → `CloserKey` | Trim/case-normalize; surrogate key; blank → "Unassigned" + exception. |
| 2 | Order Number                     | `fact_order`        | `OrderNumber` (DD) | Natural key; dedupe; must be unique. |
| 3 | Source of Business Company Name  | `dim_source`        | `SourceCompany` → `SourceKey` | Normalize company names; classify `SourceType`; blank → exception. |
| 4 | Order Open Date                  | `dim_date` (Open)   | `OpenDateKey` | Parse to date → yyyymmdd key. |
| 5 | Full Address                     | `fact_order`        | `PropertyAddress` (PII) | OLS-masked; optionally parse city/zip for geo (kept in fact, masked). |
| 6 | Seller Full Name                 | `fact_order`        | `SellerFullName` (PII) | OLS-masked; never in Sales/Ops. |
| 7 | Close Date                       | `dim_date` (Close)  | `CloseDateKey` | Null allowed (open pipeline). |
| 8 | Revenue                          | `fact_order`        | `Revenue` | Strip `$`/commas → decimal; null on closed = exception. |
| 9 | Order Status                     | `dim_status`        | `OrderStatus` → `Stage` | Map raw status → workflow stage bucket (data-driven table). |
| 10| Funding Date                     | `dim_date` (Funding)| `FundingDateKey` | Null until funded. |
| 11| Aggregate Payee                  | `fact_order`        | `AggregatePayee` | Escrow attribute; OLS. |
| 12| Aggregate Disbursement Date      | `dim_date` (Disb.)  | `DisbursementDateKey` | Pairs with disbursement measures. |
| 13| All Labels (Settlement)          | `bridge_order_label`| `Label` (split)    | Split on delimiter → one row per label. |
| 14| State                            | `dim_state`         | `StateCode` → `StateKey` | Uppercase; validate 2-letter; blank → exception. |

## Status → Stage bucket (to confirm against live distinct values)

The export's `Order Status` includes at least `Cancelled` and closed/funded
states. The prototype's four pipeline stages map from Qualia status like so
(**illustrative — confirm the raw enum from a full export and adjust the
data-driven map**):

| Workflow stage (prototype) | Example Qualia `Order Status` values |
| -------------------------- | ------------------------------------ |
| Pending contract           | Open / New / Prelim |
| Under contract             | In Process / Title Ordered / Curative |
| Scheduled to close         | Clear to Close / Scheduled |
| In funding                 | Funding / Disbursing |
| _(terminal — excluded from pipeline)_ | Closed / Funded / **Cancelled** |

`dim_status.StageOrder` fixes the display order; `IsTerminal` removes
Closed/Cancelled from "in production" counts.

## Fields needed from additional Qualia packages

The five audience views need fields beyond the base 14. These come from other
Qualia preset/custom report packages and extend the same model:

- **Accounting/Escrow:** upcoming disbursement amount, disbursed amount,
  remaining balance, negative balance flag, holdback amount, uncleared
  disbursement flag. → new measures on `fact_order` (or a `fact_disbursement`
  at line grain if Qualia exposes per-payee lines).
- **Compliance/Tax:** 1099 amounts/recipients, remittance, premium, policy
  number/date, state data-call fields, licensing-by-state. → `fact_policy` /
  `fact_1099` at their own grains, conformed to `dim_date`/`dim_state`.
- **Sales:** producer/contact identifiers, referral source, contact-level
  trend keys. → enrich `dim_source` + a `dim_contact`.
- **Operations:** milestone timestamps per stage, task/assignment records,
  overdue flags. → `fact_task` at task grain conformed to `dim_closer`.

Each is additive: new fact/dim, same date and geography conformance, same RLS
model.

# DAX Measures — by audience view

Reference measures grouped by the question each dashboard answers. Names are
model-facing; expressions assume the [semantic model](semantic-model.md)
(role-playing `dim_date`, `dim_closer`, `dim_source`, `dim_status`,
`dim_state`). Treat these as the starting measure library — tune to the live
export once distinct `Order Status` values are confirmed.

## Core / shared

```DAX
Orders = DISTINCTCOUNT(fact_order[OrderNumber])

Files In Production =
CALCULATE([Orders], FILTER(dim_status, dim_status[IsTerminal] = FALSE()))

Closed Files =
CALCULATE([Orders], KEEPFILTERS(dim_status[Stage] = "Closed"))

Cancelled Files =
CALCULATE([Orders], KEEPFILTERS(dim_status[OrderStatus] = "Cancelled"))

Revenue (Closed) =
CALCULATE(SUM(fact_order[Revenue]), USERELATIONSHIP(fact_order[CloseDateKey], dim_date[DateKey]))

Pull-Through Rate =
DIVIDE([Closed Files], [Closed Files] + [Cancelled Files])
```

## Executive / Owner — pipeline & revenue projection

```DAX
Pipeline Files = [Files In Production]

Pipeline Revenue (Weighted) =
SUMX(
    VALUES(dim_status[Stage]),
    [Pipeline Files] * RELATED(dim_status[StageWeight])   -- probability by stage
        * [Avg Revenue per Closed File]
)

Avg Revenue per Closed File = DIVIDE([Revenue (Closed)], [Closed Files])

Revenue by Month =
CALCULATE([Revenue (Closed)], USERELATIONSHIP(fact_order[CloseDateKey], dim_date[DateKey]))
-- slice by dim_date[YearMonth], dim_state, dim_agency for the macro view

Projected Revenue (Next 90d) =
[Pipeline Revenue (Weighted)]   -- filtered to expected close within 90 days
```

## Sales — source mix, conversion, trend, leaderboard

```DAX
Orders by Source = [Orders]   -- by dim_source[SourceCompany] / [SourceType]

Source Mix % =
DIVIDE([Orders], CALCULATE([Orders], ALL(dim_source)))

Producer Conversion =
DIVIDE([Closed Files], [Orders])   -- in dim_source / dim_contact context

Orders (Rolling 1M / 3M / 6M) =
CALCULATE([Orders], DATESINPERIOD(dim_date[Date], MAX(dim_date[Date]), -3, MONTH))
-- vary -1 / -3 / -6 MONTH for the 1/3/6-month trend

Producer Rank =
RANKX(ALL(dim_source[SourceCompany]), [Orders],, DESC, DENSE)   -- leaderboard
```

## Operations — workflow, turn-time, capacity

```DAX
Files by Stage = [Files In Production]   -- by dim_status[Stage] (StageOrder sort)

Avg Turn Time (days) = AVERAGE(fact_order[TurnDays])   -- Close − Open

Aging Pipeline (>30d) =
CALCULATE([Files In Production],
    FILTER(fact_order, DATEDIFF(RELATED(dim_date[Date]) /*open*/, TODAY(), DAY) > 30))

Closer Load = [Files In Production]   -- by dim_closer

Closer Load vs Capacity % =
DIVIDE([Closer Load], SELECTEDVALUE(dim_closer[CapacityTarget]))

Overloaded Closers =
COUNTROWS(FILTER(VALUES(dim_closer[CloserKey]), [Closer Load vs Capacity %] >= 1.1))
```

## Accounting / Escrow — disbursements, balances, exceptions

(Requires the Accounting export fields; measures assume `fact_order` carries
the disbursement amounts, or a `fact_disbursement` at line grain.)

```DAX
Disbursed Amount = SUM(fact_order[DisbursedAmount])

Upcoming Disbursements =
CALCULATE(SUM(fact_order[UpcomingDisbursementAmount]),
    fact_order[DisbursementDateKey] >= [TodayKey])

Remaining Balance = SUM(fact_order[RemainingBalance])

Negative Balance Files =
CALCULATE([Orders], FILTER(fact_order, fact_order[RemainingBalance] < 0))

Uncleared Disbursements =
CALCULATE([Orders], KEEPFILTERS(fact_order[IsUncleared] = TRUE()))

Holdbacks = SUM(fact_order[HoldbackAmount])
```

## Compliance / Tax — 1099, premiums, policies, licensing

(Requires the Compliance export fields / `fact_policy`, `fact_1099`.)

```DAX
Policies Issued = DISTINCTCOUNT(fact_policy[PolicyNumber])
Premiums = SUM(fact_policy[PremiumAmount])
Remittance Due = SUM(fact_policy[RemittanceAmount])
1099 Reportable = SUM(fact_1099[ReportableAmount])
1099 Recipients = DISTINCTCOUNT(fact_1099[RecipientTIN])
States Licensed = DISTINCTCOUNT(dim_state[StateCode])   -- vs licensing tracker
```

## Notes

- `StageWeight` and `CapacityTarget` are firm-supplied calibration columns
  (on `dim_status` and `dim_closer` respectively), not guesses. Until provided,
  weighted-pipeline and load-vs-capacity measures render but are flagged as
  uncalibrated.
- `[TodayKey]`/`TODAY()` usage assumes scheduled refresh; for as-of reporting,
  swap to a disconnected as-of-date parameter.
- Every measure honors RLS/OLS automatically — no measure exposes a masked
  column at row level.

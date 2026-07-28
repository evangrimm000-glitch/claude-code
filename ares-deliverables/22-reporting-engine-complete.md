# ARES Reporting Engine — COMPLETE (Fields x Filters x Stats -> KPIs)

> Source: Gmail draft (r-2377230005981619655) · saved 2026-07-02T21:01:57Z · sanitized ARES work product (no client data)

---

Final tab (Summary Statistics) captured. The full Qualia custom-report spec is now mapped. No client data.

=====================================================
SUMMARY STATISTICS CATALOG
=====================================================
ORDER STATUS STATS (counts): Open Orders | Closed Orders | Cancelled Orders | Total Orders
TRANSACTION TYPE STATS (counts): Purchase Orders | Refinance Orders | HELOC Orders | Sale Orders | [custom types]
DOLLAR VALUE STATS: Total Revenue | Total Loan Amount | Total Purchase Price
PAYEE LABEL STATS (dollar totals): per label x {Settlement/Title, Settlement Agency, Title Company, Underwriter, Other} + All-* rollups (All Underwriter Payee Labels, All Settlement Agency Payee Labels, etc.)

=====================================================
KPI FORMULAS IN NATIVE QUALIA TERMS  (Field x Filter x Stat)
=====================================================
Pull-Through %      = Closed Orders / Total Orders            [Order Status Stats; filter Order Open Date in period]
Fall-out %          = Cancelled Orders / Total Orders          [Order Status Stats]
Purchase/Refi mix   = Purchase Orders vs Refinance Orders      [Transaction Type Stats] -> durability
Total Revenue       = Total Revenue                            [Dollar Stats; slice by period/source/underwriter]
Revenue / Closed    = Total Revenue / Closed Orders
Cost-to-serve/closed= [platform spend] / Closed Orders         (platform spend from your cost analysis)
Source concentration= Total Revenue filtered to top-N Source of Business Company / Total Revenue
Source retention    = Companies active this period vs prior    [filter Source of Business Company + Order Open Date]
Underwriter remittance = All Underwriter Payee Labels          [Payee Label Stats]
Agency retention $  = All Settlement Agency Payee Labels        [Payee Label Stats] -> your gross margin retained
Closer aging board  = Task Assignee = user + Task Due Date = overdue/due-in-N + Order Status = Open

=====================================================
REPORTING ENGINE — FULLY SPECCED
=====================================================
WHAT to show  = Custom Report Fields (334)          DONE
HOW to slice  = Custom Report Filters (9 groups)    DONE
HOW to total  = Summary Statistics (4 groups)       DONE

Every ARES KPI now = a combination of native Field x Filter x Stat. This means:
1. You can build most KPIs directly in Qualia Custom Reports TODAY (no Power BI needed to start).
2. Power BI then connects to those report outputs (or the API) and adds: RLS (per closer/dept), animated visuals, cross-source blending, and the ~4 custom KPIs (quota attainment, retention/churn thresholds, AI-accuracy, cost-to-serve).

NEXT BUILD STEP (no more glossaries needed for reporting): design the actual Power BI semantic model -- tables, relationships, the RLS rules, and the DAX for the KPIs above -- on placeholder fields.


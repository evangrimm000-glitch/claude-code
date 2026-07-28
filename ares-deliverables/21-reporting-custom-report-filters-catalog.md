# ARES Custom Report Filters Catalog + Slicer Map

> Source: Gmail draft (r-7366332133348694094) · saved 2026-07-02T21:01:04Z · sanitized ARES work product (no client data)

---

From Qualia "Custom Report Filters" tab. This is the WHERE-clause / slicer layer that pairs with the 334-field WHAT layer. All filters use is/is not toggles; date filters support ranges. No client data.

=====================================================
FILTER CATALOG (by group)
=====================================================
BASIC INFO: Accounting Mode | [Settlement Team Role] (one per role) | Close Date | Disbursement Date | Funding Date | Purchase Price | Representing | Settlement Agency | Source of Business Associate | Source of Business Company | Source of Business Company Type | Source of Business Type | Template Name | Transaction Type | Workflow
PROPERTY: Address Line 1 | Block | City | County | Full Address | Lot | Parcel ID | Property Type | Section | State | Subdivision | Zipcode
CONTACTS: External Settlement Agency | External Title Company | Lender | Listing Agent | Listing Agency | Mortgage Brokerage | Selling Agent | Selling Agency | Title Abstractor | Title Abstractor Company
ORDER STATUS: Milestone | Order Open Date | Order Status | Ordered From Connect | Pre-Opened Date | Cancelled/Closed Date
ACCOUNTING: Aggregate Payee | Aggregate Disbursement Date | Commission | Commission Base | Disbursement Account
TITLE: Agent Endorsement Premium | Agent Policy Premium | Agent Premium | Commitment Effective Date | Lender's/Owner's Policy Effective & Issued Dates | Policy Issued Date | Total Endorsement Premium | Total Policy Premium | Total Premium | Underwriter
LOAN: Loan Amount | Mortgage Commitment Date
TASK: Task Assignee Name | Task Due Date (one pair per workflow task)
PAYEE LABEL: 5 designations per label (Settlement/Title, Settlement Agency, Title Company, Underwriter, Other) + All-* rollups + Posted Date (Settlement/Title/Underwriter)

=====================================================
ARES SLICER MAP (which filters build which view)
=====================================================
PULL-THROUGH / PIPELINE / CYCLE:
  Order Status + Order Open Date + Cancelled/Closed Date + Close Date + Milestone
  -> "Opened in [range]", "Closed in [range]", "Cancelled in [range]", stuck-at-milestone.
CLOSER "MY WORK IN PROGRESS":
  [Settlement Team Role] or Task Assignee Name = current user + Task Due Date = OVERDUE / due-within-N-days + Order Status = Open
  -> this is the per-closer aging board, filtered natively. Task Due Date's "overdue / due within N days" is exactly the aging logic.
REFERRAL / SOURCE:
  Source of Business Company / Company Type / Associate (+ Transaction Type) -> source performance, concentration, purchase vs refi by source.
REP / COMMISSION:
  [Settlement Team Role] + Commission / Commission Base -> per-rep production & payout.
REVENUE / UNDERWRITER MIX:
  Underwriter + Total Premium / Agent Premium + Policy Issued Date -> revenue by underwriter, remittance timing.
CONNECT SEGMENTATION (cost/adoption analysis):
  Ordered From Connect = is/is not -> compare Connect vs non-Connect volume, cost, pull-through. Ties directly to the Connect cost question.
RISK / GEOGRAPHY:
  State / County / Property Type + Purchase Price / Loan Amount -> high-value or high-risk-state segmentation for the risk-based QC automations.

=====================================================
REPORTING ENGINE STATUS
=====================================================
WHAT to show  = Custom Report Fields (334) ..... DONE
HOW to slice  = Custom Report Filters (this) ... DONE
HOW to total  = Summary Statistics tab ......... STILL NEEDED (the "Dollar Value Statistics" tab -- sum/avg/count aggregations)
Grab that last tab and the Qualia custom-report spec is fully mapped to Power BI.


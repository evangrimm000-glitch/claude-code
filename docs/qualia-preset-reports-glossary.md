# Qualia Preset Report Field Glossary

**Purpose:** Map ARES KPIs to Qualia's out-of-the-box (preset) reports so the Power BI
engagement can show reporting value on day one. Qualia already ships preset reports
covering ~all the target KPIs, so the Power BI work is mostly **CONNECT + RLS + polish**,
not build-from-scratch.

> Scope note: **Schema only — no client data.** Everything below describes report
> structure and default fields, not any customer's records.

---

## Strategic takeaway

- **ARES can show reporting value DAY ONE using presets** — no build required.
- **Power BI then layers on top:** row-level security (RLS) per closer / department,
  animated visuals, and ~4 custom KPIs that presets don't cover.
- **Two standouts are already built by Qualia** and are exactly what impresses a CFO:
  - **Company Trends** — month-over-month change deltas → *retention / momentum*.
  - **Companies by Purchase/Refi** — purchase vs. refi revenue split → *source durability*.

---

## KPI → preset report coverage

| KPI area | Preset report(s) | Key fields | Status |
|---|---|---|---|
| Pull-through / pipeline / cycle | Open Orders; Order Status; Closing Orders | Order Open Date, Status, Closed/Canceled Date, Disbursement Date, Close Date | **Covered** |
| Referral / source-of-business | Source of Business; Companies by Transaction Volume; Company Trends | Company, Orders, Total Loan Amount, Days to Close; built-in month-over-month deltas | **Covered** |
| Source concentration / durability (purchase vs. refi) | Companies by Purchase/Refi | Purchases, Refis, Purchase Revenue, Refi Revenue, Revenue/Purchase | **Covered** (the CFO durability metric, out of the box) |
| Rep KPIs | Commissions | Order #, Disbursement Date | **Partial** — add Salesperson / Rate from custom fields |
| Revenue / projections | Upcoming Revenue; Disbursed Orders; Premiums and Policies | Upcoming Revenue, Revenue (Total) | **Covered** |
| Exceptions / redundancy | Critical Issues | Issue Creation Date | **Covered** |
| Trust / accounting controls (3-way rec support) | Remaining Balances; Negative Balance; Holdbacks; Uncleared Disbursements; Trackable Disbursements | — | **Covered** |

### Gaps to build custom

These are not covered by presets and must be built from Custom Report fields:

1. **Per-rep quota attainment**
2. **Source retention / churn thresholds**
3. **AI-accuracy KPI**
4. **Cost-to-serve per closed file**

---

## Full preset report catalog (by group)

- **General:** Open Orders, Source of Business, Order Status, Closing Orders,
  Critical Issues, Mortgage Commitment, Calendar, Commissions
- **Title:** Outstanding Title Searches, Completed Title Searches, Outstanding Commitments,
  Remittance (Detailed), Premiums and Policies
- **Accounting:** Upcoming Disbursements, Disbursed Orders, Remaining Balances,
  Negative Balance, Holdbacks, Order Disbursements, Trackable Disbursements,
  Uncleared Disbursements, Upcoming Revenue
- **Marketplace:** Billing History, Vendor Performance, Product Performance,
  Outstanding/Missing/Completed/All Marketplace Orders, Notary,
  Release Tracking (×3), Payoffs (×3), Automatic Order Errors
- **Connect:** Survey Results, Quotes Requested, Outstanding Invitations,
  Marketing Email, Auto Accepted Orders, Orders Placed
- **Contacts:** Companies by Transaction Volume, Companies by Purchase/Refi,
  Company Trends, Company Contacts by Transaction Volume,
  Company Contacts by Purchase/Refi, Company Contact Trends over Time
- **E-Recording:** Simplifile packages (Incomplete / Submitted / Rejected …)

---

## Default fields — KPI-critical presets

| Preset report | Default fields |
|---|---|
| **Open Orders** | Order Number, Transaction Type, Borrower Full Name, Loan Amount, Source of Business Company Name, Source of Business Contact Full Name, State |
| **Source of Business** | Order Number, Address Line 1, Transaction Type, Source of Business Company Type, Source of Business Contact Full Name |
| **Order Status** | Order Number, Status, Order Open Date, Closed/Canceled Date, Disbursement Date |
| **Closing Orders** | Order Number, Close Date, Transaction Type, Borrower Full Name, Loan Amount, State |
| **Critical Issues** | Order #, Transaction Type, Borrower/Buyer, Issue Creation Date |
| **Commissions** | Order #, Disbursement Date |
| **Premiums and Policies** | Order Number, County State, Underwriter, Transaction Type, Order Status, Order Open Date, Closed/Canceled Date, External Settlement Agency Name, External Title Company Name |
| **Upcoming Revenue** | Order Number, Transaction Type, Settlement Agency, Upcoming Revenue |
| **Disbursed Orders** | Order Number, Address Line 1, Disbursement Date (Order), Settlement Agency, Loan Amount, Transaction Type, Revenue (Total) |
| **Companies by Transaction Volume** | Company, Orders, Total Loan Amount, Days to Close |
| **Companies by Purchase/Refi** | Company, Purchases, Refis, Purchase Revenue, Refi Revenue, Revenue/Purchase |
| **Company Trends** | Company, Last Month, Change (3 Mo Ago → Last Month), 3 Mo Ago, Change (6 Mo Ago → 3 Mo Ago), 6 Mo Ago |

---

## Power BI implementation notes

The engagement layers on top of the presets rather than replacing them:

1. **Connect** the presets above as data sources — immediate coverage of ~all KPIs.
2. **RLS (row-level security):** scope views per closer and per department.
3. **Polish:** animated / interactive visuals over the preset feeds.
4. **Custom KPIs:** build the four gap items (quota attainment, retention/churn
   thresholds, AI-accuracy, cost-to-serve per closed file) from Custom Report fields;
   enrich Commissions with Salesperson / Rate to complete the rep KPIs.

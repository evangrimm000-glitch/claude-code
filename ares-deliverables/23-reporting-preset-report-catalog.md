# ARES Preset Report Catalog + KPI Coverage Map

> Source: Gmail draft (r-5818690024777927532) · saved 2026-07-02T20:13:49Z · sanitized ARES work product (no client data)

---

From Qualia "Preset Report Field Glossary." Key finding: Qualia already ships preset reports covering ~all the ARES KPIs. So the Power BI job is mostly CONNECT + RLS + polish, not build-from-scratch. Schema only, no client data.

=====================================================
KPI -> PRESET REPORT COVERAGE (what already exists)
=====================================================
Pull-through / pipeline / cycle:
  Open Orders Report, Order Status Report (Order Open Date, Status, Closed/Canceled Date, Disbursement Date), Closing Orders Report (Close Date) -> COVERED
Referral / source-of-business KPIs:
  Source of Business Report; Companies by Transaction Volume (Company, Orders, Total Loan Amount, Days to Close); Company Trends (built-in month-over-month deltas = retention/momentum!) -> COVERED
Source concentration / durability (purchase vs refi):
  Companies by Purchase/Refi (Purchases, Refis, Purchase Revenue, Refi Revenue, Revenue/Purchase) -> COVERED (this is the CFO durability metric, out of the box)
Rep KPIs:
  Commissions Report -> PARTIAL (has Order#, Disbursement Date; add Salesperson/Rate from custom)
Revenue / projections:
  Upcoming Revenue Report (Upcoming Revenue), Disbursed Orders (Revenue Total), Premiums and Policies -> COVERED
Exceptions / redundancy:
  Critical Issues Report (Issue Creation Date) -> COVERED
Trust / accounting controls (3-way rec support):
  Remaining Balances, Negative Balance, Holdbacks, Uncleared Disbursements, Trackable Disbursements -> COVERED

GAPS to build custom (from Custom Report fields): per-rep quota attainment, source RETENTION/CHURN thresholds, AI-accuracy KPI, cost-to-serve per closed file.

=====================================================
STRATEGIC TAKEAWAY
=====================================================
- ARES can show reporting value DAY ONE using presets (no build).
- Power BI then layers: RLS (per-closer/dept), animated visuals, and the ~4 custom KPIs above.
- Two standouts already built by Qualia:
    * Company Trends = month-over-month change deltas (retention/momentum)
    * Companies by Purchase/Refi = purchase vs refi revenue split (durability)
  Both are exactly what impresses a CFO -- and they're preset.

=====================================================
FULL PRESET REPORT CATALOG (by group)
=====================================================
GENERAL: Open Orders, Source of Business, Order Status, Closing Orders, Critical Issues, Mortgage Commitment, Calendar, Commissions
TITLE: Outstanding Title Searches, Completed Title Searches, Outstanding Commitments, Remittance (Detailed), Premiums and Policies
ACCOUNTING: Upcoming Disbursements, Disbursed Orders, Remaining Balances, Negative Balance, Holdbacks, Order Disbursements, Trackable Disbursements, Uncleared Disbursements, Upcoming Revenue
MARKETPLACE: Billing History, Vendor Performance, Product Performance, Outstanding/Missing/Completed/All Marketplace Orders, Notary, Release Tracking (x3), Payoffs (x3), Automatic Order Errors
CONNECT: Survey Results, Quotes Requested, Outstanding Invitations, Marketing Email, Auto Accepted Orders, Orders Placed
CONTACTS: Companies by Transaction Volume, Companies by Purchase/Refi, Company Trends, Company Contacts by Transaction Volume, Company Contacts by Purchase/Refi, Company Contact Trends over Time
E-RECORDING: Simplifile packages (Incomplete/Submitted/Rejected...)

=====================================================
DEFAULT FIELDS — KPI-CRITICAL PRESETS
=====================================================
Open Orders: Order Number, Transaction Type, Borrower Full Name, Loan Amount, Source of Business Company Name, Source of Business Contact Full Name, State
Source of Business: Order Number, Address Line 1, Transaction Type, Source of Business Company Type, Source of Business Contact Full Name
Order Status: Order Number, Status, Order Open Date, Closed/Canceled Date, Disbursement Date
Closing Orders: Order Number, Close Date, Transaction Type, Borrower Full Name, Loan Amount, State
Critical Issues: Order #, Transaction Type, Borrower/Buyer, Issue Creation Date
Commissions: Order #, Disbursement Date
Premiums and Policies: Order Number, County State, Underwriter, Transaction Type, Order Status, Order Open Date, Closed/Canceled Date, External Settlement Agency Name, External Title Company Name
Upcoming Revenue: Order Number, Transaction Type, Settlement Agency, Upcoming Revenue
Disbursed Orders: Order Number, Address Line 1, Disbursement Date (Order), Settlement Agency, Loan Amount, Transaction Type, Revenue (Total)
Companies by Transaction Volume: Company, Orders, Total Loan Amount, Days to Close
Companies by Purchase/Refi: Company, Purchases, Refis, Purchase Revenue, Refi Revenue, Revenue/Purchase
Company Trends: Company, Last Month, Change (3 Mo Ago -> Last Month), 3 Mo Ago, Change (6 Mo Ago -> 3 Mo Ago), 6 Mo Ago


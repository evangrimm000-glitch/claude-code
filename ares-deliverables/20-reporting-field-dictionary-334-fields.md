# ARES Field Dictionary + KPI Map — Custom Report Fields (334 fields)

> Source: Gmail draft (r6108371861785229159) · saved 2026-07-02T19:19:46Z · sanitized ARES work product (no client data)

---

Parsed from the Qualia "Custom Report Fields, Filters & Summary Statistics" glossary. 334 fields, 24 sections. Full definitions live in your raw-paste draft; this is the structured index + the KPI/dashboard wiring. Schema only, no client data.

=====================================================
PART 1 — KPI / DASHBOARD -> QUALIA FIELD MAP
=====================================================
VOLUME / PULL-THROUGH / CYCLE (Order Date + Order Status):
  Orders Opened      = count of [Order Open Date]
  Orders Closed      = count of [Close Date] / [Closing Date]
  Fall-out           = [Cancelled Date] / [Closed/Cancelled Date]
  Pull-Through %     = Closed / Opened
  Cycle Time (days)  = [Close Date] - [Order Open Date]
  Funding timing     = [Funding Date], [Disbursement Date]
  Status filters     = [Status], [Order Status], [Pre-open Status]

REVENUE / MARGIN (Accounting + Title):
  Revenue            = [Revenue]
  Premium mix        = [Total Policy Premium], [Total Premium (Incl. Taxes/Fees)], [Agent Premium], [Underwriter Fees], [Total Remittance Due]
  Trust balance      = [Balance]
  Recognition timing = [Posted Date (Settlement/Title/Underwriter)]

REFERRAL-SOURCE KPIs (Source of Business) -- your Tier-3 engine:
  Active sources / concentration / retention = [Source of Business Company Name], [Source of Business Company Type], [Source of Business Type]

SALES REP KPIs (Commission):
  Rep / quota        = [Salesperson], [Sales Commission], [Sales Commission Base], [Sales Commission Rate]

CLOSER "MY WORK IN PROGRESS" DASHBOARD (Workflow + Settlement Team + Dates + Status):
  Pipeline           = [Order Open Date], [Closing Date], [Status]
  Aging / exceptions = [Milestone], [Task Due Date], [Overdue Tasks], [Upcoming Tasks]
  Assigned-to (RLS)  = [Task Assignee Name], [Settlement Team] First/Last Name
  
SEGMENTATION (Basic Info + Property):
  [Transaction Type], [Workflow], [Settlement Agency], [Property State], [Property Type]

=====================================================
PART 2 — SENSITIVITY (maps to SharePoint "Sensitivity" col + Power BI RLS)
=====================================================
RESTRICTED-NPI (tighter perms; these carry personal data):
  Borrower Fields (37) -- incl. DOB, addresses, phones, email
  Seller Fields (37)   -- incl. DOB, addresses, phones, email
  Other Company Contact Fields (40), Mortgage Brokerage, Lender, Agent contact PII
INTERNAL/SAFE for broad dashboards:
  Order Date, Order Status, Accounting/Revenue (aggregate), Source of Business (company-level), Commission, Workflow, Basic Info, Property (non-owner)

=====================================================
PART 3 — FULL FIELD INDEX (by section)
=====================================================
Basic Info (10): Accounting Mode, Order Number, Place of Closing, Purchase Price, Representing, Settlement Agency, Status Summary, Template Name, Transaction Type, Workflow
Property (14): Address Line 1, Block, Brief Legal Description, City, County, County State, Legal Description, Lot, Parcel ID, Property Type, Section, State, Subdivision, Zipcode
Title (37): Agent/Owner/Lender Premiums, Remittances, Policy IDs/Dates, Endorsements, Underwriter, Underwriter Fees, Total Premium (before/incl taxes), Total Remittance Due, Sales Tax on Title Charges
Accounting (8): Aggregate Disbursement Date, Aggregate Payee, Balance, Disbursement Account, Posted Date (Settlement/Title/Underwriter), Revenue
Payee Label (6): All Other/Selected/Settlement/Title/Underwriter Payee Labels
Borrower (37): name/DOB/addr/phone/email + Attorney + Spouse + Representative fields  [RESTRICTED]
Seller (37): name/DOB/addr/phone/email + Attorney + Spouse + Representative fields  [RESTRICTED]
Other Company Contact (40): Appraisal, Builder, HOA, Insurance, Law Firm, Payoff Lender, Real Estate Agency, Tax Assessor, Utility, etc.
Mortgage Brokerage (13): Brokerage LO + Mortgage Broker contact fields
Order Date (10): Cancelled, Close, Closed/Cancelled, Closing, Contract, Disbursement, Expiration, Funding, Order Open, Pre-open
Workflow (8): Complete/Overdue/Upcoming Tasks, Milestone, Task Assignee Name, Task Due Date
Settlement Team (3): First Name, Last Name, Member Email
External Settlement Agency (8): External Escrow Officer contact + Agency Name + Client Order Number
External Title Company (9): External Title Officer contact + Company Name + Client Order Number
Payoff (14): Instrument #/Type, Lender, Loan #, Mortgage/Payment/Recorded dates, Original Amount/Mortgagee, Total Due
Listing Agency (16): Agency + Agent + Broker contact + State License ID
Selling Agency (16): Agency + Agent + Broker contact + State License ID
Lender (13): Loan Officer + Loan Originator contact + Lender Address
Loan Section (3): Loan Amount, Loan ID, Mortgage Commitment Date
Order Status (3): Status, Pre-open Status, Order Status
Commission (4): Salesperson, Sales Commission, Base, Rate
Source of Business (9): Company Name/Type, Contact name/phone/email, Source Type
Title Abstractor (8): Abstractor contact + Company Name + Title Examiner
Miscellaneous (5): Interest Rate, Interest Type, Critical Issue, Order Placed By (Connect), Ordered From Connect

=====================================================
NOTE
=====================================================
This glossary also has 2 more tabs still to mine: Custom Report FILTERS and SUMMARY STATISTICS (the aggregation functions). Those define how the KPIs get calculated/filtered in Qualia's own reports. Next glossary to grab: "All Available Smart Action Triggers" (the automation catalog).


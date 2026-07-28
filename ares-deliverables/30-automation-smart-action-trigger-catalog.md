# ARES Smart Action Trigger Catalog + Automation Map

> Source: Gmail draft (r6671234598063121283) · saved 2026-07-02T20:56:22Z · sanitized ARES work product (no client data)

---

Full Qualia Smart Action trigger catalog (Dynamic Workflows) + how ARES weaponizes each for redundancy, compliance, and efficiency. No client data.

=====================================================
FULL TRIGGER CATALOG (by group)
=====================================================
ORDER: Payoff Added (per payoff) | HOA Added (per HOA) | Order is Subordinate | Cash Only | HELOC | Construction Loan | Task Completed | FinCEN Reportable
TITLE: Requirement on Commitment (by state/underwriter/requirement) | Exception on Commitment/Prelim/Guarantee | Specific Underwriter Set | Owner's Policy Type | Lender's Policy Type
ACCOUNTING: Loan is Type | Loan Amount > X | Loan Amount < X | Purchase Price > X | Purchase Price < X | Accounting Mode Title Only | Earnest Held By Party | 1099 Eligible | Borrower 1031 Exchange | Seller 1031 Exchange | Holdback Added | New Construction Draw Added | Earnest Money Deposit Received | Receipt For Benefit of Party | Funds Disbursed (>80%) | Disbursement Posted to Party
CALENDAR: Closing Scheduled | Closing RSVP Declined
COMPLIANCE: SDN Match (OFAC / Specially Designated Nationals + Foreign Sanctions Evaders)
CONNECT: Borrower Personal Info Request Result | Seller Personal Info Request Result | Information Request Fulfilled | Receive Info Submission (API, by domain) | Borrower Confirms Different Prior Name | Seller Confirms Different Prior Name | Borrower/Seller Completed Prepare-for-Online-Closing | Borrower/Seller Completed RON
CONTACTS: Borrower POA Added | Seller POA Added | Borrower Is Organization | Seller Is Organization | Contact Type Added | Seller is Organization Type | Borrower is Organization Type | Company Added | Seller's Current Address Different From Property
DOCUMENT: Document Added (by name; incl. Searchable Document Names) | Document Recorded (by instrument type) | Deed and Mortgage Recorded
MARKETPLACE: Order Placed | Order Completed | Order Cancelled | Order Message Received
PROPERTY: Property in City | Property in County | Property in State | Property is Type | Multiple Properties

=====================================================
ARES AUTOMATION MAP — how to use the high-value ones
=====================================================
COMPLIANCE (your GLBA/ALTA moat -> make it automatic):
- SDN Match -> auto-create "OFAC match review + escalate" task; block progress until cleared. (Huge -- turns a manual check into an enforced gate.)
- FinCEN Reportable -> auto-append the FinCEN residential-reporting checklist.
- Borrower/Seller Is Organization / Organization Type -> auto-task "collect entity docs + authority (operating agreement, resolution)."
- Seller's Current Address != Property Address -> auto red-flag / seller-impersonation fraud check.
- Borrower/Seller Confirms Different Prior Name -> auto-run expanded name search.

REDUNDANCY / QC (four-eyes, enforced):
- Payoff Added -> "verify payoff figures" task.
- Holdback Added / New Construction Draw -> "verify holdback/draw authorization + release conditions."
- Funds Disbursed (>80%) -> trigger 3-way rec / post-close review.
- Deed and Mortgage Recorded -> post-closing recording confirmation task.

RISK-BASED CONTROLS (scale scrutiny to exposure):
- Loan Amount > X / Purchase Price > X -> extra QC + senior sign-off on high-value files.
- Specific Underwriter Set / Requirement or Exception on Commitment -> auto-append underwriter-specific curative tasks.

EFFICIENCY / CLIENT EXPERIENCE:
- Closing Scheduled -> auto-send prep/confirmation.
- Closing RSVP Declined -> auto-create reschedule task (no dropped closings).
- Information Request Fulfilled / RON Completed -> auto-advance milestone.

=====================================================
STRATEGIC NOTE
=====================================================
This catalog IS the automation half of ARES. Every trigger above that you wire = a manual step removed (labor/cost lever) OR a control enforced (compliance/redundancy). Recommend a "Smart Action buildout" workstream: prioritize COMPLIANCE triggers first (SDN/FinCEN -- lowest risk tolerance), then REDUNDANCY (wire/payoff/rec), then EFFICIENCY. Track "# Smart Actions live" + "auto vs manual task completion %" as adoption KPIs.


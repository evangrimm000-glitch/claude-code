# ARES Owner's Manual — Sec 2: Smart Actions Setup

> Source: Gmail draft (r3105310597987069754) · saved 2026-07-02T20:55:12Z · sanitized ARES work product (no client data)

---

Structured from Qualia "How to Set Up Smart Actions." Section 2 of the ARES reference. No client data.

=====================================================
WHAT SMART ACTIONS ARE
=====================================================
Groups of tasks + automations that auto-populate into an order's workflow when a trigger condition is met (e.g., Payoff Added, Document Uploaded). They send messages, share docs, assign tasks, update fields, etc.

=====================================================
HOW TO BUILD ONE  (Admin > Workflows > Smart Actions > Add Smart Action)
=====================================================
1. Select a Smart Action TRIGGER -> Next.
2. Name it + pick a Core Workflow Milestone under "Display After" (where the action shows when triggered).
3. Add SCOPE filters to limit which orders it fires on:
   - Transaction Types
   - Closing States
   - Sources of Business   <-- ties to referral strategy
   - Branches
4. Toggle default tasks on/off -> "Create Smart Action."
5. Add more Tasks (gray + button) or Automations (green "Add Automation").
6. ALWAYS click "Save Changes" before leaving.

Note: Smart Action task milestone options are "Previous Milestone Active" / "Previous Milestone Completed" (the previous milestone = the one chosen in "Display After").

=====================================================
GOTCHAS
=====================================================
- Deleting a Smart Action does NOT retroactively remove it from orders where it already triggered (change-management: plan migrations, don't just delete).
- Some triggers fire MULTIPLE times per order (Payoff Added -> one instance per payoff; HOA Added -> one per HOA). The trigger description tells you. If it doesn't say multiple, it fires once.

=====================================================
ARES USE — TURN REDUNDANCY POLICY INTO ENFORCED AUTOMATION
=====================================================
This is how the redundancy/QC layer stops being a policy doc and becomes automatic:
- Trigger "Payoff Added" -> auto-create a "Verify payoff figures (four-eyes)" task.
- Trigger "Document Uploaded" (wire instructions) -> auto-assign a dual-control wire-verification task + notify.
- Trigger tied to closing milestone -> auto-append the cleared-to-close checklist.
- Scope automations by Source of Business / State / Transaction Type / Branch for precision (e.g., stricter QC on high-risk states or new sources).
LABOR/COST: every auto-created task = a manual step removed -> the efficiency lever in the ARES financials. Measure tasks auto-completed vs. manual as an automation-adoption KPI.


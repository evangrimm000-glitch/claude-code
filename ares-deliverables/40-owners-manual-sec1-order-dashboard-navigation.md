# ARES Owner's Manual — Sec 1: Order Dashboard Navigation

> Source: Gmail draft (r3186919454526067260) · saved 2026-07-02T20:54:20Z · sanitized ARES work product (no client data)

---

Structured from Qualia "Navigate the Order Dashboard." This is Section 1 of the ARES internal reference (the plain-text manual Qualia doesn't give you). No client data.

=====================================================
ORDER DASHBOARD — LAYOUT
=====================================================
Left rail icons switch between: Summary | Notes | Tasks | Automations | Activity. "Send Message" is available from anywhere in the file.

SUMMARY: click property address. Gear icon (top right) customizes dashboard stats -- USER level only, not global (applies to all your orders, not the team's). Status dropdown is left of the gear. House icon = Google Maps/street view. Order timeline = manually change milestone. Closing team + contacts show at bottom.

NOTES: Add Note / + icon. Choose section from dropdown = where the note appears. @ or Add Person to tag (notifies via app/email). CRITICAL NOTE toggle -> note turns red, pins above all others, alerts top-left of summary; must be resolved to clear. Edit/X to modify/delete.

TASKS: file's workflow progress. Configure task defaults in Admin for auto-completion triggers + Smart Actions. Modify / Add Task / Add Task Group to change a single order's workflow. Hover checkbox to complete; X to remove; note icon to annotate.

AUTOMATIONS: pending + triggered Smart Actions. Trigger Manually icon; Remove Automation; hover "i" to see why an automation is pending or why it failed.

ACTIVITY: full audit log of every action (uploads, disbursements, etc.). Filter by Category or Completed By. Click a log item to jump to where it happened. Subscribe to track order status.

SEND MESSAGE: email w/ attachments; email w/ public web link; Qualia Connect (Connect users); Secure Document Portal (non-Connect users).

=====================================================
ORDER STATUS DEFINITIONS  (memorize — high impact)
=====================================================
PRE-OPEN: uses Pre-Open numbering; disbursements DISABLED; once changed away, CANNOT revert to Pre-Open. (Admin > Preferences > Basic > Order Numbering; can be per-agency.)
OPEN: full standard functionality.
ON HOLD: tasks + milestones DISABLED (file paused; can't process milestones or modify workflow tasks).
CLOSED: full functionality; required for REPORTING and 1099 eligibility; some auto-functions (transfer tax calc, Simplifile status) stop auto-updating.
CANCELLED: tasks/milestones disabled; auto-functions stop. *** Orders cancelled within the SAME billing period they were opened DO NOT count toward core platform allotment. ***

=====================================================
ARES OPERATIONAL / COST NOTES (why this matters)
=====================================================
1. COST LEVER: Cancel-same-billing-period = no allotment hit. Pair this with your low-margin $5 file carve-out -- disciplined status hygiene directly protects the 200/2400 allotment in the cost analysis.
2. KPI ACCURACY: "On Hold" pauses the clock operationally -- EXCLUDE on-hold days from Cycle Time (open->close) or aging metrics will overstate. Build the DAX to subtract on-hold duration.
3. REPORTING INTEGRITY: "Closed" status is what makes an order countable for reporting + 1099 -- enforce timely status changes or pull-through/revenue reports undercount.
4. CRITICAL NOTES + Critical Issues Report = your exception/redundancy surface; wire both into the closer dashboard.


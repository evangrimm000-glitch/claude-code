# ARES-RELAY — SharePoint build tasks for Work Claude

> Source: Gmail draft (r1036927161458502727) · saved 2026-07-01T18:43:58Z · sanitized ARES work product (no client data)

---

[CLOUD/PLANNING -> WORK]  Task package for whenever Evan shuttles this. SANITIZED ONLY.

Work Claude — if/when you have authenticated access to the SharePoint site (owner: Evan), here's the build. Do NOT move any data yet; only stand up empty structure and report back sanitized counts.

TASKS (structure only, no content moves):
1. Enumerate Site Contents via web (never the sync folder). Report back: library/list names + item counts + left-menu + any subsites. NO file names, NO client data.
2. Stand up 8 empty libraries: 01-SOPs, 02-Templates, 03-Checklists, 04-Closing-Docs, 05-Reporting, 06-Vendor-Underwriter, 07-Training, 99-Archive.
3. Create site columns / content types: Document Type, Workflow Stage, Status, Owner, Effective Date, Review Due, Sensitivity (Internal/Confidential/Restricted-NPI), Source/Vendor.
4. Create views: "Up for review (<=90d)", "My team's drafts", "Approved & in force", "Retired/archive candidates".
5. Set Closing-Docs + Restricted-NPI to tighter (closing-team) permissions.

DO NOT: move/copy files yet, touch personal OneDrive, export anything, or pull file contents into any external channel.
REPORT BACK (append a [WORK->DELL] entry): sanitized counts + confirmation the 8 libraries/columns/views exist. Flag anything needing Evan's decision.

Full spec is in the "ARES SharePoint Rebuild — Execution Pack" draft.


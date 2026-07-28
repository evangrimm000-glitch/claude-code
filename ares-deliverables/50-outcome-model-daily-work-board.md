# ARES Outcome Model — "Daily Work Board" (per person)

> Source: Gmail draft (r-5403965157723067917) · saved 2026-07-02T21:13:22Z · sanitized ARES work product (no client data)

---

Outcome-first design (locked before BI). Every element below is mapped to a NATIVE Qualia Field/Filter/Stat we already captured. Tags: [SRC]=native Qualia mechanism (verified) · [CONFIG]=depends on YOUR Admin setup, not guessed. No client data.

=====================================================
THE OUTCOME: every user opens ONE board that answers "what do I work on right now?"
=====================================================
Enabler [SRC]: Qualia auto-creates a report field + filter for EVERY assignable order role (Admin > Organization > Roles & Structure). So the same board template instantiates per role by filtering [Settlement Team Role] = current user (or Task Assignee = current user).

=====================================================
UNIVERSAL BOARD TEMPLATE (same skeleton for every role)
=====================================================
Each panel = {native source} -> {the decision it drives}

1. MY OPEN FILES (count + list)
   Source: Order Status filter = Open + [Settlement Team Role] = me. Show Order #, Milestone, Closing Date.
   Decision: the scope of my day at a glance.

2. DO NOW - OVERDUE
   Source: Overdue Tasks (Active Milestone) + Task Due Date filter = overdue, Task Assignee = me.
   Decision: fix these first.

3. DUE TODAY / THIS WEEK
   Source: Task Due Date filter = due within N days, Task Assignee = me. (Upcoming Tasks field.)
   Decision: sequence the rest of the day/week.

4. CLOSING SOON
   Source: Closing Date field + Close Date filter <= N days, Order Status = Open.
   Decision: prep priority (docs, funds, signing).

5. EXCEPTIONS / CRITICAL
   Source: Critical Issue field / Critical Issues preset report, filtered to my files.
   Decision: escalate / unblock now.

6. STALLED
   Source: Milestone filter (stuck at same milestone) + Order Open Date aging. (Subtract On-Hold time -- see Owner's Manual Sec 1.)
   Decision: chase / intervene.

7. MY MONTH vs TARGET  (optional, leadership-lite)
   Source: Order Status Stats (Closed Orders) + [Settlement Team Role] = me.
   Decision: am I on pace.

=====================================================
ROLE INSTANTIATIONS (tuning of which milestones/tasks matter)
=====================================================
[CONFIG] Exact role names + milestone names come from YOUR Admin > Roles & Structure and Core Workflows. NOT guessed. Below is the pattern to map onto your config:

PROCESSOR: emphasize panels 2/3/5; milestones = intake/title/commitment prep; watch missing-info + title-search tasks.
ESCROW OFFICER: emphasize 4/5; earnest received, payoff/wire verification, balancing, funding-ready.
CLOSER: emphasize 4; scheduled closings, cleared-to-close, signing logistics.
POST-CLOSING: emphasize 5/6; recording, policy issuance, final docs.
TEAM LEAD / MANAGER: same board, filter = whole team instead of self (RLS shows team roll-up).

=====================================================
WHY THIS IS THE GAME-CHANGER (and it's verified, not hopeful)
=====================================================
- Replaces the "logged in, now what?" blank stare with a prioritized to-do, per person.
- 100% built on native fields/filters/stats already documented -> buildable in Qualia Custom Reports even before Power BI.
- BI realization layer LATER adds: one clean visual per role, RLS so each sees only their files, animated/at-a-glance styling, and roll-up for leads.

=====================================================
OPEN (do not guess before building)
=====================================================
[CONFIG] Your actual assignable roles (Closer/Escrow Officer/Processor/etc.) and their exact names.
[CONFIG] Your Core Workflow milestone names.
[OPEN] Whether the board ships first as Qualia saved reports (fast) or waits for the Power BI layer (polished). Recommend: Qualia saved-report version DAY ONE, Power BI polish after.


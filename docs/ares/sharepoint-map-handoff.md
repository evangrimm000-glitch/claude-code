# ARES SharePoint Map — Session Handoff

**Status:** planning captured, no extraction run yet.
**Branch:** `claude/ares-sharepoint-map-kyxe1l`

> Written after a container restart wiped the working session. The decisions
> below are reconstructed from what survived in context; anything marked
> **[confirm]** needs a second look before it is treated as settled.

## Goal

Produce a defensible information architecture for the ARES SharePoint site:
inventory what is actually there, cluster it, and propose a target structure
plus a migration/cleanup path.

## Decision: where the analysis happens

Extraction runs **in-tenant** on the work machine. Analysis runs **in Claude**
on a sanitized export.

Rationale: the two options were Microsoft Copilot inside M365 versus Claude.
Copilot's only real advantage is that data never leaves the tenant — but a
metadata-only inventory (paths, counts, sizes, dates, extensions) has nothing
sensitive left in it once identity columns are stripped. Claude is materially
better at the clustering and IA-design work, and the loop is interactive rather
than a runbook handed to someone else.

Guardrail: **no file contents, no user names, no email addresses** leave the
tenant. Metadata only.

## Step 1 — Extract (work CP, PowerShell)

PowerShell is available on the work machine. Export library metadata to CSV,
one row per item. Fields to capture:

- Site / library / full server-relative path
- Item name and file extension
- Size in bytes
- Created and last-modified timestamps
- Item type (file vs folder)
- Version count, if cheap to get
- Folder depth (derivable from path)

Explicitly **do not** export: author/editor, permissions principals, checked-out
by, or any content preview field.

**[confirm]** whether PnP.PowerShell is installed / installable on the work CP,
or whether this has to fall back to the built-in SharePoint Online Management
Shell or a CSOM script.

## Step 2 — Sanitize

Before the CSV leaves the tenant:

- Drop every identity column.
- Scan `name` and `path` for personal names and client identifiers; replace with
  stable tokens (`CLIENT_01`, `PERSON_01`) and keep the mapping **on the work
  machine only**, never in the export.
- Spot-check the head and tail of the file by eye.

## Step 3 — Analyze (here)

Feed the sanitized CSV in and work through:

1. Volume and shape — items per library, depth distribution, size distribution.
2. Staleness — last-modified histogram; what has not been touched in 2+ years.
3. Duplication and near-duplication by name pattern.
4. File-type mix — where the real working documents are versus dead artifacts.
5. Natural clusters in the path/name data, which become the candidate IA.
6. Proposed target structure, plus an archive/delete/migrate disposition per
   cluster.

## Open items

- **[confirm]** Whether ARES has a company Claude account (Work/Enterprise/Team)
  under the work email. If so, the analysis step should move there instead of a
  personal account — same principle, cleaner provenance.
- **[confirm]** Scope: one site, or the whole tenant?
- Deliverable format: dashboard, written IA proposal, or both.

## Next action

Run Step 1 on the work CP, sanitize per Step 2, bring the CSV back.

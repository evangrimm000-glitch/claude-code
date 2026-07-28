# ARES-RELAY SharePoint Map — run steps + script (work laptop)

> Source: Gmail draft (r3444755022749862909) · saved 2026-07-01 · SharePoint deliverable
> The PowerShell script referenced below is saved separately at `scripts/Map-SharePoint-Full.ps1`.

---

Read-only SharePoint inventory. Metadata only, no file contents downloaded,
never touches OneDrive. Run on the work laptop as owner/admin.

=====================================================
STEP 0 - Use PowerShell 7 (NOT "Windows PowerShell")
=====================================================
Open "PowerShell 7" from Start. Confirm version:

$PSVersionTable.PSVersion

Major must be 7. If missing: winget install Microsoft.PowerShell (may need
admin).

=====================================================
STEP 1 - Save the script
=====================================================
Paste the SCRIPT (see scripts/Map-SharePoint-Full.ps1) into Notepad -> Save As ->
name: Map-SharePoint-Full.ps1
Save as type: All Files
location: Desktop

=====================================================
STEP 2 - Install helper module (one time)
=====================================================
Install-Module PnP.PowerShell -Scope CurrentUser -Force

=====================================================
STEP 3 - Allow script to run (this session only)
=====================================================
Set-ExecutionPolicy -Scope Process -Bypass

=====================================================
STEP 4 - Go to the Desktop
=====================================================
cd $env:USERPROFILE\Desktop

=====================================================
STEP 5 - Run it (put YOUR real site URL in quotes)
=====================================================
./Map-SharePoint-Full.ps1 -SiteUrl "https://<tenant>.sharepoint.com/sites/<YourIntranet>"

A Microsoft sign-in pops -> log in as you. It writes 4 CSVs to a SP-Map
folder on the Desktop:
01-site-tree.csv = sites + subsites (topography)
02-navigation.csv = the menus (wireframe)
03-lists-and-forms.csv = every library/list/form + item counts
04-all-docs.csv = every doc/file/folder + dates + last editor

Then paste back the SANITIZED version (site tree + menu + per-library
counts; drop file names/editors that contain client info) to build the
wireframe + gap analysis.

> NOTE (from the relay): Gmail linkified the placeholder tenant URL into a Google
> redirect in the original draft. Type the real tenant URL by hand — do not copy a
> `google.com/url?q=...` link.

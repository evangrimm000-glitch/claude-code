# Map-SharePoint-Full.ps1
# Read-only SharePoint inventory. Metadata only, no file contents downloaded, never touches OneDrive.
# Run on the work laptop as owner/admin in PowerShell 7.
# Source: Gmail draft r3444755022749862909 (ARES-RELAY SharePoint Map)

param(
[Parameter(Mandatory=$true)][string]$SiteUrl,
[string]$OutDir = "$env:USERPROFILE\Desktop\SP-Map"
)

if ($PSVersionTable.PSVersion.Major -lt 7) {
Write-Warning "Needs PowerShell 7. You're on $($PSVersionTable.PSVersion). Open 'PowerShell 7' and re-run."
return
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
Connect-PnPOnline -Url $SiteUrl -Interactive

$webUrls = @($SiteUrl)
try { $webUrls += (Get-PnPSubWeb -Recurse -ErrorAction Stop | Select-Object -ExpandProperty Url) } catch {}

$sites=@(); $nav=@(); $lists=@(); $files=@()

foreach ($wurl in ($webUrls | Select-Object -Unique)) {
try { Connect-PnPOnline -Url $wurl -Interactive } catch { Write-Warning "Skip $wurl : $($_.Exception.Message)"; continue }
$w = Get-PnPWeb
Write-Host "Web: $($w.Url)"
$sites += [pscustomobject]@{ Title=$w.Title; Url=$w.Url; Template=$w.WebTemplate }

foreach ($loc in 'QuickLaunch','TopNavigationBar') {
try { Get-PnPNavigationNode -Location $loc | ForEach-Object {
$nav += [pscustomobject]@{ Web=$w.Url; Menu=$loc; Title=$_.Title; LinksTo=$_.Url } } } catch {}
}

foreach ($l in (Get-PnPList | Where-Object { -not $_.Hidden })) {
$kind = switch ($l.BaseTemplate) {101{'DocLibrary'}100{'List'}119{'WikiPages'}850{'SitePages'}default{"Tmpl$($l.BaseTemplate)"}}
$lists += [pscustomobject]@{ Web=$w.Url; Title=$l.Title; Kind=$kind; ItemCount=$l.ItemCount; Url=$l.DefaultViewUrl }

if ($l.BaseTemplate -in 101,119,850) {
try {
$items = Get-PnPListItem -List $l -PageSize 500 -Fields FileLeafRef,FileRef,FileSystemObjectType,Modified,Editor,File_x0020_Type
foreach ($i in $items) { $f = $i.FieldValues
$files += [pscustomobject]@{
Web=$w.Url; Library=$l.Title
Type= if ($f.FileSystemObjectType -eq 1){'Folder'} else {'File'}
Name=$f.FileLeafRef; Path=$f.FileRef; Ext=$f.File_x0020_Type
Modified=$f.Modified; ModifiedBy=$f.Editor.LookupValue }
}
} catch { Write-Warning "Could not read library '$($l.Title)': $($_.Exception.Message)" }
}
}
}

$sites | Export-Csv "$OutDir\01-site-tree.csv" -NoTypeInformation -Encoding UTF8
$nav | Export-Csv "$OutDir\02-navigation.csv" -NoTypeInformation -Encoding UTF8
$lists | Sort-Object Web,Title | Export-Csv "$OutDir\03-lists-and-forms.csv" -NoTypeInformation -Encoding UTF8
$files | Sort-Object Web,Library,Path | Export-Csv "$OutDir\04-all-docs.csv" -NoTypeInformation -Encoding UTF8
Write-Host "`nDONE -> $OutDir"
Write-Host "Sites:$($sites.Count) Lists:$($lists.Count) Docs:$($files.Count)"

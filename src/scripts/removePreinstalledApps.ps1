#Requires -RunAsAdministrator

Write-Host "=== Preinstalled Apps Remover ===" -ForegroundColor Cyan
Write-Host "This will remove promotional apps and games (Candy Crush, Clipchamp, etc.)" -ForegroundColor Yellow
Write-Host "Essential apps preserved: Calculator, Photos, Paint, Store, Edge, Xbox" -ForegroundColor Gray
Write-Host "Note: Teams and OneNote will NOT be removed" -ForegroundColor Yellow
Write-Host "Feel free to edit the script to customize the app list" -ForegroundColor Green
Write-Host "This script has NO undo - reinstall manually if needed" -ForegroundColor Red

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$continue = Read-Host "y/n"

if ($continue.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# define preinstalled/non-core apps to remove
$preinstalledApps = @(
    # Games
    "*CandyCrush*",
    "*BubbleWitch*",
    "*MarchofEmpires*",
    # "*Minecraft*",
    "*Solitaire*",
    "*Disney*",
    "*FarmVille*",
    "*Hidden*",
    "*Phototastic*",
    
    # Microsoft promotional
    "Microsoft.GetHelp",
    "Microsoft.Getstarted",
    "Microsoft.Microsoft3DViewer",
    "Microsoft.MixedReality.Portal",
    # "Microsoft.Print3D",
    "Microsoft.SkypeApp",
    "Clipchamp.Clipchamp",
    # "Microsoft.Todos",
    # "Microsoft.PowerAutomateDesktop",
    
    # News/weather/finance (old UWP versions)
    "Microsoft.BingNews",
    "Microsoft.BingWeather", 
    "Microsoft.BingFinance",
    "Microsoft.BingSports",

    # Other
    "*LinkedInforWindows*",
    "*Facebook*",
    "*Twitter*",  # if it still exists
    "*TikTok*",
    "*Instagram*",
    # "*Spotify*",  # Trial version pre-installed on some OEM PCs - commented out in case it uninstalls non-preinstalled version. needs to be tested in VM
    "*Duolingo*",
    "*Uber*",
    "*PandoraMedia*",
    "*Dolby*",     # Dolby Access (trial)
    "*DolbyLaboratories*"
)

$removed = 0
$notFound = 0
$failed = 0

Write-Host "> Step [1/2] Removing preinstalledApps apps..." -ForegroundColor Yellow

foreach ($app in $preinstalledApps) {
    $package = Get-AppxPackage -Name $app -ErrorAction SilentlyContinue
    
    if ($package) {
        try {
            Remove-AppxPackage -Package $package.PackageFullName -ErrorAction Stop
            Write-Host "  Removed: $($package.Name)" -ForegroundColor Green
            $removed++
        }
        catch {
            Write-Host "  Failed to remove: $($package.Name)" -ForegroundColor Red
            $failed++
        }
    }
    else {
        $notFound++
    }
}

Write-Host "> Step [2/2] Removing provisioned packages (prevents reinstall for new users)..." -ForegroundColor Yellow
foreach ($app in $preinstalledApps) {
    $provisioned = Get-AppxProvisionedPackage -Online | Where-Object DisplayName -like $app
    
    if ($provisioned) {
        try {
            Remove-AppxProvisionedPackage -Online -PackageName $provisioned.PackageName -ErrorAction Stop
            Write-Host "  Removed provisioned: $($provisioned.DisplayName)" -ForegroundColor Green
        }
        catch {
            Write-Host "  Could not remove provisioned package" -ForegroundColor Yellow
        }
    }
}

Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Removed: $removed apps" -ForegroundColor Green
Write-Host "  Not found: $notFound apps (already removed or never installed)" -ForegroundColor Gray
if ($failed -gt 0) {
    Write-Host "Failed: $failed apps" -ForegroundColor Red
}

Write-Host "=== Finished ===" -ForegroundColor Cyan
Write-Host "PreinstalledApps have been removed" -ForegroundColor Green
Write-Host "  Note: Some apps may reinstall after major Windows updates" -ForegroundColor Yellow
Write-Host "  You can re-run this script anytime to clean them up again" -ForegroundColor Gray
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
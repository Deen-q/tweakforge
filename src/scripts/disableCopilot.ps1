#Requires -RunAsAdministrator

Write-Host "=== Copilot Disabler ===" -ForegroundColor Cyan
Write-Host "This will disable ALL Copilot variants across Windows using Group Policy registry keys and uninstall all Copilot app packages" -ForegroundColor Yellow
Write-Host "Note: Edge settings only affect Microsoft Edge users" -ForegroundColor Gray

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$continue = Read-Host "y/n"

if ($continue.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

$removedApps = @()

Write-Host "> Step [1/6] Disabling Copilot for current user..." -ForegroundColor Yellow
$hkcuCopilot = "HKCU:\Software\Policies\Microsoft\Windows\WindowsCopilot"

try {
    if (-not (Test-Path $hkcuCopilot)) {
        New-Item -Path $hkcuCopilot -Force | Out-Null
    }
    Set-ItemProperty -Path $hkcuCopilot -Name "TurnOffWindowsCopilot" -Type DWord -Value 1
    Write-Host "Copilot disabled for current user" -ForegroundColor Green
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "> Step [2/6] Disabling Copilot system-wide..." -ForegroundColor Yellow
$hklmCopilot = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WindowsCopilot"
try {
    if (-not (Test-Path $hklmCopilot)) {
        New-Item -Path $hklmCopilot -Force | Out-Null
    }
    Set-ItemProperty -Path $hklmCopilot -Name "TurnOffWindowsCopilot" -Type DWord -Value 1
    Write-Host "Copilot disabled system-wide" -ForegroundColor Green
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "> Step [3/6] Disabling Copilot in Edge sidebar..." -ForegroundColor Yellow
$edgeKey = "HKLM:\SOFTWARE\Policies\Microsoft\Edge"
try {
    if (-not (Test-Path $edgeKey)) {
        New-Item -Path $edgeKey -Force | Out-Null
    }
    Set-ItemProperty -Path $edgeKey -Name "HubsSidebarEnabled" -Type DWord -Value 0
    Set-ItemProperty -Path $edgeKey -Name "CopilotPageEnabled" -Type DWord -Value 0
    Write-Host "Copilot disabled in Edge" -ForegroundColor Green
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "> Step [4/6] Disabling Copilot suggestions in search..." -ForegroundColor Yellow
$explorerKey = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Explorer"
try {
    if (-not (Test-Path $explorerKey)) {
        New-Item -Path $explorerKey -Force | Out-Null
    }
    Set-ItemProperty -Path $explorerKey -Name "DisableSearchBoxSuggestions" -Type DWord -Value 1
    Write-Host "Search box suggestions disabled" -ForegroundColor Green
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "> Step [5/6] Uninstalling ALL Copilot apps..." -ForegroundColor Yellow

$copilotPackages = @(
    @{ Name = "Microsoft.Copilot"; Description = "Windows Copilot (Consumer)" }
    @{ Name = "Windows.Copilot"; Description = "Windows Copilot (System)" }
    @{ Name = "Microsoft.MicrosoftOfficeHub"; Description = "Microsoft 365 Copilot" }
)

foreach ($package in $copilotPackages) {
    try {
        $app = Get-AppxPackage -AllUsers | Where-Object { $_.Name -eq $package.Name }
        if ($app) {
            Write-Host "  - Removing $($package.Description)..." -ForegroundColor White
            $app | Remove-AppxPackage -AllUsers -ErrorAction Stop
            Write-Host "    Removed: $($package.Name)" -ForegroundColor Green
            $removedApps += $package.Description
        }
        else {
            Write-Host "  Not installed: $($package.Description)" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "    Could not remove $($package.Description): $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

if ($removedApps.Count -eq 0) {
    Write-Host "  → No Copilot apps were found to uninstall" -ForegroundColor Gray
}
else {
    Write-Host "  → Successfully removed $($removedApps.Count) app(s)" -ForegroundColor Green
}

Write-Host "> Step [6/6] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 2
    Start-Process "explorer.exe"
    Write-Host "Explorer restarted" -ForegroundColor Green
}
catch {
    Write-Host "Could not restart Explorer automatically" -ForegroundColor Yellow
}
    
Write-Host "=== Finished ===" -ForegroundColor Cyan
Write-Host "Copilot functionality disabled via registry policies" -ForegroundColor Green

if ($removedApps.Count -gt 0) {
    Write-Host "Removed $($removedApps.Count) Copilot app(s):" -ForegroundColor Green
    foreach ($app in $removedApps) {
        Write-Host "  - $app" -ForegroundColor White
    }
}
else {
    Write-Host "No Copilot apps were installed" -ForegroundColor Gray
}

Write-Host "IMPORTANT: You may still see a Copilot taskbar icon" -ForegroundColor Yellow
Write-Host "  To hide it: Right-click taskbar → Taskbar settings → Toggle Copilot off" -ForegroundColor White
Write-Host "  (Takes 3 seconds - this is safe and not protected like Widgets)" -ForegroundColor Gray

Write-Host "Windows updates may reinstall apps, but registry policies keep them disabled" -ForegroundColor Yellow
Write-Host "Restart recommended for all changes to take full effect" -ForegroundColor Yellow

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
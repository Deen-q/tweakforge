#Requires -RunAsAdministrator

Write-Host "=== Copilot Restorer (Complete) ===" -ForegroundColor Cyan
Write-Host "This will restore ALL Copilot settings to Windows defaults" -ForegroundColor Yellow
Write-Host "Note: This script CANNOT reinstall removed apps (use Microsoft Store)" -ForegroundColor Red

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$continue = Read-Host "y/n"

if ($continue.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

$changesApplied = 0

Write-Host "> Step [1/5] Restoring user-level settings..." -ForegroundColor Yellow
$hkcuCopilot = "HKCU:\Software\Policies\Microsoft\Windows\WindowsCopilot"
try {
    if (Test-Path $hkcuCopilot) {
        Remove-Item -Path $hkcuCopilot -Recurse -Force
        Write-Host "User policy removed (Copilot re-enabled for current user)" -ForegroundColor Green
        $changesApplied++
    }
    else {
        Write-Host "Already at default state (no user policy found)" -ForegroundColor Green
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "> Step [2/5] Restoring system-wide settings..." -ForegroundColor Yellow
$hklmCopilot = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WindowsCopilot"
try {
    if (Test-Path $hklmCopilot) {
        Remove-Item -Path $hklmCopilot -Recurse -Force
        Write-Host "System policy removed (Copilot re-enabled system-wide)" -ForegroundColor Green
        $changesApplied++
    }
    else {
        Write-Host "Already at default state (no system policy found)" -ForegroundColor Green
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "> Step [3/5] Restoring Edge Copilot..." -ForegroundColor Yellow
$edgeKey = "HKLM:\SOFTWARE\Policies\Microsoft\Edge"
try {
    $edgeRestored = $false
    if (Test-Path $edgeKey) {
        $hubsRemoved = Remove-ItemProperty -Path $edgeKey -Name "HubsSidebarEnabled" -ErrorAction SilentlyContinue
        $copilotRemoved = Remove-ItemProperty -Path $edgeKey -Name "CopilotPageEnabled" -ErrorAction SilentlyContinue
        
        if ($hubsRemoved -or $copilotRemoved) {
            Write-Host "Edge Copilot policies removed" -ForegroundColor Green
            $edgeRestored = $true
            $changesApplied++
        }
    }
    
    if (-not $edgeRestored) {
        Write-Host "Already at default state (no Edge policies found)" -ForegroundColor Green
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "> Step [4/5] Restoring search suggestions..." -ForegroundColor Yellow
$explorerKey = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Explorer"
try {
    if (Test-Path $explorerKey) {
        $removed = Remove-ItemProperty -Path $explorerKey -Name "DisableSearchBoxSuggestions" -ErrorAction SilentlyContinue
        if ($removed) {
            Write-Host "Search suggestions policy removed" -ForegroundColor Green
            $changesApplied++
        }
        else {
            Write-Host "Already at default state (no search policy found)" -ForegroundColor Green
        }
    }
    else {
        Write-Host "Already at default state (no search policy found)" -ForegroundColor Green
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "> Step [5/5] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 1
    Start-Process "explorer.exe"
    Write-Host "Explorer restarted" -ForegroundColor Green
}
catch {
    Write-Host "Could not restart Explorer automatically" -ForegroundColor Yellow
}

Write-Host "=== Summary ===" -ForegroundColor Cyan

if ($changesApplied -gt 0) {
    Write-Host " Restored $changesApplied Copilot setting(s) to Windows defaults" -ForegroundColor Green
}
else {
    Write-Host " No Copilot policies were active - system already at default state" -ForegroundColor Gray
}

Write-Host " IMPORTANT: Copilot apps were NOT reinstalled" -ForegroundColor Yellow
Write-Host "  To reinstall removed apps:" -ForegroundColor White
Write-Host "  1. Open Microsoft Store" -ForegroundColor White
Write-Host "  2. Search for 'Copilot' or 'Microsoft 365'" -ForegroundColor White
Write-Host "  3. Click 'Get' or 'Install' on each app" -ForegroundColor White

Write-Host "  If Copilot taskbar icon is hidden, enable it in:" -ForegroundColor Yellow
Write-Host "   Settings → Personalization → Taskbar → Toggle Copilot on" -ForegroundColor Gray

Write-Host "  Restart recommended for all changes to take full effect" -ForegroundColor Yellow

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
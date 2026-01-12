#Requires -RunAsAdministrator

Write-Host "=== Widgets Preloading Disabler (non-aggressive) ===" -ForegroundColor Cyan
Write-Host "This will disable widgets background processes" -ForegroundColor Yellow
Write-Host "After the script completes, please manually hide the widgets icon:" -ForegroundColor Yellow
Write-Host "  Right-click taskbar → Taskbar settings → Toggle Widgets off" -ForegroundColor White
Write-Host "  (Script can't modify this due to UCPD security - takes 5 seconds manually)" -ForegroundColor Gray
Write-Host "This script will NOT disable WebView2, which is critical for some apps, but will prevent it from idling on widgets" -ForegroundColor Red

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$continue = Read-Host "y/n"

if ($continue.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

Write-Host "> Step [1/2] Disabling widgets preloading..." -ForegroundColor Yellow
$dshKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Dsh"

try {
    if (-not (Test-Path $dshKey)) {
        New-Item -Path $dshKey -Force | Out-Null
    }
    Set-ItemProperty -Path $dshKey -Name "IsPrelaunchEnabled" -Type DWord -Value 0
    Write-Host "Widgets preloading disabled (saves 100-200MB RAM)" -ForegroundColor Green
}
catch {
    Write-Host "Error disabling preload: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "> Step [2/2] Restarting Windows Explorer..." -ForegroundColor Yellow
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
Write-Host "Widgets preloading disabled (background processes stopped)" -ForegroundColor Green
Write-Host "REMINDER: Manually hide the widgets icon from your taskbar!" -ForegroundColor Yellow
Write-Host "Note: Win+W shortcut still works but launches on-demand" -ForegroundColor Yellow
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
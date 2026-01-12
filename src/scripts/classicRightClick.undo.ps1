#Requires -RunAsAdministrator

Write-Host "=== Windows 11 Context Menu Restorer ===" -ForegroundColor Cyan
Write-Host "This will restore the Windows 11 default context menu" -ForegroundColor Yellow

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$continue = Read-Host "y/n"

if ($continue.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

Write-Host "> Step [1/2] Removing registry entry..." -ForegroundColor Yellow
try {
    if (Test-Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}") {
        Remove-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Recurse -Force
        Write-Host "Registry key removed successfully" -ForegroundColor Green
    }
    else {
        Write-Host "Registry key not found (already removed or never existed)" -ForegroundColor Green
    }
}
catch {
    Write-Host "Error removing registry key: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

Write-Host "> Step [2/2] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 1
    Start-Process "explorer.exe"
    Write-Host "Explorer restarted successfully" -ForegroundColor Green
}
catch {
    Write-Host "Could not restart Explorer automatically" -ForegroundColor Yellow
    Write-Host "  Please restart Explorer manually or restart your PC" -ForegroundColor Gray
}

Write-Host "=== Finished ===" -ForegroundColor Cyan
Write-Host "Windows 11 context menu has been restored" -ForegroundColor Green
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

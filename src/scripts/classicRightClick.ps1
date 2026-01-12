#Requires -RunAsAdministrator

Write-Host "=== Classic Right-Click Menu Enabler ===" -ForegroundColor Cyan
Write-Host "This will restore the Windows 10 style context menu" -ForegroundColor Yellow

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$continue = Read-Host "y/n"

if ($continue.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

Write-Host "> Step [1/2] Creating registry entry..." -ForegroundColor Yellow
try {
    New-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Name "InprocServer32" -Force | Out-Null
    Set-ItemProperty -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" -Name "(Default)" -Value ""
    Write-Host "Registry key created successfully" -ForegroundColor Green
}
catch {
    Write-Host "Error creating registry key: $($_.Exception.Message)" -ForegroundColor Red
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
Write-Host "Classic right-click menu is now active" -ForegroundColor Green
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
#Requires -RunAsAdministrator

Write-Host "=== Widgets Restorer ===" -ForegroundColor Cyan
Write-Host "This will restore widgets to default behavior" -ForegroundColor Yellow

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$continue = Read-Host "y/n"

if ($continue.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

Write-Host "> Step [1/2] Re-enabling widgets preloading..." -ForegroundColor Yellow
$dshKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Dsh"

try {
    if (Test-Path $dshKey) {
        Set-ItemProperty -Path $dshKey -Name "IsPrelaunchEnabled" -Type DWord -Value 1
        Write-Host "Widgets preloading restored" -ForegroundColor Green
    }
    else {
        Write-Host "Already at default state" -ForegroundColor Green
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "> Step [2/2] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 1
    Start-Process "explorer.exe"
    Write-Host "Explorer restarted" -ForegroundColor Green
}
catch {
    Write-Host "Could not restart Explorer automatically" -ForegroundColor Yellow
}

Write-Host "=== Finished ===" -ForegroundColor Cyan
Write-Host "Widgets restored to Windows defaults" -ForegroundColor Green
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
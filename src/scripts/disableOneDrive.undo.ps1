#Requires -RunAsAdministrator

Write-Host "=== OneDrive Reinstallation Helper ===" -ForegroundColor Cyan
Write-Host "This will clean up and prepare for OneDrive reinstallation. Will offer to take you to official reinstall web page" -ForegroundColor Yellow
Write-Host "The only reason this reverse script exists, is if a user ran the disable OneDrive script, but then changed their mind and wants to revert back to using OneDrive" -ForegroundColor Cyan

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$continue = Read-Host "y/n"

if ($continue.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

Write-Host "> Step [1/2] Cleaning up broken startup entries..." -ForegroundColor Yellow
$runKeys = @(
    "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
    "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"
)
$cleaned = $false
foreach ($runKey in $runKeys) {
    if (Test-Path $runKey) {
        $property = Get-ItemProperty -Path $runKey -Name "OneDrive" -ErrorAction SilentlyContinue
        if ($property) {
            Remove-ItemProperty -Path $runKey -Name "OneDrive" -Force -ErrorAction SilentlyContinue
            $cleaned = $true
        }
    }
}

$startupApproved = "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run"
if (Test-Path $startupApproved) {
    Remove-ItemProperty -Path $startupApproved -Name "OneDrive" -Force -ErrorAction SilentlyContinue
}

if ($cleaned) {
    Write-Host "Broken entries removed" -ForegroundColor Green
}
else {
    Write-Host "No broken entries found" -ForegroundColor Green
}

Write-Host "> Step [2/2] Ready to reinstall OneDrive" -ForegroundColor Yellow
Write-Host "Would you like to open the OneDrive download page? (y/n)" -ForegroundColor Cyan
$openBrowser = Read-Host

if ($openBrowser.ToLower() -in @("y", "yes")) {
    Start-Process "https://www.microsoft.com/en-us/microsoft-365/onedrive/download"
    Write-Host "Opening download page in browser..." -ForegroundColor Green
}

Write-Host "=== Ready for Reinstallation! ===" -ForegroundColor Cyan
Write-Host "System prepared for OneDrive installation" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Download OneDrive from the Microsoft website (if you missed the link earlier, it's: https://www.microsoft.com/en-us/microsoft-365/onedrive/download)" -ForegroundColor Gray
Write-Host "  2. Run OneDriveSetup.exe" -ForegroundColor Gray
Write-Host "  3. Sign in with your Microsoft account" -ForegroundColor Gray
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
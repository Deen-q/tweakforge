#Requires -RunAsAdministrator

Write-Host "=== OneDrive Removal Script ===" -ForegroundColor Cyan
Write-Host "This will remove OneDrive but allow reinstallation later" -ForegroundColor Yellow
Write-Host "Your OneDrive folder will NOT be deleted if files are present; but please tend to your folders before you run this script, just in case" -ForegroundColor Red

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$continue = Read-Host "y/n"

if ($continue.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

Write-Host "> Step [1/5] Stopping OneDrive process..." -ForegroundColor Yellow
$process = Get-Process -Name OneDrive -ErrorAction SilentlyContinue
if ($process) {
    Stop-Process -Name OneDrive -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    Write-Host "OneDrive process stopped" -ForegroundColor Green
}
else {
    Write-Host "OneDrive process not running" -ForegroundColor Green
}

Write-Host "> Step [2/5] Uninstalling OneDrive..." -ForegroundColor Yellow
$oneDriveSetup = "$env:SystemRoot\SysWOW64\OneDriveSetup.exe"
if (-not (Test-Path $oneDriveSetup)) {
    $oneDriveSetup = "$env:SystemRoot\System32\OneDriveSetup.exe"
}

if (Test-Path $oneDriveSetup) {
    Start-Process -FilePath $oneDriveSetup -ArgumentList "/uninstall" -Wait -NoNewWindow
    Write-Host "OneDrive uninstalled successfully" -ForegroundColor Green
}
else {
    Write-Host "OneDrive installer not found (may already be removed)" -ForegroundColor Yellow
}

Write-Host "> Step [3/5] Removing OneDrive from File Explorer..." -ForegroundColor Yellow
$clsidPaths = @(
    "HKCU:\Software\Classes\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}",
    "HKCU:\Software\Classes\Wow6432Node\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}"
)
foreach ($path in $clsidPaths) {
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
    }
}
Write-Host "OneDrive removed from File Explorer sidebar" -ForegroundColor Green

Write-Host "> Step [4/5] Removing OneDrive from startup (PREVENTS TERMINAL FLASHING)..." -ForegroundColor Yellow
$runKeys = @(
    "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
    "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"
)
foreach ($runKey in $runKeys) {
    if (Test-Path $runKey) {
        $oneDriveValue = Get-ItemProperty -Path $runKey -Name "OneDrive" -ErrorAction SilentlyContinue
        if ($oneDriveValue) {
            Remove-ItemProperty -Path $runKey -Name "OneDrive" -Force -ErrorAction SilentlyContinue
            Write-Host "  Removed from: $runKey" -ForegroundColor Gray
        }
    }
}

# Also remove from StartupApproved
$startupApproved = "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run"
if (Test-Path $startupApproved) {
    Remove-ItemProperty -Path $startupApproved -Name "OneDrive" -Force -ErrorAction SilentlyContinue
}

Write-Host "OneDrive removed from startup (avoids potential terminal flashing)" -ForegroundColor Green

Write-Host "> Step [5/5] Cleaning up OneDrive folders..." -ForegroundColor Yellow

$userOneDrive = "$env:USERPROFILE\OneDrive"
if (Test-Path $userOneDrive) {
    $fileCount = (Get-ChildItem -Path $userOneDrive -Recurse -File -ErrorAction SilentlyContinue | Measure-Object).Count
    if ($fileCount -gt 0) {
        Write-Host "  Kept $userOneDrive ($fileCount files found)" -ForegroundColor Yellow
        Write-Host "    Delete manually if no longer needed" -ForegroundColor Gray
    }
    else {
        Remove-Item -Path $userOneDrive -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Removed empty: $userOneDrive" -ForegroundColor Gray
    }
}

$oneDriveFolders = @(
    "$env:LOCALAPPDATA\Microsoft\OneDrive",
    "$env:PROGRAMDATA\Microsoft OneDrive"
)

foreach ($folder in $oneDriveFolders) {
    if (Test-Path $folder) {
        Remove-Item -Path $folder -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Removed: $folder" -ForegroundColor Gray
    }
}

Write-Host "Cleanup complete" -ForegroundColor Green

Write-Host "=== Finished ===" -ForegroundColor Cyan
Write-Host "OneDrive has been removed" -ForegroundColor Green
Write-Host "OneDrive can be reinstalled later if needed" -ForegroundColor Green
Write-Host "Restart recommended to complete removal" -ForegroundColor Yellow
Write-Host "To reinstall OneDrive later:" -ForegroundColor Cyan
Write-Host "   Download from: https://www.microsoft.com/en-us/microsoft-365/onedrive/download" -ForegroundColor Gray
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
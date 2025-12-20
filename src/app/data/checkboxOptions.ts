export interface CheckboxOption {
    id: string;
    name: string;
    script: string;
    undoScript: string | null;
    description: string;
    undoDescription: string;
}

/* Powershell scripts as TypeScript strings - will eventually be moved into separate .ps1 files */

// =============================================================================
// CLASSIC RIGHT-CLICK MENU
// =============================================================================

const classicRightClickScript = `
#Requires -RunAsAdministrator

Write-Host "\`\`n=== Classic Right-Click Menu Enabler ===" -ForegroundColor Cyan
Write-Host "This will restore the Windows 10 style context menu" -ForegroundColor Yellow

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$userConfirmation = Read-Host "y/n"

if ($userConfirmation.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# ============================================================================
# STEP 1: Create registry entry to disable new context menu
# ============================================================================
Write-Host "\`\`n[1/2] Creating registry entry..." -ForegroundColor Yellow
try {
    New-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Name "InprocServer32" -Force | Out-Null
    Set-ItemProperty -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" -Name "(Default)" -Value ""
    Write-Host "✓ Registry key created successfully" -ForegroundColor Green
} catch {
    Write-Host "✗ Error creating registry key: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# ============================================================================
# STEP 2: Restart Explorer to apply changes
# ============================================================================
Write-Host "\`\`n[2/2] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 1
    Start-Process "explorer.exe"
    Write-Host "✓ Explorer restarted successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not restart Explorer automatically" -ForegroundColor Yellow
    Write-Host "  Please restart Explorer manually or restart your PC" -ForegroundColor Gray
}

Write-Host "\`\`n=== Success! ===" -ForegroundColor Cyan
Write-Host "✓ Classic right-click menu is now active" -ForegroundColor Green
Write-Host "\`\`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

const undoClassicRightClickScript = `
#Requires -RunAsAdministrator

Write-Host "\`\`n=== Windows 11 Context Menu Restorer ===" -ForegroundColor Cyan
Write-Host "This will restore the Windows 11 default context menu" -ForegroundColor Yellow

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$userConfirmation = Read-Host "y/n"

if ($userConfirmation.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# ============================================================================
# STEP 1: Remove the registry entry
# ============================================================================
Write-Host "\`\`n[1/2] Removing registry entry..." -ForegroundColor Yellow
try {
    if (Test-Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}") {
        Remove-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Recurse -Force
        Write-Host "✓ Registry key removed successfully" -ForegroundColor Green
    } else {
        Write-Host "✓ Registry key not found (already removed or never existed)" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ Error removing registry key: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# ============================================================================
# STEP 2: Restart Explorer to apply changes
# ============================================================================
Write-Host "\`\`n[2/2] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 1
    Start-Process "explorer.exe"
    Write-Host "✓ Explorer restarted successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not restart Explorer automatically" -ForegroundColor Yellow
    Write-Host "  Please restart Explorer manually or restart your PC" -ForegroundColor Gray
}

Write-Host "\`\`n=== Success! ===" -ForegroundColor Cyan
Write-Host "✓ Windows 11 context menu has been restored" -ForegroundColor Green
Write-Host "\`\`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

// =============================================================================
// ONEDRIVE
// =============================================================================

const disableOneDriveScript = `
#Requires -RunAsAdministrator

Write-Host "\`\`n=== OneDrive Removal Script ===" -ForegroundColor Cyan
Write-Host "This will remove OneDrive but allow reinstallation later" -ForegroundColor Yellow
Write-Host "\`\`nYour OneDrive folder will NOT be deleted if files are present; but please tend to your folders before you run this script, just in case" -ForegroundColor Red

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$userConfirmation = Read-Host "y/n"

if ($userConfirmation.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# ============================================================================
# STEP 1: Stop OneDrive process
# ============================================================================
Write-Host "\`\`n[1/5] Stopping OneDrive process..." -ForegroundColor Yellow
$process = Get-Process -Name OneDrive -ErrorAction SilentlyContinue
if ($process) {
    Stop-Process -Name OneDrive -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    Write-Host "✓ OneDrive process stopped" -ForegroundColor Green
} else {
    Write-Host "✓ OneDrive process not running" -ForegroundColor Green
}

# ============================================================================
# STEP 2: Uninstall OneDrive
# ============================================================================
Write-Host "\`\`n[2/5] Uninstalling OneDrive..." -ForegroundColor Yellow
$oneDriveSetup = "$env:SystemRoot\SysWOW64\OneDriveSetup.exe"
if (-not (Test-Path $oneDriveSetup)) {
    $oneDriveSetup = "$env:SystemRoot\System32\OneDriveSetup.exe"
}

if (Test-Path $oneDriveSetup) {
    Start-Process -FilePath $oneDriveSetup -ArgumentList "/uninstall" -Wait -NoNewWindow
    Write-Host "✓ OneDrive uninstalled successfully" -ForegroundColor Green
} else {
    Write-Host "⚠ OneDrive installer not found (may already be removed)" -ForegroundColor Yellow
}

# ============================================================================
# STEP 3: Remove OneDrive from File Explorer sidebar
# ============================================================================
Write-Host "\`\`n[3/5] Removing OneDrive from File Explorer..." -ForegroundColor Yellow
$clsidPaths = @(
    "HKCU:\Software\Classes\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}",
    "HKCU:\Software\Classes\Wow6432Node\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}"
)
foreach ($path in $clsidPaths) {
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
    }
}
Write-Host "✓ OneDrive removed from File Explorer sidebar" -ForegroundColor Green

# ============================================================================
# STEP 4: Remove OneDrive from startup (PREVENTS TERMINAL FLASHING)
# ============================================================================
Write-Host "\`\`n[4/5] Removing OneDrive from startup..." -ForegroundColor Yellow
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

Write-Host "✓ OneDrive removed from startup (no more terminal flashing!)" -ForegroundColor Green

# ============================================================================
# STEP 5: Clean up OneDrive folders
# ============================================================================
Write-Host "\`\`n[5/5] Cleaning up OneDrive folders..." -ForegroundColor Yellow

# FIRST: Handle user's OneDrive folder
$userOneDrive = "$env:USERPROFILE\OneDrive"
if (Test-Path $userOneDrive) {
    $fileCount = (Get-ChildItem -Path $userOneDrive -Recurse -File -ErrorAction SilentlyContinue | Measure-Object).Count
    if ($fileCount -gt 0) {
        Write-Host "  ⚠ Kept $userOneDrive ($fileCount files found)" -ForegroundColor Yellow
        Write-Host "    Delete manually if no longer needed" -ForegroundColor Gray
    } else {
        Remove-Item -Path $userOneDrive -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Removed empty: $userOneDrive" -ForegroundColor Gray
    }
}

# THEN: Remove application folders (safe to delete)
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

Write-Host "✓ Cleanup complete" -ForegroundColor Green

Write-Host "\`\`n=== Success! ===" -ForegroundColor Cyan
Write-Host "✓ OneDrive has been removed" -ForegroundColor Green
Write-Host "✓ OneDrive can be reinstalled later if needed" -ForegroundColor Green
Write-Host "\`\`nⓘ  Restart recommended to complete removal" -ForegroundColor Yellow
Write-Host "\`\`n💡 To reinstall OneDrive later:" -ForegroundColor Cyan
Write-Host "   Download from: https://www.microsoft.com/en-us/microsoft-365/onedrive/download" -ForegroundColor Gray
Write-Host "\`\`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

const undoDisableOneDriveScript = `
#Requires -RunAsAdministrator

Write-Host "\`\`n=== OneDrive Reinstallation Helper ===" -ForegroundColor Cyan
Write-Host "This will clean up and prepare for OneDrive reinstallation. Will offer to take you to official reinstall web page" -ForegroundColor Yellow
Write-Host "The only reason this reverse script exists, is if a user ran the disable OneDrive script, but then changed their mind and wants to revert back to using OneDrive" -ForegroundColor Cyan

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$userConfirmation = Read-Host "y/n"

if ($userConfirmation.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# ============================================================================
# STEP 1: Clean up any broken startup entries
# ============================================================================ 
Write-Host "\`\`n[1/2] Cleaning up broken startup entries..." -ForegroundColor Yellow
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
    Write-Host "✓ Broken entries removed" -ForegroundColor Green
} else {
    Write-Host "✓ No broken entries found" -ForegroundColor Green
}

# ============================================================================
# STEP 2: Offer to open download page
# ============================================================================
Write-Host "\`\`n[2/2] Ready to reinstall OneDrive" -ForegroundColor Yellow
Write-Host "Would you like to open the OneDrive download page? (y/n)" -ForegroundColor Cyan
$openBrowser = Read-Host

if ($openBrowser.ToLower() -in @("y", "yes")) {
    Start-Process "https://www.microsoft.com/en-us/microsoft-365/onedrive/download"
    Write-Host "✓ Opening download page in browser..." -ForegroundColor Green
}

Write-Host "\`\`n=== Ready for Reinstallation! ===" -ForegroundColor Cyan
Write-Host "✓ System prepared for OneDrive installation" -ForegroundColor Green
Write-Host "\`\`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Download OneDrive from the Microsoft website (if you missed the link earlier, it's: https://www.microsoft.com/en-us/microsoft-365/onedrive/download)" -ForegroundColor Gray
Write-Host "  2. Run OneDriveSetup.exe" -ForegroundColor Gray
Write-Host "  3. Sign in with your Microsoft account" -ForegroundColor Gray
Write-Host "\`\`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

// =============================================================================
// DISABLE WIDGET PRELOAD
// =============================================================================

/* FOLLOWING THE INTRO OF UCPD, MODIFICATIONS TO TaskbaDa ARE ACTIVELY BLOCKED - USERS MUST MANUALLY REMOVE TASKBAR WIDGETS VIA W11 UI */
const disableWidgetPreloadScript = `
#Requires -RunAsAdministrator

Write-Host "\`\`n=== Widgets Disabler (non-aggressive) ===" -ForegroundColor Cyan
Write-Host "This will disable widgets background processes" -ForegroundColor Yellow
Write-Host "After the script completes, please manually hide the widgets icon:" -ForegroundColor Yellow
Write-Host "  Right-click taskbar → Taskbar settings → Toggle Widgets off" -ForegroundColor White
Write-Host "  (Script can't modify this due to UCPD security - takes 5 seconds manually)" -ForegroundColor Gray
Write-Host "This script will NOT disable WebView2, which is critical for some apps, but will prevent it from idling on widgets" -ForegroundColor Red

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$userConfirmation = Read-Host "y/n"

if ($userConfirmation.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# ============================================================================
# STEP 1: Disable widgets preloading
# ============================================================================
Write-Host "\`\`n[1/2] Disabling widgets preloading..." -ForegroundColor Yellow
$dshKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Dsh"

try {
    if (-not (Test-Path $dshKey)) {
        New-Item -Path $dshKey -Force | Out-Null
    }
    Set-ItemProperty -Path $dshKey -Name "IsPrelaunchEnabled" -Type DWord -Value 0
    Write-Host "✓ Widgets preloading disabled (saves 100-200MB RAM)" -ForegroundColor Green
} catch {
    Write-Host "✗ Error disabling preload: $($_.Exception.Message)" -ForegroundColor Red
}

# ============================================================================
# STEP 2: Restart Explorer to apply changes
# ============================================================================
Write-Host "\`\`n[2/2] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 2
    Start-Process "explorer.exe"
    Write-Host "✓ Explorer restarted" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not restart Explorer automatically" -ForegroundColor Yellow
}

Write-Host "\`\`n=== Success! ===" -ForegroundColor Cyan
Write-Host "✓ Widgets preloading disabled (background processes stopped)" -ForegroundColor Green
Write-Host "⚠ REMINDER: Manually hide the widgets icon from your taskbar!" -ForegroundColor Yellow
Write-Host "\`\`nⓘ  Note: Win+W shortcut still works but launches on-demand" -ForegroundColor Yellow
Write-Host "\`\`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

const undoDisableWidgetPreloadScript = `
#Requires -RunAsAdministrator

Write-Host "\`\`n=== Widgets Restorer ===" -ForegroundColor Cyan
Write-Host "This will restore widgets to default behavior" -ForegroundColor Yellow

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$userConfirmation = Read-Host "y/n"

if ($userConfirmation.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# ============================================================================
# STEP 1:  Re-enable widgets preloading
# ============================================================================
Write-Host "\`\`n[1/2] Re-enabling widgets preloading..." -ForegroundColor Yellow
$dshKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Dsh"

try {
    if (Test-Path $dshKey) {
        Set-ItemProperty -Path $dshKey -Name "IsPrelaunchEnabled" -Type DWord -Value 1
        Write-Host "✓ Widgets preloading restored" -ForegroundColor Green
    } else {
        Write-Host "✓ Already at default state" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

# ============================================================================
# STEP 2: Restart Explorer to apply changes
# ============================================================================
Write-Host "\`\`n[2/2] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 1
    Start-Process "explorer.exe"
    Write-Host "✓ Explorer restarted" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not restart Explorer automatically" -ForegroundColor Yellow
}

Write-Host "\`\`n=== Success! ===" -ForegroundColor Cyan
Write-Host "✓ Widgets restored to Windows defaults" -ForegroundColor Green
Write-Host "\`\`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

// =============================================================================
// DISABLE COPILOT
// =============================================================================

const disableCopilotScript = `
#Requires -RunAsAdministrator

Write-Host "\`\`n=== Copilot Disabler ===" -ForegroundColor Cyan
Write-Host "This will disable ALL Copilot variants across Windows using Group Policy registry keys and uninstall all Copilot app packages" -ForegroundColor Yellow

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$userConfirmation = Read-Host "y/n"

if ($userConfirmation.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

$removedApps = @()

# ============================================================================
# STEP 1: Disable Copilot in Windows (User level)
# ============================================================================
Write-Host "\`\`n[1/6] Disabling Copilot for current user..." -ForegroundColor Yellow
$hkcuCopilot = "HKCU:\Software\Policies\Microsoft\Windows\WindowsCopilot"

try {
    if (-not (Test-Path $hkcuCopilot)) {
        New-Item -Path $hkcuCopilot -Force | Out-Null
    }
    Set-ItemProperty -Path $hkcuCopilot -Name "TurnOffWindowsCopilot" -Type DWord -Value 1
    Write-Host "✓ Copilot disabled for current user" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# ============================================================================
# STEP 2: Disable Copilot system-wide (All users)
# ============================================================================
Write-Host "\`\`n[2/6] Disabling Copilot system-wide..." -ForegroundColor Yellow
$hklmCopilot = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WindowsCopilot"
try {
    if (-not (Test-Path $hklmCopilot)) {
        New-Item -Path $hklmCopilot -Force | Out-Null
    }
    Set-ItemProperty -Path $hklmCopilot -Name "TurnOffWindowsCopilot" -Type DWord -Value 1
    Write-Host "✓ Copilot disabled system-wide" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# ============================================================================
# STEP 3: Disable Copilot in Edge (Browser) sidebar
# ============================================================================
Write-Host "\`\`n[3/6] Disabling Copilot in Edge sidebar..." -ForegroundColor Yellow
Write-Host "Remember, this only applies to users that use Microsoft Edge!" -ForegroundColor Gray
$edgeKey = "HKLM:\SOFTWARE\Policies\Microsoft\Edge"
try {
    if (-not (Test-Path $edgeKey)) {
        New-Item -Path $edgeKey -Force | Out-Null
    }
    Set-ItemProperty -Path $edgeKey -Name "HubsSidebarEnabled" -Type DWord -Value 0
    Set-ItemProperty -Path $edgeKey -Name "CopilotPageEnabled" -Type DWord -Value 0
    Write-Host "✓ Copilot disabled in Edge" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# ============================================================================
# STEP 4: Disable Copilot suggestions in search
# ============================================================================
Write-Host "\`\`n[4/6] Disabling Copilot in search..." -ForegroundColor Yellow
$explorerKey = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Explorer"
try {
    if (-not (Test-Path $explorerKey)) {
        New-Item -Path $explorerKey -Force | Out-Null
    }
    Set-ItemProperty -Path $explorerKey -Name "DisableSearchBoxSuggestions" -Type DWord -Value 1
    Write-Host "✓ Search box suggestions disabled" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# ============================================================================
# STEP 5: Uninstall ALL Copilot Apps
# ============================================================================
Write-Host "\`\`n[5/6] Uninstalling Copilot apps..." -ForegroundColor Yellow

$copilotPackages = @(
    @{ Name = "Microsoft.Copilot"; Description = "Windows Copilot (Consumer)" }
    @{ Name = "Windows.Copilot"; Description = "Windows Copilot (System)" }
    @{ Name = "Microsoft.MicrosoftOfficeHub"; Description = "Microsoft 365 Copilot" }
)

foreach ($package in $copilotPackages) {
    try {
        $app = Get-AppxPackage -AllUsers | Where-Object { $_.Name -eq $package.Name }
        if ($app) {
            Write-Host "  • Removing $($package.Description)..." -ForegroundColor White
            $app | Remove-AppxPackage -AllUsers -ErrorAction Stop
            Write-Host "    ✓ Removed: $($package.Name)" -ForegroundColor Green
            $removedApps += $package.Description
        } else {
            Write-Host "  ⓘ Not installed: $($package.Description)" -ForegroundColor Gray
        }
    } catch {
        Write-Host "    ⚠ Could not remove $($package.Description): $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

if ($removedApps.Count -eq 0) {
    Write-Host "\`\`n  → No Copilot apps were found to uninstall" -ForegroundColor Gray
} else {
    Write-Host "\`\`n  → Successfully removed $($removedApps.Count) app(s)" -ForegroundColor Green
}

# ============================================================================
# STEP 6: Restart Explorer (optional, for immediate effect)
# ============================================================================
Write-Host "\`\`n[6/6] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 2
    Start-Process "explorer.exe"
    Write-Host "✓ Explorer restarted" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not restart Explorer automatically" -ForegroundColor Yellow
}
    
Write-Host "\`\`n=== Success! ===" -ForegroundColor Cyan
Write-Host "✓ Copilot functionality disabled via registry policies" -ForegroundColor Green

if ($removedApps.Count -gt 0) {
    Write-Host "✓ Removed $($removedApps.Count) Copilot app(s):" -ForegroundColor Green
    foreach ($app in $removedApps) {
        Write-Host "  • $app" -ForegroundColor White
    }
} else {
    Write-Host "ⓘ No Copilot apps were installed" -ForegroundColor Gray
}

Write-Host "\`\`n⚠ IMPORTANT: You may still see a Copilot taskbar icon" -ForegroundColor Yellow
Write-Host "  To hide it: Right-click taskbar → Taskbar settings → Toggle Copilot off" -ForegroundColor White
Write-Host "  (Takes 3 seconds - this is safe and not protected like Widgets)" -ForegroundColor Gray

Write-Host "\`\`nⓘ  Windows updates may reinstall apps, but registry policies keep them disabled" -ForegroundColor Yellow
Write-Host "ⓘ  Restart recommended for all changes to take full effect" -ForegroundColor Yellow

Write-Host "\`\`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

const undoDisableCopilotScript = `
#Requires -RunAsAdministrator

Write-Host "\`\`n=== Copilot Restorer (Complete) ===" -ForegroundColor Cyan
Write-Host "This will restore ALL Copilot settings to Windows defaults" -ForegroundColor Yellow
Write-Host "⚠ Note: This script CANNOT reinstall removed apps (use Microsoft Store)" -ForegroundColor Red

Write-Host "CONFIRMATION: Run this script?" -ForegroundColor Cyan
$userConfirmation = Read-Host "y/n"

if ($userConfirmation.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

$changesApplied = 0

# ============================================================================
# STEP 1: Remove HKCU policy
# ============================================================================
Write-Host "\`\`n[1/5] Restoring user-level settings..." -ForegroundColor Yellow
$hkcuCopilot = "HKCU:\Software\Policies\Microsoft\Windows\WindowsCopilot"
try {
    if (Test-Path $hkcuCopilot) {
        Remove-Item -Path $hkcuCopilot -Recurse -Force
        Write-Host "✓ User policy removed (Copilot re-enabled for current user)" -ForegroundColor Green
        $changesApplied++
    } else {
        Write-Host "✓ Already at default state (no user policy found)" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

# ============================================================================
# STEP 2: Remove HKLM policy
# ============================================================================
Write-Host "\`\`n[2/5] Restoring system-wide settings..." -ForegroundColor Yellow
$hklmCopilot = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WindowsCopilot"
try {
    if (Test-Path $hklmCopilot) {
        Remove-Item -Path $hklmCopilot -Recurse -Force
        Write-Host "✓ System policy removed (Copilot re-enabled system-wide)" -ForegroundColor Green
        $changesApplied++
    } else {
        Write-Host "✓ Already at default state (no system policy found)" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

# ============================================================================
# STEP 3: Restore Edge settings
# ============================================================================
Write-Host "\`\`n[3/5] Restoring Edge Copilot..." -ForegroundColor Yellow
$edgeKey = "HKLM:\SOFTWARE\Policies\Microsoft\Edge"
try {
    $edgeRestored = $false
    if (Test-Path $edgeKey) {
        $hubsRemoved = Remove-ItemProperty -Path $edgeKey -Name "HubsSidebarEnabled" -ErrorAction SilentlyContinue
        $copilotRemoved = Remove-ItemProperty -Path $edgeKey -Name "CopilotPageEnabled" -ErrorAction SilentlyContinue
        
        if ($hubsRemoved -or $copilotRemoved) {
            Write-Host "✓ Edge Copilot policies removed" -ForegroundColor Green
            $edgeRestored = $true
            $changesApplied++
        }
    }
    
    if (-not $edgeRestored) {
        Write-Host "✓ Already at default state (no Edge policies found)" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

# ============================================================================
# STEP 4: Restore search settings
# ============================================================================
Write-Host "\`\`n[4/5] Restoring search suggestions..." -ForegroundColor Yellow
$explorerKey = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Explorer"
try {
    if (Test-Path $explorerKey) {
        $removed = Remove-ItemProperty -Path $explorerKey -Name "DisableSearchBoxSuggestions" -ErrorAction SilentlyContinue
        if ($removed) {
            Write-Host "✓ Search suggestions policy removed" -ForegroundColor Green
            $changesApplied++
        } else {
            Write-Host "✓ Already at default state (no search policy found)" -ForegroundColor Green
        }
    } else {
        Write-Host "✓ Already at default state (no search policy found)" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

# ============================================================================
# STEP 5: Restart Explorer (for immediate effect)
# ============================================================================
Write-Host "\`\`n[5/5] Restarting Windows Explorer..." -ForegroundColor Yellow
try {
    Stop-Process -Name "explorer" -Force
    Start-Sleep -Seconds 1
    Start-Process "explorer.exe"
    Write-Host "✓ Explorer restarted" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not restart Explorer automatically" -ForegroundColor Yellow
}

Write-Host "\`\`n=== Summary ===" -ForegroundColor Cyan

if ($changesApplied -gt 0) {
    Write-Host "✓ Restored $changesApplied Copilot setting(s) to Windows defaults" -ForegroundColor Green
} else {
    Write-Host "ⓘ No Copilot policies were active - system already at default state" -ForegroundColor Gray
}

Write-Host "\`\`n⚠ IMPORTANT: Copilot apps were NOT reinstalled" -ForegroundColor Yellow
Write-Host "  To reinstall removed apps:" -ForegroundColor White
Write-Host "  1. Open Microsoft Store" -ForegroundColor White
Write-Host "  2. Search for 'Copilot' or 'Microsoft 365'" -ForegroundColor White
Write-Host "  3. Click 'Get' or 'Install' on each app" -ForegroundColor White

Write-Host "\`\`nⓘ  If Copilot taskbar icon is hidden, enable it in:" -ForegroundColor Yellow
Write-Host "   Settings → Personalization → Taskbar → Toggle Copilot on" -ForegroundColor Gray

Write-Host "\`\`nⓘ  Restart recommended for all changes to take full effect" -ForegroundColor Yellow

Write-Host "\`\`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

// =============================================================================
// REMOVE UNWANTED GAMES & PROMOTIONAL APPS
// =============================================================================

const removeBloatwareScript = `
#Requires -RunAsAdministrator

Write-Host "\`\`n=== Bloatware Remover ===" -ForegroundColor Cyan
Write-Host "This will remove Microsoft promotional apps and games not intentionally installed by the user" -ForegroundColor Yellow
Write-Host "\`\`nNote: Teams and OneNote will NOT be removed" -ForegroundColor Yellow
Write-Host "Apps to be removed:" -ForegroundColor Yellow
Write-Host "  • Games: Candy Crush, Solitaire, Bubble Witch, etc." -ForegroundColor Gray
Write-Host "  • Promotional: Clipchamp, Microsoft Tips, News, GetHelp" -ForegroundColor Gray
Write-Host "\`\`nApps that will NOT be touched:" -ForegroundColor Green
Write-Host "  • Calculator, Notepad, Photos, Paint, Camera" -ForegroundColor Gray
Write-Host "  • Microsoft Store, Edge, Settings" -ForegroundColor Gray
Write-Host "  • Xbox apps (if you're a gamer)" -ForegroundColor Gray
Write-Host "Feel free to edit the script if you'd like to omit/add apps to the list :)" -ForegroundColor Green
Write-Host "This script DOES NOT have a undo/reverse script - you will have to manually reinstall the apps you want back" -ForegroundColor Red

Write-Host "\`\`nCONFIRMATION: Run this script?" -ForegroundColor Cyan
$userConfirmation = Read-Host "y/n"

if ($userConfirmation.ToLower() -notin @("y", "yes")) {
    Write-Host "You have selected not to continue. No Changes were made." -ForegroundColor Yellow
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    return
}

# Define bloatware apps to remove
$bloatwareApps = @(
    # Games
    "*CandyCrush*",
    "*BubbleWitch*",
    "*MarchofEmpires*",
    "*Minecraft*",
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
    "Microsoft.Print3D",
    "Microsoft.SkypeApp",
    "Clipchamp.Clipchamp",
    "Microsoft.Todos",
    "Microsoft.PowerAutomateDesktop",
    
    # News/Weather/Finance (old UWP versions)
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
    "*Spotify*",  # Trial version pre-installed on some OEM PCs
    "*Duolingo*",
    "*Uber*",
    "*PandoraMedia*",
    "*Dolby*",     # Dolby Access (trial)
    "*DolbyLaboratories*"
)

$removed = 0
$notFound = 0
$failed = 0

# ============================================================================
# STEP 1: Uninstall non-critical apps that users did not choose to install ("bloatware")
# ============================================================================
Write-Host "\`\`n[1/2] Removing bloatware apps..." -ForegroundColor Yellow

foreach ($app in $bloatwareApps) {
    $package = Get-AppxPackage -Name $app -ErrorAction SilentlyContinue
    
    if ($package) {
        try {
            Remove-AppxPackage -Package $package.PackageFullName -ErrorAction Stop
            Write-Host "  ✓ Removed: $($package.Name)" -ForegroundColor Green
            $removed++
        } catch {
            Write-Host "  ✗ Failed to remove: $($package.Name)" -ForegroundColor Red
            $failed++
        }
    } else {
        $notFound++
    }
}

# ============================================================================
# STEP 2: Remove provisioned packages (apps that may come with laptops and such), and prevents future reinstall for new users
# ============================================================================
Write-Host "\`\`n[2/2] Removing provisioned packages (prevents reinstall for new users)..." -ForegroundColor Yellow
foreach ($app in $bloatwareApps) {
    $provisioned = Get-AppxProvisionedPackage -Online | Where-Object DisplayName -like $app
    
    if ($provisioned) {
        try {
            Remove-AppxProvisionedPackage -Online -PackageName $provisioned.PackageName -ErrorAction Stop
            Write-Host "  ✓ Removed provisioned: $($provisioned.DisplayName)" -ForegroundColor Green
        } catch {
            Write-Host "  ⚠ Could not remove provisioned package" -ForegroundColor Yellow
        }
    }
}

Write-Host "\`\`n=== Summary ===" -ForegroundColor Cyan
Write-Host "✓ Removed: $removed apps" -ForegroundColor Green
Write-Host "  Not found: $notFound apps (already removed or never installed)" -ForegroundColor Gray
if ($failed -gt 0) {
    Write-Host "✗ Failed: $failed apps" -ForegroundColor Red
}

Write-Host "\`\`n=== Success! ===" -ForegroundColor Cyan
Write-Host "✓ Bloatware has been removed" -ForegroundColor Green
Write-Host "\`\`nⓘ  Note: Some apps may reinstall after major Windows updates" -ForegroundColor Yellow
Write-Host "  You can re-run this script anytime to clean them up again" -ForegroundColor Gray
Write-Host "\`\`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
`;

// =============================================================================
// 
// =============================================================================

const checkboxOptions: readonly CheckboxOption[] = [
    {
        id: "restoreRightClickMenu",
        name: "Restore Classic Right-click Menu",
        script: classicRightClickScript,
        undoScript: undoClassicRightClickScript,
        description: "Returns the original right-click menu when in file explorer",
        undoDescription: "Back to default: Windows 11 right-click menu"
    },
    {
        id: "disableOneDrive",
        name: "Disable OneDrive",
        script: disableOneDriveScript,
        undoScript: undoDisableOneDriveScript,
        description: "Completely removes OneDrive from your Local Machine (via HKLM)",
        undoDescription: "Return OneDrive as it was. Will offer to take you to official reinstall web page"
    },
    {
        id: "disableWidgetPreload",
        name: "Disable Widget Preload",
        script: disableWidgetPreloadScript,
        undoScript: undoDisableWidgetPreloadScript,
        description: "Stops widgets from running in background (potentially saves 100-200MB RAM) without breaking other apps via WebView2",
        undoDescription: "Restore widgets to default behavior"
    },
    {
        id: "disableCopilot",
        name: "Disable Copilot",
        script: disableCopilotScript,
        undoScript: undoDisableCopilotScript,
        description: "Disables copilot at the user-level AND system-wide (REVERSIBLE), including: copilot in Edge sidebar, copilot suggestions in search",
        undoDescription: "Returns Copilot to its default state"
    },
    {
        id: "removeBloatware",
        name: "Remove Bloatware (non-aggressive)",
        script: removeBloatwareScript,
        undoScript: null,
        description: "Removes promotional apps, games, and trials (Candy Crush, Clipchamp, etc.). Preserves essential apps and doesn't touch Teams/OneNote to avoid interfering with business versions",
        undoDescription: ""
    },
];

export default checkboxOptions;

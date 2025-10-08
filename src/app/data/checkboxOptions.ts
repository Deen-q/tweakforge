export interface CheckboxOption {
    id: string;
    name: string;
    script: string;
    undoScript: string;
    description: string;
    undoDescription: string;
}

// =============================================================================
// CLASSIC RIGHT-CLICK MENU
// =============================================================================

// const classicRightClickScript = `
// # Enable Windows 11 classic right-click menu
// # This script modifies the registry and restarts Explorer

// Write-Host "Enabling classic right-click menu..." -ForegroundColor Green

// # Step 1: Create registry entry to disable new context menu
// New-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Name "InprocServer32" -Force | Out-Null
// Set-ItemProperty -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" -Name "(Default)" -Value ""
// Write-Host "✓ Registry key created" -ForegroundColor Green

// # Step 2: Restart Explorer to apply changes
// Write-Host "Restarting Explorer..." -ForegroundColor Yellow
// Stop-Process -Name "explorer" -Force
// Start-Process "explorer.exe"

// Write-Host "✓ Done! Classic menu should now be active." -ForegroundColor Green
// `

// const undoClassicRightClickScript = `
// # Restore Windows 11 new right-click context menu
// # This script removes the registry entry and restarts Explorer

// Write-Host "Restoring Windows 11 new context menu..." -ForegroundColor Green

// # Step 1: Remove the registry entry
// try {
//     if (Test-Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}") {
//         Remove-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Recurse -Force
//         Write-Host "✓ Registry key removed" -ForegroundColor Green
//     } else {
//         Write-Host "⚠ Registry key not found (already removed or never existed)" -ForegroundColor Yellow
//     }
// } catch {
//     Write-Host "✗ Error removing registry key: $($_.Exception.Message)" -ForegroundColor Red
// }

// # Step 2: Restart Explorer to apply changes
// Write-Host "Restarting Explorer..." -ForegroundColor Yellow
// Stop-Process -Name "explorer" -Force
// Start-Process "explorer.exe"

// Write-Host "✓ Done! Windows 11 new context menu should now be active." -ForegroundColor Green
// `
// =============================================================================
// ONEDRIVE
// =============================================================================

const disableOneDriveScript = `
Write-Host "Disabling OneDrive..." -ForegroundColor Green

# Step 1: Stop OneDrive process
Write-Host "Stopping OneDrive process..." -ForegroundColor Yellow
Stop-Process -Name OneDrive -ErrorAction SilentlyContinue
Write-Host "✓ OneDrive process stopped" -ForegroundColor Green

# Step 2: Uninstall OneDrive
Write-Host "Uninstalling OneDrive..." -ForegroundColor Yellow
$oneDriveSetup = "$env:SystemRoot\SysWOW64\OneDriveSetup.exe"
if (-not (Test-Path $oneDriveSetup)) {
    $oneDriveSetup = "$env:SystemRoot\System32\OneDriveSetup.exe"
}

if (Test-Path $oneDriveSetup) {
    Start-Process -FilePath $oneDriveSetup -ArgumentList "/uninstall" -Wait -NoNewWindow
    Write-Host "✓ OneDrive uninstalled" -ForegroundColor Green
} else {
    Write-Host "⚠ OneDrive installer not found" -ForegroundColor Yellow
}

# Step 3: Remove OneDrive from Explorer sidebar
Write-Host "Removing from File Explorer..." -ForegroundColor Yellow
Remove-Item -Path "HKCU:\Software\Classes\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "✓ OneDrive removed from sidebar" -ForegroundColor Green

Write-Host "✓ Done! OneDrive has been disabled." -ForegroundColor Green
`

const disableOneDriveRevScript = `
# Restore OneDrive
# This script reinstalls OneDrive and restores it to File Explorer

Write-Host "Restoring OneDrive..." -ForegroundColor Green

# Step 1: Check if OneDrive is already installed
$oneDrivePath = "$env:LOCALAPPDATA\Microsoft\OneDrive\OneDrive.exe"
if (Test-Path $oneDrivePath) {
    Write-Host "⚠ OneDrive appears to already be installed" -ForegroundColor Yellow
    Write-Host "Starting OneDrive..." -ForegroundColor Yellow
    Start-Process $oneDrivePath
    Write-Host "✓ Done! OneDrive has been started." -ForegroundColor Green
    exit
}

# Step 2: Reinstall OneDrive
Write-Host "Reinstalling OneDrive..." -ForegroundColor Yellow
$oneDriveSetup = "$env:SystemRoot\SysWOW64\OneDriveSetup.exe"
if (-not (Test-Path $oneDriveSetup)) {
    $oneDriveSetup = "$env:SystemRoot\System32\OneDriveSetup.exe"
}

if (Test-Path $oneDriveSetup) {
    Start-Process -FilePath $oneDriveSetup -Wait -NoNewWindow
    Write-Host "✓ OneDrive reinstalled" -ForegroundColor Green
} else {
    Write-Host "✗ OneDrive installer not found in Windows directory" -ForegroundColor Red
    Write-Host "You may need to download OneDrive from: https://www.microsoft.com/en-us/microsoft-365/onedrive/download" -ForegroundColor Yellow
    exit
}

# Step 3: Restore OneDrive in Explorer sidebar (remove the block if it exists)
Write-Host "Restoring in File Explorer..." -ForegroundColor Yellow
try {
    if (Test-Path "HKCU:\Software\Classes\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}") {
        Remove-Item -Path "HKCU:\Software\Classes\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "✓ OneDrive restored in sidebar" -ForegroundColor Green
    } else {
        Write-Host "✓ OneDrive already visible in sidebar" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Could not modify sidebar settings: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Step 4: Restart Explorer to apply changes
Write-Host "Restarting Explorer..." -ForegroundColor Yellow
Stop-Process -Name "explorer" -Force
Start-Process "explorer.exe"

Write-Host "✓ Done! OneDrive should now be restored and running." -ForegroundColor Green
`

// =============================================================================
// DISABLE LOCKSCREEN ADS
// =============================================================================

const disableLockScreenAdsScript = `
# Disable Lock Screen Ads and Windows Spotlight
# This script sets a static lock screen image and removes promotional content

Write-Host "Disabling Lock Screen Ads and Windows Spotlight..." -ForegroundColor Green

# Step 1: Disable Windows Spotlight features
Write-Host "Disabling Windows Spotlight..." -ForegroundColor Yellow
$spotlightKey = "HKCU:\Software\Policies\Microsoft\Windows\CloudContent"
if (-not (Test-Path $spotlightKey)) {
    New-Item -Path $spotlightKey -Force | Out-Null
}
Set-ItemProperty -Path $spotlightKey -Name "DisableWindowsSpotlightFeatures" -Type DWord -Value 1
Set-ItemProperty -Path $spotlightKey -Name "DisableWindowsSpotlightOnLockScreen" -Type DWord -Value 1
Write-Host "✓ Windows Spotlight disabled" -ForegroundColor Green

# Step 2: Disable lock screen tips and ads
Write-Host "Disabling lock screen ads..." -ForegroundColor Yellow
$lockKey = "HKCU:\Software\Policies\Microsoft\Windows\Personalization"
if (-not (Test-Path $lockKey)) {
    New-Item -Path $lockKey -Force | Out-Null
}
Set-ItemProperty -Path $lockKey -Name "NoLockScreen" -Type DWord -Value 0
Write-Host "✓ Lock screen ads disabled" -ForegroundColor Green

# Step 3: Set static lock screen image
Write-Host "Setting static lock screen image..." -ForegroundColor Yellow
$imagePath = "C:\Windows\Web\Screen\img100.jpg"
if (Test-Path $imagePath) {
    Set-ItemProperty -Path $lockKey -Name "LockScreenImage" -Value $imagePath -Force
    Write-Host "✓ Static lock screen image set" -ForegroundColor Green
} else {
    Write-Host "⚠ Default image not found, using Windows default" -ForegroundColor Yellow
}

Write-Host "✓ Done! Lock screen is now ad-free with a static image." -ForegroundColor Green
Write-Host "Note: You may need to sign out and back in to see changes." -ForegroundColor Yellow
`

const disableLockScreenAdsRevScript = `
# Restore Windows Spotlight and Lock Screen Ads
# This script re-enables Windows Spotlight rotating images and promotional content

Write-Host "Restoring Windows Spotlight and Lock Screen Ads..." -ForegroundColor Green

# Step 1: Re-enable Windows Spotlight features
Write-Host "Re-enabling Windows Spotlight..." -ForegroundColor Yellow
$spotlightKey = "HKCU:\Software\Policies\Microsoft\Windows\CloudContent"
try {
    if (Test-Path $spotlightKey) {
        Remove-ItemProperty -Path $spotlightKey -Name "DisableWindowsSpotlightFeatures" -ErrorAction SilentlyContinue
        Remove-ItemProperty -Path $spotlightKey -Name "DisableWindowsSpotlightOnLockScreen" -ErrorAction SilentlyContinue
        Write-Host "✓ Windows Spotlight re-enabled" -ForegroundColor Green
    } else {
        Write-Host "✓ Windows Spotlight already enabled" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Could not modify Spotlight settings: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Step 2: Remove static lock screen image policy
Write-Host "Removing static lock screen policy..." -ForegroundColor Yellow
$lockKey = "HKCU:\Software\Policies\Microsoft\Windows\Personalization"
try {
    if (Test-Path $lockKey) {
        Remove-ItemProperty -Path $lockKey -Name "LockScreenImage" -ErrorAction SilentlyContinue
        Remove-ItemProperty -Path $lockKey -Name "NoLockScreen" -ErrorAction SilentlyContinue
        Write-Host "✓ Lock screen policy removed" -ForegroundColor Green
    } else {
        Write-Host "✓ No lock screen policy found" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Could not modify lock screen settings: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Step 3: Clean up empty policy keys
Write-Host "Cleaning up..." -ForegroundColor Yellow
if (Test-Path $spotlightKey) {
    if ((Get-Item $spotlightKey).Property.Count -eq 0) {
        Remove-Item -Path $spotlightKey -Force -ErrorAction SilentlyContinue
    }
}
if (Test-Path $lockKey) {
    if ((Get-Item $lockKey).Property.Count -eq 0) {
        Remove-Item -Path $lockKey -Force -ErrorAction SilentlyContinue
    }
}
Write-Host "✓ Cleanup complete" -ForegroundColor Green

Write-Host "✓ Done! Windows Spotlight and lock screen ads restored." -ForegroundColor Green
Write-Host "Note: You may need to sign out and back in to see changes." -ForegroundColor Yellow
`

const checkboxOptions: readonly CheckboxOption[] = [
    // -->> RESTORE RIGHT CLICK SEEMS TO BE BROKEN RIGHT NOW; INVESTIGATING
    // {
    //     id: "restoreRightClickMenu",
    //     name: "Restore Classic Right-click Menu",
    //     script: classicRightClickScript,
    //     undoScript: undoClassicRightClickScript,
    //     description: "Returns the original right-click menu when in file explorer",
    //     undoDescription: "Back to default: Windows 11 right-click menu"
    // },
    {
        id: "disableOneDrive",
        name: "Disable OneDrive",
        script: disableOneDriveScript,
        undoScript: disableOneDriveRevScript,
        description: "Completely removes OneDrive. Likely have to re-use this script after every major Windows update!",
        undoDescription: "Return OneDrive as it was"
    },
    {
        id: "disableLockScreenAds",
        name: "Disable Lock Screen Ads",
        script: disableLockScreenAdsScript,
        undoScript: disableLockScreenAdsRevScript,
        description: "Removes Lock Screen Ads. Proved a pain to test this one so always, feedback is very welcome",
        undoDescription: "Reverses disableLockScreenAdsRev"
    },
    // next on the menu: 
    // remove copilot and linkedin app
    // remove widgets and centre task bar apps
]

export default checkboxOptions

// wonder if it would be useful to make an API for this too? or put in db?
// for the sake of user experience, the reverse script may be a duplicate script defined elsewhere?
// or, perhaps reverse scripts should sit directly below it (order of checkboxOptions mattering)? what would be easier for the user?
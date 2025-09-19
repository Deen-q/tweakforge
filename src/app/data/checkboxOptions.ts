const classicRightClickScript = `
# Enable Windows 11 classic right-click menu
# This script modifies the registry and restarts Explorer

Write-Host "Enabling classic right-click menu..." -ForegroundColor Green

# Step 1: Create registry entry to disable new context menu
New-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Name "InprocServer32" -Force | Out-Null
Set-ItemProperty -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" -Name "(Default)" -Value ""
Write-Host "✓ Registry key created" -ForegroundColor Green

# Step 2: Restart Explorer to apply changes
Write-Host "Restarting Explorer..." -ForegroundColor Yellow
Stop-Process -Name "explorer" -Force
Start-Process "explorer.exe"

Write-Host "✓ Done! Classic menu should now be active." -ForegroundColor Green
`

const undoClassicRightClickScript = `
# Restore Windows 11 new right-click context menu
# This script removes the registry entry and restarts Explorer

Write-Host "Restoring Windows 11 new context menu..." -ForegroundColor Green

# Step 1: Remove the registry entry
try {
    if (Test-Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}") {
        Remove-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Recurse -Force
        Write-Host "✓ Registry key removed" -ForegroundColor Green
    } else {
        Write-Host "⚠ Registry key not found (already removed or never existed)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ Error removing registry key: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 2: Restart Explorer to apply changes
Write-Host "Restarting Explorer..." -ForegroundColor Yellow
Stop-Process -Name "explorer" -Force
Start-Process "explorer.exe"

Write-Host "✓ Done! Windows 11 new context menu should now be active." -ForegroundColor Green
`

// const disableCopilot = `
// Write-Host "Remove Copilot"
// dism /online /remove-package /package-name:Microsoft.Windows.Copilot
// `

// const enableCopilot = `
// Write-Host "Install Copilot"
// dism /online /add-package /package-name:Microsoft.Windows.Copilot
// `

/* DEFINITELY NEED A FIX WINDOWS SEARCH/REMOVE BING SEARCH SCRIPT!!!!!!! */

const checkboxOptions = [
    {
        id: "restoreRightClickMenu",
        name: "Restore Classic Right-click Menu",
        script: classicRightClickScript,
        undoScript: undoClassicRightClickScript,
        description: "Returns the original right-click menu when in file explorer",
        undoDescription: "Back to default: Windows 11 right-click menu"
    },
    // {
    //     id: "disableCopilot",
    //     name: "Disable Copilot",
    //     script: disableCopilot,
    //     undoScript: enableCopilot,
    //     description: "Disables Copilot. The reverse script will re-enable it",
    //     undoDescription: "This reverse script will re-enable it"
    // },
]

export default checkboxOptions

// wonder if it would be useful to make an API for this too? or put in db?
// for the sake of user experience, the reverse script may be a duplicate script defined elsewhere?
// or, perhaps reverse scripts should sit directly below it (order of checkboxOptions mattering)? what would be easier for the user?
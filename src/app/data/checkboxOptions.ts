const classicRightClickScript = `
New-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Name "InprocServer32" -force -value ""
Write-Host Restarting explorer.exe ...
$process = Get-Process -Name "explorer"
Stop-Process -InputObject $process
`

const undoClassicRightClickScript = `
# Remove the registry entry that was created
Remove-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Restarting explorer.exe ..."
$process = Get-Process -Name "explorer" -ErrorAction SilentlyContinue
if ($process) {
    Stop-Process -InputObject $process
}

Write-Host "Registry changes have been reverted."
`

const disableCopilot = `
Write-Host "Remove Copilot"
dism /online /remove-package /package-name:Microsoft.Windows.Copilot
`

const enableCopilot = `
Write-Host "Install Copilot"
dism /online /add-package /package-name:Microsoft.Windows.Copilot
`

const checkboxOptions = [
    {
        id: "restoreRightClickMenu",
        name: "Restore Classic Right-click Menu",
        script: classicRightClickScript,
        undoScript: undoClassicRightClickScript,
        description: "Returns the original right-click menu when in file explorer",
        undoDescription: "Back to default: Windows 11 right-click menu"
    },
    {
        id: "disableCopilot",
        name: "Disable Copilot",
        script: disableCopilot,
        undoScript: enableCopilot,
        description: "Disables Copilot. The reverse script will re-enable it",
        undoDescription: "This reverse script will re-enable it"
    },
]

export default checkboxOptions

// wonder if it would be useful to make an API for this too? or put in db?
// for the sake of user experience, the reverse script may be a duplicate script defined elsewhere?
// or, perhaps reverse scripts should sit directly below it (order of checkboxOptions mattering)? what would be easier for the user?
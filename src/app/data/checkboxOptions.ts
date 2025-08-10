const classicRightClickScript = `
New-Item -Path "HKCU:\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Name "InprocServer32" -force -value ""
Write-Host Restarting explorer.exe ...
$process = Get-Process -Name "explorer"
Stop-Process -InputObject $process
`

const checkboxOptions = [
    {
        id: "addCopilot",
        name: "Add Copilot",
        script: "*Add Copilot Script*",
        reverseScript: "*reverse Script*",
        description: "This will add copilot!"
    },
    {
        id: "removeCopilot",
        name: "Remove Copilot",
        script: "*Remove Copilot Script*",
        reverseScript: "*reverse Script*",
        description: "This will remove copilot!"
    },
    {
        id: "restoreRightClickMenu",
        name: "Restore Classic Right-click Menu",
        script: classicRightClickScript,
        reverseScript: "*reverse Script*",
        description: "..."
    }
]

export default checkboxOptions

// wonder if it would be useful to make an API for this too?
// for the sake of user experience, the reverse script may be a duplicate script defined elsewhere?
// or, perhaps reverse scripts should sit directly below it (order of checkboxOptions mattering)? what would be easier for the user?
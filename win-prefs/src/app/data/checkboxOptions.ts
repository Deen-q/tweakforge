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
        description: "This will add copilot!"
    },
    {
        id: "removeCopilot",
        name: "Remove Copilot",
        script: "*Remove Copilot Script*",
        description: "This will remove copilot!"
    },
    {
        id: "restoreRightClickMenu",
        name: "Restore Classic Right-click Menu",
        script: classicRightClickScript,
        description: "..."
    }
]

export default checkboxOptions
# Differencing Disk Methodology
### A Step-by-Step Guide
1) Go to the official Microsoft web page to find a Windows 11 ISO and download an appropriate one. At the time of testing, I used `Win11_24H2_EnglishInternational_x64.iso`
2) Press the Windows key and search for "Hyper-V Manager"
3) On the right-side of the window, select New > Virtual Machine...
4) Boot up your Virtual Machine (VM). A new window will open containing a new instance of Windows (depending on the ISO you chose)
5) Do the most minimal setup you can. I opted-out of everything. Turning off the internet on your PC at this step can help avoid having to sign-up with a Microsoft account.
6) Immediately after you've set up Windows, close the VM. Go to File Explorer and locate where your Virtual Hard Disks are located. The default is `C:\ProgramData\Microsoft\Windows\Virtual Hard Disks`. Rename it to something sensible, like `Windows11-base.vhdx`
7) Right-click the base .vhdx file in File Explorer -> Properties -> tick "Read-only" -> Apply
8) Then in Hyper-V Manager: Action -> New -> Hard Disk -> choose "Differencing" as the disk type -> set parent disk to your base .vhdx. This creates a new disk that records changes, leaving the base untouched
9) Using the base disk as a template (which should always be kept as Read Only), only test new scripts within the differencing disk. Then delete it and make a brand new one when testing something separate

The main goal here is standardised testing: every single script you test, you're essentially testing it on a PC that has *just* installed Windows.

## Bonus: make a .ps1 file + .bat file to automate the process
Create a folder/dir on your desktop. Create a `CleanVM.bat` and a `FreshVM.ps1` inside. The example will assume your folder is called "VM"  
*Pay attention to what you've named your folders, files etc.*  
- I personally named my .ps1 file `StopVM-Cleanup-NewDiff-StartVM.ps1` to be as descriptive as possible

```bat
@REM powershell -File "C:\Users\YourName\Desktop\VM Related\NameOfYourPs1File.ps1"
powershell -ExecutionPolicy Bypass -File "C:\Users\YourName\Desktop\VM\FreshVM.ps1"
pause
```  

The .bat file you created will run the following PowerShell (.ps1) script:  
*Again, pay attention to what you've named your files and in this case, variables.*  
```powershell
# config
$vmName = "VM1"
$diskFolder = "C:\ProgramData\Microsoft\Windows\Virtual Hard Disks"
$baseDisk = "Windows11-base.vhdx"
$testDisk = "TestDisk.vhdx" # i.e., the differencing disk!

cd $diskFolder

Write-Host "=== Automated VM Reset ===" -ForegroundColor Magenta
Write-Host ""

# Check if base disk is read-only
# Get-ItemProperty "C:\ProgramData\Microsoft\Windows\Virtual Hard Disks\Windows11-Base.vhdx" | Select-Object IsReadOnly, Length

# # If IsReadOnly is False, fix it:
# Set-ItemProperty "C:\ProgramData\Microsoft\Windows\Virtual Hard Disks\Windows11-Base.vhdx" -Name IsReadOnly -Value $true

#################################################################################################################################

# Stop VM *if* running
$vm = Get-VM -Name $vmName
if ($vm.State -eq 'Running') {
    Write-Host "[1/5] Stopping VM... (5s delay built in)" -ForegroundColor Cyan
    Stop-VM -Name $vmName -Force
    Start-Sleep -Seconds 5
}
else {
    Write-Host "[1/5] VM already stopped or no VM is running" -ForegroundColor Cyan
}

# Remove old disk from VM
Write-Host "[2/5] Detaching old disk from VM..." -ForegroundColor Cyan
# $existingDisk = Get-VMHardDiskDrive -VMName $vmName
# if ($existingDisk) {
#     Remove-VMHardDiskDrive -VMName $vmName -ControllerType SCSI -ControllerNumber 0 -ControllerLocation 0
# }
# pipe op in ps feeds data from left to right -> dynamic + dont need to know where ea disk is
Get-VMHardDiskDrive -VMName $vmName | Remove-VMHardDiskDrive

# Delete old test disk file
Write-Host "[3/5] Deleting old test disk..." -ForegroundColor Cyan
if (Test-Path ".\$testDisk") {
    Remove-Item ".\$testDisk" -Force
}

# Create new differencing disk
Write-Host "[4/5] Creating fresh differencing disk..." -ForegroundColor Cyan
New-VHD -Path ".\$testDisk" -ParentPath ".\$baseDisk" -Differencing | Out-Null

# Attach new disk and start VM
Write-Host "[5/5] Attaching disk and starting VM..." -ForegroundColor Cyan
Add-VMHardDiskDrive -VMName $vmName -ControllerType SCSI -Path ".\$testDisk"
Start-VM -Name $vmName

Write-Host ""
Write-Host "COMPLETE! VM is booting with clean slate" -ForegroundColor Green
Write-Host ""

# Read-Host "Press Enter to close"
```
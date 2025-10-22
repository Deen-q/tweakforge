// remember to alt+z for word wrap

export const howScriptsAreTested = `
I could release a separate GitHub repo detailing every step of how I do this, 
but essentially I created a VM with a Windows 11 ISO from Microsofts site. 
After creating a fresh install in said VM (in Hyper-V), I then created 'differencing disks'. 
that is, small .vhdx files that only capture changes AFTER the 'parent' disk was made. 
this way, the 'parent' or 'base' disk (which is readonly) always remains clean and I can quickly
make a new differencing disk to test changes in a standardised way. this way my testing is reproducible.
 
I've never tried snapshots, but from my understanding they take longer to make and are considerably
larger than differencing disks (the disks are around 2GB each, owed to the lack of VM memory state).
so far I've had no need to keep the disks, so I always delete my previous one and create new ones each time.

when I find the time, I could attach a modal here for you to see the .bat and ps1 file I made to automate the process.
`
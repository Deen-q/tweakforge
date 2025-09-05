# Welcome
Checkout TweakForge at https://tweakforge.tools/

## About
- An easy way to set up a PC, especially after a clean install of Windows. There's no account to make, just hop onto the site and you're good to go
- A highly accessible (e.g., the app can be used with only a keyboard if needed) and beginner friendly app, aimed to help people of any skill/ability level become more comfortable with basic scripting
- No ads or invasion of privacy - just core functionality
- The app is in active development - new features and scripts on route!

## Currently in progress:
- Set up basic pipeline
- Add more scripts
- Improve UX (stop selection box from jumping on toggle click, and potentially add a extra section to expand the entire script)
- Add about page
- Add in depth break-down for 1 of the scripts (restore classic right-click menu)

Suggestions are always welcome :)

## How to test locally
Assuming Docker Desktop is installed:

1) Clone the repo
2) cd to said repo and then run: docker build -t tweakforge .
3) Run the container: docker run -d -p 3000:3000 tweakforge
4) Go to http://localhost:3000 in your browser
5) Stop the container when finished: docker stop tweakforge
6) Optional: docker rm tweakforge

## How I test scripts (before merging main):
I use disposable Hyper-V Windows VMs, and by this I mean:
- Base Setup: Created clean Windows VM, and made the disk read-only "template" (a parent/base disk)
- Differencing Disks: Each test uses a temporary differencing disk that only stores changes from the base
- Test Cycle: Boot VM → Run script → Verify results → Delete differencing disk → Create fresh one for next test
- Clean Slate: Every test starts from identical  Windows state for consistent and reliable script validation
- Lightweight: Differencing disks are <1GB vs full snapshots, making rapid test iterations practical

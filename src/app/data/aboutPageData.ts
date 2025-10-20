
export interface AboutPageData {
    id: string;
    title: string;
    content: string;
}

/* template, c+p this:
    {
        id: "about_licensing",
        title: "⚖️ license",
        content: "",
    },
*/

const aboutPageData: readonly AboutPageData[] = [
    {
        id: "about_about-tweakforge",
        title: "💡 about tweakforge",
        content: "apps that already exist tend to run entirely in the command line and are well documented on their respective GitHub pages. this is largely a good thing, however it is not very accessible to non-technical people. (almost) everyone has access to a browser, so here TweakForge offers a solution - a place where you can tick boxes to get the scripts that you want, and the instructions to run them. no ps1 (PowerShell) scripts executing behind the scenes.\n\nTweakForge was designed so that users have to be very deliberate with their execution. I have also made an attempt to break down scripts, so that each step explains what it does. Remember, do not run scripts you don't fully understand!"
    },
    {
        id: "about_how-scripts-are-tested",
        title: "❓ how scripts are tested",
        content: "I could release a separate GitHub repo detailing every step of how I do this, but essentially I created a VM with a Windows 11 ISO from Microsofts site. After creating a fresh install in said VM (in Hyper-V), I then created 'differencing disks'. that is, small .vhdx files that only capture changes AFTER the 'parent' disk was made. this way, the 'parent' or 'base' disk (which is readonly) always remains clean and I can quickly made a new differencing disk to test changes in a standardised way. this way my testing is reproducible.\n\nI've never tried snapshots, but from my understanding they take longer to make and are considerably larger than differencing disks (the disks are around 2GB each, owed to the lack of VM memory state). so far I've had no need to keep the disks, so I always delete my previous one and create new ones each time. when I find the time, I could attach a modal here for you to see the .bat and ps1 file I made to automate the process.",
    },
    // {
    //     // should this have a seperate page?
    //     id: "about_licensing",
    //     title: "⚖️ license",
    //     content: "1",
    // },
    // {
    //     id: "about_accessibility",
    //     title: "💖 accessibility",
    //     content: "1",
    // },
]

export default aboutPageData
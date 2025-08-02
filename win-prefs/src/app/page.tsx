import NavBar from "./components/NavBar";
import PrefSelection from "./components/PrefSelection";
import ToggleDropdown from "./components/ToggleDropdown";

export default function Home() {
  return (
    <div className="flex min-h-screen text-white">
      <aside className="bg-slate-800 p-4">
        <NavBar />
      </aside>
      <main className="flex flex-1 flex-col justify-center items-center bg-slate-700 p-6">
        <div className="flex flex-col items-center space-y-2">
          <PrefSelection />
          <div className="flex flex-col items-center max-w-[30rem]">
            <p>not sure where to start? check out the dropdown menus, below :)</p>
            {/* <div> */}
            <ToggleDropdown title="how do I use this app?">
              <p>scroll through or search for a script that appeals to you! perhaps there is a feature from a previous version of Windows? maybe there is a script to bring it back.</p>
              <p>if you are unsure what each script does, hover over the title of the checkbox to see more</p>
            </ToggleDropdown>
            <ToggleDropdown title="how do I run my scripts?">
              <ol>
                <p>Step 1: Open PowerShell as Administrator</p>
                <li>1a) Press Windows key + R</li>
                <li>1b) Type powershell</li>
                <li>1c) Press Ctrl + Shift + Enter (this opens as administrator)</li>
                <li>1d) Click `&quot;`Yes`&quot;` when Windows asks for permission</li>
                <p>Step 2: Run the Script</p>
                <li>2a) go back to where the scripts are</li>
                <li>2b) After checking the checkbox for the script you want, click the copy button</li>
                <li>2c) Right-click in the PowerShell window and select `&quot;`Paste`&quot;`</li>
                <li>2d) Press Enter</li>
                <li>2e) Wait for it to complete (you`&apos;`ll see Windows Explorer restart)</li>
              </ol>
            </ToggleDropdown>
            <ToggleDropdown title="how do scripts work?">
              <p>dunno m8</p>
            </ToggleDropdown>
            {/* </div> */}
          </div>
        </div>
      </main>
      {/* Need to add a footer that says "All scripts are property of Microsoft, I merely made an app to guide users on how to use said scripts." */}
    </div>
  );
}

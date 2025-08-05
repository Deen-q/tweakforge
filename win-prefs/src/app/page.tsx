'use client';

import { useState } from "react";
import NavBar from "./components/NavBar";
import PrefSelection from "./components/PrefSelection";
import ToggleDropdown from "./components/ToggleDropdown";

export default function Home() {
  // const [currentlyToggled, setCurrentlyToggled] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState("")

  const changeActiveDropdownId = (dropdownId: string) => {
    setActiveDropdownId(prev => prev === dropdownId ? "" : dropdownId)
  }

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

            <ToggleDropdown
              title="how do I use this app?"
              id="dropdown-one"
              // when would it be open?
              isOpen={activeDropdownId === "dropdown-one"}
              // change id when something is clicked
              changeActiveDropdownId={changeActiveDropdownId}
            >
              <p>scroll through or search for a script that appeals to you! perhaps there is a feature from a previous version of Windows? maybe there is a script to bring it back.</p>
              <p>if you are unsure what each script does, hover over the title of the checkbox to see more</p>
            </ToggleDropdown>

            <ToggleDropdown
              title="how do I run my scripts?"
              id="dropdown-two"
              isOpen={activeDropdownId === "dropdown-two"}
              changeActiveDropdownId={changeActiveDropdownId}
            >
              <ol>
                <p>Step 1: Open PowerShell as Administrator</p>
                <li>1a) Press Windows key + R, and type `powershell` in the popup</li>
                <li>1c) Press Ctrl + Shift + Enter (this opens as administrator)</li>
                <li>1d) Click `Yes` when Windows asks for permission</li>
                <p>Step 2: Run the Script</p>
                <li>2a) go back to where the scripts are</li>
                <li>2b) After checking the checkbox for the script you want, click the copy button</li>
                <li>2c) Right-click in the PowerShell window and select `Paste`. press enter</li>
                <li>2e) Wait for it to complete (you``ll see Windows Explorer restart)</li>
              </ol>
            </ToggleDropdown>

            <ToggleDropdown
              title="how do scripts work?"
              id="dropdown-three"
              isOpen={activeDropdownId === "dropdown-three"}
              changeActiveDropdownId={changeActiveDropdownId}
            >
              <p>dunno m8</p>
            </ToggleDropdown>
          </div>
        </div>
      </main>
      {/* Need to add a footer that says "All scripts are property of Microsoft, I merely made an app to guide users on how to use said scripts." */}
    </div>
  );
}

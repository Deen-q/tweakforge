// src/app/page.tsx
'use client';

import { useState } from "react";
import NavBar from "./components/NavBar";
import ScriptSelection from "./components/ScriptSelection";
import { GitHubCatIcon, InspectIcon, InspectUndoCopyIcon } from "./components/icons";
import { CheckboxOption } from "./data/checkboxOptions";
import { CopyIcon, UndoCopyIcon } from "./components/icons";
import Footer from "./components/Footer";
import dynamic from "next/dynamic";
const ToggleDropdown = dynamic(() => import('./components/ToggleDropdown'));
const ViewScriptModal = dynamic(() => import('./components/ViewScriptModal'));
import versionData from "./data/versionData";

export default function Home() {
  const [activeDropdownId, setActiveDropdownId] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalObject, setModalObject] = useState<CheckboxOption | null>(null);
  const [activeModal, setActiveModal] = useState<"forward" | "reverse" | "none">("none");

  const changeActiveDropdownId = (dropdownId: string) => {
    setActiveDropdownId(prev => prev === dropdownId ? "" : dropdownId)
  };

  return (
    // overflow-hidden to prevent global scrolling glitch; all content is still reachable (accessibility)
    <div className="flex overflow-hidden min-h-screen text-white text-xs md:text-base">

      <aside className="bg-slate-800 md:p-2">
        <NavBar />
      </aside>

      <div className="flex flex-col flex-1 bg-slate-700">

        {showModal && modalObject &&
          <ViewScriptModal
            setShowModal={setShowModal}
            modalObject={modalObject}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            versionData={versionData}
          />
        }

        <a href="https://github.com/Deen-q/tweakforge" target="_blank" rel="noopener noreferrer" className="absolute top-[-14] md:top-2 right-0 lg:top-4 lg:right-4" >
          <GitHubCatIcon />
        </a>
        <header className="text-center text-header pt-1">
          ⚠️ Only use TweakForge from the official domain: <strong>tweakforge.tools</strong>
        </header>
        <main className="
        flex flex-1 flex-col justify-center items-center 
        overflow-hidden sm:overflow-auto
        h-screen sm:h-auto
        p-5 md:p-6
        ">
          <div className="h-full md:h-auto flex flex-col items-center">

            <ScriptSelection
              setShowModal={setShowModal}
              setModalObject={setModalObject}
              setActiveModal={setActiveModal}
            />

            <div className="flex flex-col items-center xl:w-200">
              <div className="pt-2 pb-1 xl:mb-6">
                <p>not sure where to start? check out the dropdown menus, below :)</p>
              </div>

              <div className="sm:h-20">
                <ToggleDropdown
                  title="how do I use this app?"
                  id="dropdown-one"
                  isOpen={activeDropdownId === "dropdown-one"}
                  changeActiveDropdownId={changeActiveDropdownId}
                >
                  <div>
                    <p>scroll through or search for a script that appeals to you. perhaps you miss a feature from a previous version of Windows? there could be a script to bring it back.</p>
                    <p>{`you're`} encouraged to look at the scripts with the <InspectIcon stroke={"white"} /> <span className="text-white">(inspect)</span> and <InspectUndoCopyIcon stroke={"white"} /> <span className="text-white">(undo inspect)</span> icons, before you run a script.</p>
                  </div>
                </ToggleDropdown>

                <ToggleDropdown
                  title="how do I run my scripts?"
                  id="dropdown-two"
                  isOpen={activeDropdownId === "dropdown-two"}
                  changeActiveDropdownId={changeActiveDropdownId}
                >
                  <div>
                    <p className="underline font-semibold text-blue-300 mb-1">Step 1: Look for a script you like</p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Find a script you like under {`"Select your scripts"`} and check at least 1 box</li>
                      <li>When a box is checked, {`it's`} respective bar will appear under {`"Checked scripts"`}.</li>
                      <li>To the right of the bar, {`you'll`} see some buttons including <InspectIcon stroke={"white"} /> <span className="text-white">(inspect)</span> and <CopyIcon stroke={"white"} /> <span className="text-white">(copy)</span> for the script you just checked.</li>
                      <li>Once {`you're`} happy with the script and {`you've`} hit the copy button, proceed to running the script, in the steps below!</li>
                    </ol>
                    <h4 className="underline font-semibold text-blue-300 mt-4 mb-1">Step 2: Open PowerShell and run your script</h4>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Press <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs inline-flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351" />
                        </svg>
                        (Windows) + R
                      </kbd>
                      </li>
                      <li>Type <code className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">powershell</code> - {`don't`} hit <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">Enter</kbd> yet - you need to open as Admin first.</li>
                      <li>Press <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">Ctrl + Shift + Enter</kbd> (this opens as administrator)</li>
                      <li>Click <strong>Yes</strong> when Windows asks for permission. {`You've`} now opened PowerShell, ready to run your script.</li>
                      <li>With the script you copied earlier (copy again if needed), paste it using <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">ctrl + v</kbd> or Right-click paste into the PowerShell window.</li>
                      <li>Press <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">Enter</kbd> to execute - {`don't`} worry, it {`won't`} run without your confirmation in the next step!</li>
                      <li>Within PowerShell, review the script details carefully—each step will show what changes will be made. If everything looks correct, type <strong>yes</strong> or <strong>y</strong> and then <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">Enter</kbd> again to finally execute the script.</li>
                      <li>Congrats, you just ran a script! Keep reading what it says in the command line (within PowerShell) to see each step as {`it's`} carried out.</li>
                    </ol>
                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-3 mt-4 mr-2 ml-2">
                      <p className="text-yellow-200 text-sm">
                        <span className="font-semibold">Tip:</span> Some scripts may take a few seconds to complete. {`Don't`} close PowerShell until you see the process finish.
                      </p>
                    </div>
                  </div>
                </ToggleDropdown>

                <ToggleDropdown
                  title="how do scripts work?"
                  id="dropdown-three"
                  isOpen={activeDropdownId === "dropdown-three"}
                  changeActiveDropdownId={changeActiveDropdownId}
                >
                  <div>
                    <p>tl;dr: all scripts are just a list of instructions. these scripts change registry files on your computer - basically extra settings that might be difficult to reach otherwise.</p>
                  </div>
                </ToggleDropdown>

                <ToggleDropdown
                  title="help, how do I reverse/undo a script I just ran?"
                  id="dropdown-four"
                  isOpen={activeDropdownId === "dropdown-four"}
                  changeActiveDropdownId={changeActiveDropdownId}
                >
                  <div>
                    <p>*most* scripts have a reverse/undo script. with the exception of {`"Remove Preinstalled Apps"`}, use the <UndoCopyIcon stroke={"white"} /> <span className="text-white">(undo)</span> button, directly next to the <CopyIcon stroke={"white"} /> <span className="text-white">(copy)</span> button. it works in exactly the same way - paste it into your terminal and hit <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">Enter</kbd>!</p>
                  </div>
                </ToggleDropdown>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

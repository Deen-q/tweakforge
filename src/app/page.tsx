'use client';

import { useState } from "react";
import NavBar from "./components/NavBar";
import PrefSelection from "./components/PrefSelection";
import ToggleDropdown from "./components/ToggleDropdown";
import githubIcon from "../app/assets/icons8-github.svg"
import Image from "next/image";
import ViewScriptModal from "./components/ViewScriptModal";
import { CheckboxOption } from "./data/checkboxOptions";
import { CopyIcon, UndoIcon } from "./components/icons";

export default function Home() {
  const [activeDropdownId, setActiveDropdownId] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalObject, setModalObject] = useState<CheckboxOption | null>(null);

  const changeActiveDropdownId = (dropdownId: string) => {
    setActiveDropdownId(prev => prev === dropdownId ? "" : dropdownId)
  }

  return (
    // overflow-hidden to prevent global scrolling glitch; all content is still reachable (accessibility)
    <div className="flex overflow-hidden min-h-screen text-white text-xs md:text-base">

      <aside className="bg-slate-800 p-4 hidden sm:block"> {/* >>> hidden content is not ideal - fix later!*/}
        <NavBar />
      </aside>

      <div className="flex flex-col flex-1 bg-slate-700">

        {showModal && modalObject && // cannot accidently show empty modals now
          <ViewScriptModal
            setShowModal={setShowModal}
            modalObject={modalObject}
          />
        }

        <a href="https://github.com/Deen-q/tweakforge" className="absolute top-4 right-4" >

          {/* make github image larger on hover <<<< */}
          <Image
            className="cursor-pointer w-14 md:w-24"
            src={githubIcon}
            alt=""
            title="GitHub icon by Icons8"
          // <a target="_blank" href="https://icons8.com/icon/80462/github">GitHub</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
          />
        </a>
        <header className="text-center pt-1">
          ⚠️ Only use TweakForge from the official domain: <strong>tweakforge.tools</strong>
        </header>
        <main className="flex flex-1 flex-col justify-center items-center bg-slate-700 p-6">
          <div className="flex flex-col items-center">

            <PrefSelection
              setShowModal={setShowModal}
              setModalObject={setModalObject}
            />

            <div className="flex flex-col items-center xl:w-200">
              <div className="pt-2">
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
                    <p>scroll through or search for a script that appeals to you. perhaps you miss a feature from a previous version of Windows? there could be a script to bring it back</p>
                  </div>
                </ToggleDropdown>

                <ToggleDropdown
                  title="how do I run my scripts?"
                  id="dropdown-two"
                  isOpen={activeDropdownId === "dropdown-two"}
                  changeActiveDropdownId={changeActiveDropdownId}
                >
                  <div>
                    <p className="underline font-semibold text-blue-300 mb-1">Step 1: Open PowerShell as Administrator</p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Press <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs inline-flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351" />
                        </svg>
                        (Windows) + R
                      </kbd>
                      </li>
                      <li>Type <code className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">powershell</code> - don`t hit <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">Enter</kbd> yet</li>
                      <li>Press <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">Ctrl + Shift + Enter</kbd> (this opens as administrator)</li>
                      <li>Click <strong>Yes</strong> when Windows asks for permission</li>
                    </ol>
                    <h4 className="underline font-semibold text-blue-300 mt-4 mb-1">Step 2: Run the Script</h4>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Minimise the window and go back to where the scripts are.</li>
                      <li>Check the script you want, and a <strong>copy</strong> button will appear. Press <strong>copy</strong></li>
                      <li>In the PowerShell window, <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">ctrl + v</kbd> or Right-click paste.</li>
                      <li>Press <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">Enter</kbd> to execute.</li> congrats, you just ran a script :D
                    </ol>
                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-3 mt-4 mr-2 ml-2">
                      <p className="text-yellow-200 text-sm">
                        <span className="font-semibold">💡 Tip:</span> Some scripts may take a few seconds to complete. Don`t close PowerShell until you see the process finish.
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
                  title="help, how do I reverse/undo the script I ran?"
                  id="dropdown-four"
                  isOpen={activeDropdownId === "dropdown-four"}
                  changeActiveDropdownId={changeActiveDropdownId}
                >
                  <div>
                    <p>each checked script has a reverse/undo script. use the <UndoIcon stroke={"white"} /> <span className="text-white">(undo)</span> button, directly next to the <CopyIcon stroke={"white"} /> <span className="text-white">(copy)</span> button. it works in exactly the same way - paste it into your terminal and hit <kbd className="px-1 py-0.5 bg-slate-600 text-white rounded text-xs">Enter</kbd>!</p>
                  </div>
                </ToggleDropdown>
              </div>
            </div>
          </div>
        </main>
        <footer className="text-center pb-1">
          <p>
            TweakForge is an educational tool. Scripts modify Windows registry settings.
            Use at your own risk. Always understand what a script does before running it.
          </p>
          <p>
            Open source under <a href="https://github.com/Deen-q/tweakforge/blob/main/LICENSE">AGPL-3.0 </a>
            {/* | <a href="/about"> About </a> */}
            | Windows is a trademark of Microsoft Corporation
          </p>
        </footer>
      </div>
    </div>
  );
}

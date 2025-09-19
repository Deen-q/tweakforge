'use client';

import { useState } from "react";
import NavBar from "./components/NavBar";
import PrefSelection from "./components/PrefSelection";
import ToggleDropdown from "./components/ToggleDropdown";
import githubIcon from "../app/assets/icons8-github.svg"
import Image from "next/image";
import ViewScriptModal from "./components/ViewScriptModal";

export default function Home() {
  const [activeDropdownId, setActiveDropdownId] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalScript, setModalScript] = useState<string | undefined>();

  const changeActiveDropdownId = (dropdownId: string) => {
    setActiveDropdownId(prev => prev === dropdownId ? "" : dropdownId)
  }

  // const toggleDivDimensions = "max-h-48 overflow-y-auto pr-2"
  const toggleDivDimensions = "" // revisit this
  const prefSelectionDimensions = "flex-1 w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-84 xl:h-84"
  // const ViewScriptModalDimensions = "w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-84 xl:h-84"

  return (
    // overflow-hidden to prevent global scrolling glitch -> ALL CONTENT IS STILL REACHABLE
    <div className="flex overflow-hidden min-h-screen text-white text-xs md:text-base">
      <aside className="bg-slate-800 p-4">
        <NavBar />
      </aside>

      <div className="flex flex-col flex-1 bg-slate-700">

        {/* {showModal && <ViewScriptModal ViewScriptModalDimensions={ViewScriptModalDimensions} />} */}
        {showModal &&
          <ViewScriptModal
            setShowModal={setShowModal}
            modalScript={modalScript}
          />
        }

        <a href="https://github.com/Deen-q/tweakforge" className="absolute top-4 right-4" >

          {/* make github image larger on hover <<<< */}
          <Image
            className="cursor-pointer w-14 md:w-24"
            src={githubIcon}
            alt=""
            title="GitHub icon by Icons8"
          // height={100}
          // <a target="_blank" href="https://icons8.com/icon/80462/github">GitHub</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
          />
        </a>
        <main className="flex flex-1 flex-col justify-center items-center bg-slate-700 p-6">
          <div className="flex flex-col items-center space-y-2">

            <PrefSelection
              setShowModal={setShowModal}
              prefSelectionDimensions={prefSelectionDimensions}
              setModalScript={setModalScript}
            />

            <div className="flex flex-col items-center max-w-[30rem]">
              <p>not sure where to start? check out the dropdown menus, below :)</p>

              {/* <div className="max-h-32"> */}
              <div className="sm:h-20">
                <ToggleDropdown
                  title="how do I use this app?"
                  id="dropdown-one"
                  // when would it be open?
                  isOpen={activeDropdownId === "dropdown-one"}
                  // change id when something is clicked
                  changeActiveDropdownId={changeActiveDropdownId}
                >
                  <div className={toggleDivDimensions}>
                    <p>scroll through or search for a script that appeals to you. perhaps you miss a feature from a previous version of Windows? there could be a script to bring it back</p>
                  </div>
                </ToggleDropdown>

                <ToggleDropdown
                  title="how do I run my scripts?"
                  id="dropdown-two"
                  isOpen={activeDropdownId === "dropdown-two"}
                  changeActiveDropdownId={changeActiveDropdownId}
                >
                  <div className={toggleDivDimensions}>
                    <p className="underline font-semibold text-blue-300 mb-1">Step 1: Open PowerShell as Administrator</p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Press <kbd className="px-1 py-0.5 bg-slate-600 rounded text-xs inline-flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351" />
                        </svg>
                        (Windows) + R
                      </kbd>
                      </li>
                      <li>Type <code className="px-1 py-0.5 bg-slate-600 rounded text-xs">powershell</code> - don`t hit <kbd className="px-1 py-0.5 bg-slate-600 rounded text-xs">Enter</kbd> yet</li>
                      <li>Press <kbd className="px-1 py-0.5 bg-slate-600 rounded text-xs">Ctrl + Shift + Enter</kbd> (this opens as administrator)</li>
                      <li>Click <strong>Yes</strong> when Windows asks for permission</li>
                    </ol>
                    <h4 className="underline font-semibold text-blue-300 mt-4 mb-1">Step 2: Run the Script</h4>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Minimise the window and go back to where the scripts are.</li>
                      <li>Check the script you want, and a <strong>copy</strong> button will appear. Press <strong>copy</strong></li>
                      <li>In the PowerShell window, <kbd className="px-1 py-0.5 bg-slate-600 rounded text-xs">ctrl + v</kbd> or Right-click paste.</li>
                      <li>Press <kbd className="px-1 py-0.5 bg-slate-600 rounded text-xs">Enter</kbd> to execute.</li> congrats, you just ran a script :D
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
                  <div className={toggleDivDimensions}>
                    <p>tl;dr: all scripts are just a list of instructions. these scripts change registry files on your computer - basically extra settings that might be difficult to reach otherwise.</p>
                  </div>
                </ToggleDropdown>

                <ToggleDropdown
                  title="help, how do I reverse/undo the script I ran?"
                  id="dropdown-four"
                  isOpen={activeDropdownId === "dropdown-four"}
                  changeActiveDropdownId={changeActiveDropdownId}
                >
                  <div className={toggleDivDimensions}>
                    <p>each checked script has a reverse/undo script. use the <strong>copy (undo)</strong> button, directly next to the <strong>copy</strong> button. it works in exactly the same way - paste it into your terminal and hit <kbd className="px-1 py-0.5 bg-slate-600 rounded text-xs">Enter</kbd>!</p>
                  </div>
                </ToggleDropdown>
              </div>
            </div>
          </div>
        </main>
        <footer className="text-center pb-1">
          all scripts are property of Microsoft. by continuing, you agree TweakForge is not responsible for improper script usage
        </footer>
      </div>
    </div>
  );
}

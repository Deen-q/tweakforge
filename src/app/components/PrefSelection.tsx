'use client';

import { useState } from "react";
import checkboxOptions from "../data/checkboxOptions";

export default function PrefSelection() {
    // checkboxOptions = source of truth
    const [filteredCheckboxOptions, setFilteredCheckboxOptions] = useState<typeof checkboxOptions>(checkboxOptions);
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);
    // const [copyIsClicked, setCopyIsClicked] = useState<boolean>(false); // <- part of the old solution
    const [copyClickedId, setCopyClickedId] = useState<string>("");

    const prefSelectionDimensions = "flex-1 w-72 h-72"

    /*
    * need a simple way to v briefly explain what a script does
    * either a mini modal appears briefly, or a question mark button per script to trigger a modal
    * where to add the option for a reverse script hmmm
    */

    // as with toggle dropdown:
    /*
        * END GOAL: isOpen is true if activeId === id of button
        * --> onClick sets the id of clicked button to activeId
        * 
    */
    // const handleCopyClick = () => { // <- old idea to improve the copyIsClicked issue (all copy buttons lighting up at the same time)

    // }

    return (
        <div className="flex justify-center items-center bg-blue-300/20 border border-blue-300 rounded p-2">
            <div className={`${prefSelectionDimensions}`}>
                <div>
                    <input
                        type="text"
                        className="border m-1 p-1 w-68 bg-slate-700"
                        placeholder="search for features..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value === "") {
                                setFilteredCheckboxOptions(checkboxOptions)
                            } else {
                                setFilteredCheckboxOptions(checkboxOptions.filter(option =>
                                    option.name.toLowerCase().includes(e.target.value)))
                            }
                        }}
                    />
                </div>
                <fieldset>
                    <legend>Pick sum scriptz</legend>
                    {/* CREATING THE CHECKBOXES BASED ON ARRAY*/}
                    {filteredCheckboxOptions && filteredCheckboxOptions.map((checkboxOption) =>
                        <div key={checkboxOption.id}>
                            <input
                                type="checkbox"
                                id={checkboxOption.id}
                                name={checkboxOption.id} // e.target.name -> needed for checkedScriptId later
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setCheckedScripts(prev => {
                                        if (e.target.checked) {
                                            return [...prev, e.target.name]
                                        } else /*has been unchecked*/ {
                                            return prev.filter(option => option !== e.target.name)
                                            // remember, .filter(): if true = keep, if false = remove
                                        }
                                    })
                                }}
                                checked={checkedScripts.includes(checkboxOption.id)}
                            />
                            <label htmlFor={checkboxOption.id} className="p-1">{checkboxOption.name}</label>
                        </div>
                    )}
                </fieldset>

            </div>
            <div className={`${prefSelectionDimensions} border-l pl-1`}>
                <h4 className="text-center">Checked Scripts</h4>

                {checkedScripts.map((checkedScriptId) => { // <- an array of Ids
                    const checkboxOptionObj = checkboxOptions.find(option => option.id === checkedScriptId); // <- find entire obj via id
                    // alert(checkedScriptId)
                    return (
                        <div
                            // purposely using checkedScript as a key, so I can monitor potential duplicate scripts inside checkedScripts - probs replace this with an actual test
                            className="flex p-1" key={checkedScriptId}>
                            <input
                                type="text"
                                readOnly
                                value={checkboxOptionObj?.script}
                                className="min-w-0 flex-1 border border-slate-800 bg-slate-200/40 text-slate-800 rounded p-1"
                                title={checkboxOptionObj?.name}
                            />
                            <button
                                className={`border max-w-[3-rem] cursor-pointer rounded p-1
                                ${checkedScriptId === copyClickedId ?
                                        "border max-w-[3-rem] bg-green-700 hover:bg-green-600"
                                        : "border max-w-[3-rem] bg-slate-700 hover:bg-slate-700/10"}
                                `}
                                type="button"
                                onClick={() => {
                                    if (checkboxOptionObj?.script) {
                                        navigator.clipboard.writeText(checkboxOptionObj?.script)
                                    }
                                    // old solution, below:
                                    // setCopyIsClicked(true);
                                    // setTimeout(() => setCopyIsClicked(false), 1000);

                                    // new plan:
                                    /**
                                     * checkedScripts, a string[] -> can we use id to be able to mark which copy button has been clicked?
                                     * then, directly set which copy button should light up based on copyClickedId state
                                     */
                                    setCopyClickedId(checkedScriptId)
                                    setTimeout(() => setCopyClickedId(""), 1000);
                                }
                                }
                            >
                                copy
                            </button>
                            <button
                                className="border max-w-[3-rem] bg-slate-700 hover:bg-slate-700/10 cursor-pointer rounded p-1"
                                type="button"
                                onClick={() => {
                                    if (checkboxOptionObj?.script) {
                                        navigator.clipboard.writeText(checkboxOptionObj?.reverseScript)
                                    }
                                }}
                            >
                                <p className="text-[12px] text-wrap whitespace-pre-line">{"copy\n(reverse)"}</p>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

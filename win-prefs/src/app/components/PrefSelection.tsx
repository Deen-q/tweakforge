'use client';

import { useState } from "react";
import checkboxOptions from "../data/checkboxOptions";

export default function PrefSelection() {
    // checkboxOptions = source of truth
    const [filteredCheckboxOptions, setFilteredCheckboxOptions] = useState<typeof checkboxOptions>(checkboxOptions);
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);

    const prefSelectionDimensions = "flex-1 w-72 h-72"
    // min-w-48 min-h-60

    /*
    * need a simple way to v briefly explain what a script does
    * either a mini modal appears briefly, or a question mark button per script to trigger a modal
    * where to add the option for a reverse script hmmm
    */

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
                                setFilteredCheckboxOptions(checkboxOptions.filter(option => option.id.includes(e.target.value)))
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
                                name={checkboxOption.id} // e.target.name
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setCheckedScripts(prev => {
                                        if (e.target.checked) {
                                            return [...prev, e.target.name]
                                        } else {
                                            return prev.filter(option => option !== e.target.name)
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
                {checkedScripts.map((checkedScriptId) => {
                    // find the entire object via id, to avoid always loading in the object (slow and redundant)
                    const checkboxOptionObj = checkboxOptions.find(option => option.id === checkedScriptId);
                    return (
                        <div
                            // purposely using checkedScript as a key, so I can monitor potential duplicate scripts inside checkedScripts - probs replace this with an actual test
                            className="flex p-1" key={checkedScriptId}>
                            <input
                                type="text"
                                readOnly
                                value={checkboxOptionObj?.script}
                                className="flex-1 border border-slate-800 bg-slate-200/40 text-slate-800 rounded p-1"
                            />
                            <button
                                className="border bg-slate-700 cursor-pointer rounded p-1"
                                type="button"
                                onClick={() => {
                                    if (checkboxOptionObj?.script) {
                                        navigator.clipboard.writeText(checkboxOptionObj?.script)
                                    }
                                }}
                            >
                                copy
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

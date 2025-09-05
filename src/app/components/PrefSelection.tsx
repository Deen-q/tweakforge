'use client';

import { useState } from "react";
import checkboxOptions from "../data/checkboxOptions";

export default function PrefSelection() {
    // checkboxOptions = source of truth
    const [filteredCheckboxOptions, setFilteredCheckboxOptions] = useState<typeof checkboxOptions>(checkboxOptions);
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);
    const [copyClickedId, setCopyClickedId] = useState<string>("");
    const [RevCopyClickedId, setRevCopyClickedId] = useState<string>("");

    // need a simple way to v briefly explain what a script does

    const prefSelectionDimensions = "flex-1 w-72 h-72"
    return (
        <div className="flex justify-center items-center bg-blue-300/20 border border-blue-300 rounded p-4 gap-4">
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
                    {/* text-cneter doesnt seem to work on <legend/> */}
                    <legend><h4 className="text-center pt-2 pl-2"><strong>Select your scripts:</strong></h4></legend>
                    {filteredCheckboxOptions && filteredCheckboxOptions.map((checkboxOption) =>
                        <div className="pt-2 pl-3" key={checkboxOption.id}>
                            <input
                                type="checkbox"
                                id={checkboxOption.id}
                                name={checkboxOption.id} // e.target.name -> needed for checkedScriptId later
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    // setting checkedScripts
                                    if (e.target.checked) {
                                        setCheckedScripts(prev => [...prev, e.target.name])
                                    } else {
                                        // where e.target.name is what was just unchecked (say, "script2")
                                        setCheckedScripts(prev => prev.filter(scriptId => scriptId !== e.target.name))
                                    }
                                }}
                                checked={checkedScripts.includes(checkboxOption.id)}
                            />
                            <label htmlFor={checkboxOption.id} className="p-1">{checkboxOption.name}</label>
                        </div>
                    )}
                    <div className="flex items-center justify-center h-full p-4">
                        <h4><strong>More scripts to come!</strong></h4>
                    </div>
                </fieldset>

            </div>
            <div className={`${prefSelectionDimensions} border-l pl-1`}>
                <h4 className="text-center pt-2"><strong>Checked Scripts:</strong></h4>
                {
                    checkedScripts.length == 0 ?
                        <div className="flex items-center justify-center h-full pb-6">
                            <h4><strong>No scripts selected</strong></h4>
                        </div>
                        :
                        checkedScripts.map((checkedScriptId) => { // <- an array of Ids
                            const checkboxOptionObj = checkboxOptions.find(option => option.id === checkedScriptId); // <- find entire obj via id
                            return (
                                <div
                                    // purposely using checkedScript as a key, so I can monitor potential duplicate scripts inside checkedScripts - probs replace this with an actual test
                                    className={`flex p-1 animate-slide`} key={checkedScriptId}>
                                    <input
                                        type="text"
                                        readOnly
                                        value={checkboxOptionObj?.script}
                                        className="min-w-0 flex-1 border border-slate-800 bg-slate-200/40 text-slate-800 rounded p-1"
                                        title={checkboxOptionObj?.name}
                                    />
                                    <button className={`border max-w-[3-rem] cursor-pointer rounded p-1 ${checkedScriptId === copyClickedId ?
                                        "diagonal-stripes"
                                        : "bg-slate-700 hover:bg-slate-700/10"}`}
                                        type="button"
                                        onClick={() => {
                                            if (checkboxOptionObj?.script) {
                                                navigator.clipboard.writeText(checkboxOptionObj?.script)
                                            }
                                            setCopyClickedId(checkedScriptId)
                                            setTimeout(() => setCopyClickedId(""), 1000);
                                        }}
                                    >
                                        <p className="text-[12px] text-wrap whitespace-pre-line" title={checkboxOptionObj?.description}>
                                            copy
                                        </p>
                                    </button>
                                    <button className={`border max-w-[3-rem] cursor-pointer rounded p-1 ${checkedScriptId === RevCopyClickedId ?
                                        "rev-diagonal-stripes"
                                        : "bg-slate-700 hover:bg-slate-700/10"}`}
                                        type="button"
                                        onClick={() => {
                                            if (checkboxOptionObj?.undoScript) {
                                                navigator.clipboard.writeText(checkboxOptionObj?.undoScript)
                                            }
                                            setRevCopyClickedId(checkedScriptId)
                                            setTimeout(() => setRevCopyClickedId(""), 1000);
                                        }}
                                    >
                                        <p className="text-[12px] text-wrap whitespace-pre-line" title={checkboxOptionObj?.undoDescription}>
                                            {"copy\n(undo)"}
                                        </p>
                                    </button>
                                </div>
                            );
                        })
                }
            </div>
        </div>
    );
}

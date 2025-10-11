'use client';

import { useState } from "react";
import checkboxOptions, { CheckboxOption } from "../data/checkboxOptions";
import { CopyIcon, InspectIcon, UndoIcon } from "./icons";

interface PrefSelectionProps {
    setShowModal: (value: boolean) => void;
    prefSelectionDimensions: string;
    setModalObject: (value: CheckboxOption | null) => void;
}

export default function PrefSelection({
    setShowModal,
    prefSelectionDimensions, // "flex-1 w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-84 xl:h-84"
    setModalObject,
}: PrefSelectionProps) {
    const [filteredCheckboxOptions, setFilteredCheckboxOptions] = useState<typeof checkboxOptions>(checkboxOptions);  // checkboxOptions = source of truth
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);
    const [copyClickedId, setCopyClickedId] = useState<string>("");
    const [RevCopyClickedId, setRevCopyClickedId] = useState<string>("");

    // need a simple way to v briefly explain what a script does

    return (
        <div className="flex justify-center items-center bg-blue-300/20 border border-blue-300 rounded p-4">
            <div className={`${prefSelectionDimensions}`}>
                <div className="">
                    <input
                        type="text"
                        className="border w-[calc(100%-1rem)] bg-slate-700 focus:ring-2 focus:ring-white duration-150 p-1.5"
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
                    <legend><h4 className="text-center pt-2 pl-2"><strong>Select your scripts:</strong></h4></legend>
                    {filteredCheckboxOptions && filteredCheckboxOptions.map((checkboxOption) =>
                        <div className="pt-2 pl-3" key={checkboxOption.id}>
                            <input
                                type="checkbox"
                                className="w-4 h-4 focus:ring-2 focus:ring-blue-300 duration-150"
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
                    <div className="flex items-center justify-center h-full p-6.5">
                        {/* <h4><strong>More scripts to come!</strong></h4> */}
                    </div>
                </fieldset>

            </div>
            <div className={`${prefSelectionDimensions} border-l`}>
                <h4 className="text-center pt-2 pb-10"><strong>Checked Scripts:</strong></h4>
                {
                    checkedScripts.length == 0 ?
                        <div className="flex items-center justify-center h-full max-h-64">
                            <h4><strong>No scripts selected</strong></h4>
                        </div>
                        :
                        checkedScripts.map((checkedScriptId) => { // <- an array of Ids
                            const checkboxOptionObj = checkboxOptions.find(option => option.id === checkedScriptId); // <- find entire obj via id
                            return (
                                <div
                                    // purposely using checkedScript as a key, so I can monitor potential duplicate scripts inside checkedScripts - probs replace this with an actual test
                                    className={`flex animate-slide gap-2 pl-4 pb-4`} key={checkedScriptId}>
                                    <input
                                        type="text"
                                        readOnly
                                        value={checkboxOptionObj?.script}
                                        className="min-w-0 flex-1 border text-xs border-slate-800 bg-slate-200/40 text-slate-800 rounded p-2"
                                        title={checkboxOptionObj?.name}
                                    />
                                    <button className="border max-w-[3-rem] cursor-pointer rounded p-1 bg-slate-700 hover:bg-slate-700/10"
                                        type="button"
                                        title="Inspect Script"
                                        onClick={() => {
                                            setShowModal(true)
                                            setModalObject(checkboxOptionObj || null) // ? : is overkill
                                        }}
                                    >
                                        <InspectIcon className="w-5" />
                                    </button>
                                    <button className={`border max-w-[3-rem] cursor-pointer rounded p-1 ${checkedScriptId === copyClickedId ?
                                        "diagonal-stripes"
                                        : "bg-slate-700 hover:bg-slate-700/10"}`}
                                        type="button"
                                        title="Copy to clipboard"
                                        onClick={() => {
                                            if (checkboxOptionObj?.script) {
                                                navigator.clipboard.writeText(checkboxOptionObj?.script)
                                            }
                                            setCopyClickedId(checkedScriptId)
                                            setTimeout(() => setCopyClickedId(""), 1500);
                                        }}
                                    >
                                        <CopyIcon className="w-5" />
                                        {/* need a more graceful way to tell user script has been copied to clipboard... below, cant be it */}
                                        {/* {checkedScriptId !== copyClickedId ? <CopyIcon className="w-5" /> : <span className="w-5 text-sm">Copied</span>} */}

                                    </button>
                                    <button className={`border max-w-[3-rem] cursor-pointer rounded p-1 ${checkedScriptId === RevCopyClickedId ?
                                        "rev-diagonal-stripes"
                                        : "bg-slate-700 hover:bg-slate-700/10"}`}
                                        type="button"
                                        title="Copy 'undo' script"
                                        onClick={() => {
                                            if (checkboxOptionObj?.undoScript) {
                                                navigator.clipboard.writeText(checkboxOptionObj?.undoScript)
                                            }
                                            setRevCopyClickedId(checkedScriptId)
                                            setTimeout(() => setRevCopyClickedId(""), 1500);
                                        }}
                                    >
                                        <UndoIcon className="w-5" />
                                        {/* {checkedScriptId !== RevCopyClickedId ? <UndoIcon className="w-5" /> : <span className="w-5 text-sm">undo script, copied!</span>} */}
                                    </button>
                                </div>
                            );
                        })
                }
            </div>
        </div>
    );
}

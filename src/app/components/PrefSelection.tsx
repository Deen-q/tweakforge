'use client';

import { useState } from "react";
import checkboxOptions, { CheckboxOption } from "../data/checkboxOptions";
import { CopyIcon, InspectIcon, UndoIcon } from "./icons";

interface PrefSelectionProps {
    setShowModal: (value: boolean) => void;
    setModalObject: (value: CheckboxOption | null) => void;
}

export default function PrefSelection({
    setShowModal,
    setModalObject,
}: PrefSelectionProps) {
    const [filteredCheckboxOptions, setFilteredCheckboxOptions] = useState<typeof checkboxOptions>(checkboxOptions);  // checkboxOptions = source of truth
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);
    const [copyClickedId, setCopyClickedId] = useState<string>("");
    const [RevCopyClickedId, setRevCopyClickedId] = useState<string>("");

    // need a simple way to v briefly explain what a script does

    return (
        <div className="
        flex justify-center items-center
        w-94 md:w-150 lg:w-210 xl:w-250 xl:h-80
        bg-blue-300/20 border border-blue-300 rounded
        p-4
        ">
            {/*left segment -> gap-4 didnt seem adequate for space around the divider*/}
            <div className="h-full flex flex-col flex-1 pr-4">
                <input
                    type="text"
                    className="border w-full bg-slate-700 focus:ring-2 focus:ring-white duration-150 p-1.5"
                    placeholder="search scripts (e.g., 'disable onedrive'...)"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value === "") {
                            setFilteredCheckboxOptions(checkboxOptions)
                        } else {
                            setFilteredCheckboxOptions(checkboxOptions.filter(option =>
                                option.name.toLowerCase().includes(e.target.value)))
                        }
                    }}
                />
                <fieldset className="w-full">
                    <legend><h4 className="text-center py-2"><strong>Select your scripts:</strong></h4></legend>
                    {filteredCheckboxOptions && filteredCheckboxOptions.map((checkboxOption) =>
                        <div className="py-1" key={checkboxOption.id}>
                            <input
                                type="checkbox"
                                className="focus:ring-2 focus:ring-blue-300 duration-150"
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
                            <label htmlFor={checkboxOption.id} className="pl-2">{checkboxOption.name}</label>
                        </div>
                    )}
                </fieldset>

            </div>

            <div className={`h-full flex flex-1 flex-col justify-start items-center border-l pl-4`}> {/*default justify-start kept on purpose*/}
                <h4 className="pb-2"><strong>Checked Scripts:</strong></h4>

                <div className="h-full w-full gap-2 flex flex-col">
                    {
                        checkedScripts.length === 0 ?
                            <div className="h-full flex items-center text-center whitespace-pre-wrap">
                                <h4 className=""><strong>{`No scripts selected.\n💡 Tip: Check boxes on the left to add scripts here.`}</strong></h4>
                            </div>
                            :
                            checkedScripts.map((checkedScriptId) => { // <- an array of Ids
                                const checkboxOptionObj = checkboxOptions.find(option => option.id === checkedScriptId); // <- find entire obj via id
                                return (
                                    <div
                                        // purposely using checkedScript as a key, so I can monitor potential duplicate scripts inside checkedScripts - probs replace this with an actual test
                                        className="flex gap-2 animate-slide" key={checkedScriptId}>
                                        <input
                                            type="text"
                                            readOnly
                                            value={checkboxOptionObj?.script}
                                            // flex-1 w-X works here <<<<<< READ AGAIN WHY IT'S ACCEPTABLE IN THIS CASE (think its about same ele vs nested eles?)
                                            className="
                                                flex-1 w-2
                                                text-xs bg-slate-200/40 text-slate-800 rounded border border-slate-800
                                                p-2
                                                overflow-hidden text-ellipsis
                                            "
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
                                            {/* need a more graceful way to tell user script has been copied to clipboard */}

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
                                        </button>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
        </div>
    );
}

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    const [filteredCheckboxes, setFilteredCheckboxes] = useState<typeof checkboxOptions>(checkboxOptions);  // checkboxOptions = source of truth
    const [selectedScriptIds, setSelectedScriptIds] = useState<string[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [activeCopiedButton, setActiveCopiedButton] = useState<string>("");

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === "") {
            setFilteredCheckboxes(checkboxOptions)
        } else {
            setFilteredCheckboxes(
                checkboxOptions.filter(option =>
                    option.name.toLowerCase().includes(searchTerm)
                ));
        };
    }, []);

    const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) setSelectedScriptIds(prev => [...prev, e.target.name]);
        if (!e.target.checked) setSelectedScriptIds(prev => prev.filter(scriptId => scriptId !== e.target.name));
    }, []);

    const selectedScriptsMap = useMemo(() => { // {} used because the [] look out of place otherwise
        return new Map(checkboxOptions.map((option) => [option.id, option])) // ["script1", {*script1 object*}]
    }, []);

    const handleCopyClick = (scriptId: string, buttonType: 'copy' | 'undo') => {
        const scriptObj = selectedScriptsMap.get(scriptId);
        const scriptText = buttonType === 'copy' ? scriptObj?.script : scriptObj?.undoScript;

        if (scriptText) navigator.clipboard.writeText(scriptText);

        if (timeoutRef.current) clearTimeout(timeoutRef.current); // .current is null -> falsy, before first click. so only clears when actually clicked
        setActiveCopiedButton(`${scriptId}-${buttonType}`);
        timeoutRef.current = setTimeout(() => setActiveCopiedButton(""), 1500);
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        };
    }, []);

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
                    placeholder="search scripts (e.g., 'onedrive'...)"
                    onChange={handleSearchChange} // setFilteredCheckboxes
                />
                <fieldset className="w-full">
                    <legend><h4 className="text-center py-2"><strong>Select your scripts:</strong></h4></legend>
                    {filteredCheckboxes && filteredCheckboxes.map((filteredOption) =>
                        <div className="py-1" key={filteredOption.id}>
                            <input
                                type="checkbox"
                                className="focus:ring-2 focus:ring-blue-300 duration-150"
                                id={filteredOption.id}
                                name={filteredOption.id}
                                onChange={handleCheckboxChange} // setSelectedScriptIds
                                checked={selectedScriptIds.includes(filteredOption.id)} // could use Set + .has
                            />
                            <label htmlFor={filteredOption.id} className="pl-2">{filteredOption.name}</label>
                        </div>
                    )}
                </fieldset>
            </div>

            <div className={`h-full flex flex-1 flex-col justify-start items-center border-l pl-4`}>
                <h4 className="pb-2"><strong>Checked Scripts:</strong></h4>

                <div className="h-full w-full gap-2 flex flex-col">
                    {
                        selectedScriptIds.length === 0 ?
                            <div className="h-full flex items-center text-center whitespace-pre-wrap">
                                <h4 className=""><strong>{`No scripts selected.\n💡 Tip: Check boxes on the left to add scripts here.`}</strong></h4>
                            </div>
                            :
                            selectedScriptIds.map((id) => {
                                const selectedScriptObject = selectedScriptsMap.get(id)
                                if (!selectedScriptObject) return null;
                                return (
                                    <div
                                        className="flex gap-2 animate-slide" key={selectedScriptObject.id}>
                                        <input
                                            type="text"
                                            readOnly
                                            value={selectedScriptObject.script}
                                            // flex-1 min-w-2 ruins the design on mobiles
                                            className="
                                                flex-1 w-2
                                                text-xs bg-slate-200/40 text-slate-800 rounded border border-slate-800
                                                p-2
                                                overflow-hidden text-ellipsis
                                            "
                                            title={selectedScriptObject.description}
                                        />
                                        <button className="border max-w-[3-rem] cursor-pointer rounded p-1 bg-slate-700 hover:bg-slate-700/10"
                                            type="button"
                                            title="Inspect Script"
                                            onClick={() => {
                                                setShowModal(true)
                                                setModalObject(selectedScriptObject)
                                            }}
                                        >
                                            <InspectIcon className="w-5" />
                                        </button>
                                        <button className={`border max-w-[3-rem] cursor-pointer rounded p-1 ${activeCopiedButton === `${selectedScriptObject.id}-copy` ?
                                            "diagonal-stripes"
                                            : "bg-slate-700 hover:bg-slate-700/10"}`}
                                            type="button"
                                            title="Copy to clipboard"
                                            onClick={() => handleCopyClick(selectedScriptObject.id, 'copy')}
                                            disabled={!selectedScriptObject.script}
                                        >
                                            <CopyIcon className="w-5" />
                                            {/* need a more graceful way to tell user script has been copied to clipboard */}

                                        </button>
                                        {selectedScriptObject.undoScript &&
                                            <button className={`border max-w-[3-rem] cursor-pointer rounded p-1 ${activeCopiedButton === `${selectedScriptObject.id}-undo` ?
                                                "rev-diagonal-stripes"
                                                : "bg-slate-700 hover:bg-slate-700/10"}`}
                                                type="button"
                                                title="Copy 'undo' script"
                                                onClick={() => handleCopyClick(selectedScriptObject.id, 'undo')}
                                                disabled={!selectedScriptObject.undoScript}
                                            >
                                                <UndoIcon className="w-5" />
                                            </button>
                                        }
                                        {/* NEED A SECOND INSPECT BUTTON FOR UNDO SCRIPTS */}
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
        </div>
    );
}

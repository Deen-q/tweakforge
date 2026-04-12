'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import checkboxOptions, { CheckboxOption } from "../data/checkboxOptions";
import { CopyIcon, InspectIcon, InspectUndoIcon, UndoIcon } from "./icons";

interface ScriptSelectionProps {
    setShowModal: (value: boolean) => void;
    setModalObject: (value: CheckboxOption | null) => void;
    setActiveModal: (value: "forward" | "reverse" | "none") => void;
}

export default function ScriptSelection({
    setShowModal,
    setModalObject,
    setActiveModal,
}: ScriptSelectionProps) {
    const [filteredCheckboxes, setFilteredCheckboxes] = useState<CheckboxOption[]>(checkboxOptions);
    const [selectedScriptIds, setSelectedScriptIds] = useState<string[]>([]);
    const [activeCopiedButton, setActiveCopiedButton] = useState<string>("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const buttonSizeStyles = "border h-6 md:h-8 md:max-w-[3-rem] cursor-pointer rounded p-1 bg-slate-700 hover:bg-slate-700/10";
    const buttonIconStyles = "w-4 md:w-5"

    const selectedScriptsMap = useMemo(() => {
        return new Map(checkboxOptions.map((option) => [option.id, option])) // ["script1", {*script1 object*}]
    }, []);

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
        md:flex justify-center items-center
        w-70 md:w-150 lg:w-210 xl:w-250 xl:h-80
        bg-selection border border-blue-300 
        rounded-lg
        p-4 md:p-6
        ">
            {/*left segment -> gap-4 didnt seem adequate for space around the divider*/}
            <div className="h-34 md:h-full flex flex-col flex-1 overflow-y-auto md:pr-5">
                <div className="sticky top-0 z-2 bg-selection">
                    <div className="pb-1 md:pb-2 flex justify-center">
                        <input
                            type="text"
                            className="border w-[calc(100%-0.5rem)] h-8 md:h-10 rounded-lg text-center focus:text-left bg-slate-700 focus:ring-2 focus:ring-white duration-150 my-0.5 px-4"
                            placeholder="search scripts e.g., 'onedrive'..."
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="bg-slate-800 rounded-bl-lg rounded-tr-lg text-center py-2 md:mb-2">
                        <strong>Select your scripts:</strong>
                    </div>
                </div>
                <fieldset className="w-full" aria-label="Select your scripts">
                    <legend className="sr-only">Select your scripts</legend>
                    {filteredCheckboxes && filteredCheckboxes.map((filteredOption) =>
                        <div className="py-1 pl-1" key={filteredOption.id}>
                            <input
                                type="checkbox"
                                className="focus:ring-2 focus:ring-blue-300 duration-150"
                                id={filteredOption.id}
                                name={filteredOption.id}
                                onChange={handleCheckboxChange}
                                checked={selectedScriptIds.includes(filteredOption.id)} // could use Set + .has
                            />
                            <label htmlFor={filteredOption.id} className="pl-2">{filteredOption.name}</label>
                        </div>
                    )}
                </fieldset>
            </div>

            <div className="h-34 md:h-full flex flex-1 flex-col justify-start items-center border-t md:border-l md:border-t-0 overflow-y-auto overflow-x-hidden md:pl-5">
                <div className="w-full sticky top-0 z-2 bg-selection">
                    <div className="bg-slate-800 rounded-tl-lg rounded-br-lg text-center py-2 mt-2 mb-2 md:mt-0 md:mb-3">
                        <strong>Checked scripts:</strong>
                    </div>

                </div>
                <div className="h-full w-full gap-2 flex flex-col">
                    {
                        selectedScriptIds.length === 0 ?
                            <div className="h-full flex items-center text-center md:px-1">
                                <h4 className=""><strong>{`No scripts selected.\nCheck boxes to add scripts here.`}</strong></h4>
                            </div>
                            :
                            selectedScriptIds.map((id) => {
                                const selectedScriptObject = selectedScriptsMap.get(id)
                                if (!selectedScriptObject) return null;
                                return (
                                    <div
                                        className="flex gap-1 md:gap-2 animate-slide" key={selectedScriptObject.id}>
                                        <input
                                            type="text"
                                            readOnly
                                            value={selectedScriptObject.script}
                                            // flex-1 min-w-2 ruins the design on mobiles
                                            className="
                                                flex-1 w-2 h-6 md:h-8
                                                text-xs bg-slate-200/40 text-slate-800 rounded border border-slate-800
                                                overflow-hidden text-ellipsis
                                                p-2
                                            "
                                            title={selectedScriptObject.description}
                                        />
                                        <button className={buttonSizeStyles}
                                            type="button"
                                            title="Inspect Script"
                                            onClick={() => {
                                                setShowModal(true)
                                                setModalObject(selectedScriptObject)
                                                setActiveModal("forward")
                                            }}
                                        >
                                            <InspectIcon className={buttonIconStyles} />
                                        </button>
                                        <button className={`${buttonSizeStyles} ${activeCopiedButton === `${selectedScriptObject.id}-copy` ?
                                            "diagonal-stripes"
                                            : "bg-slate-700 hover:bg-slate-700/10"}`}
                                            type="button"
                                            title="Copy to clipboard"
                                            onClick={() => handleCopyClick(selectedScriptObject.id, 'copy')}
                                            disabled={!selectedScriptObject.script}
                                        >
                                            <CopyIcon className={buttonIconStyles} />
                                            {/* need a more graceful way to tell user script has been copied to clipboard */}

                                        </button>
                                        {selectedScriptObject.undoScript &&
                                            <button className={`${buttonSizeStyles} ${activeCopiedButton === `${selectedScriptObject.id}-undo` ?
                                                "rev-diagonal-stripes"
                                                : "bg-slate-700 hover:bg-slate-700/10"}`}
                                                type="button"
                                                title="Copy 'undo' script"
                                                onClick={() => handleCopyClick(selectedScriptObject.id, 'undo')}
                                                disabled={!selectedScriptObject.undoScript}
                                            >
                                                <UndoIcon className={buttonIconStyles} />
                                            </button>
                                        }
                                        {selectedScriptObject.undoScript &&
                                            <button className={buttonSizeStyles}
                                                type="button"
                                                title="Inspect 'undo' Script"
                                                onClick={() => {
                                                    setShowModal(true)
                                                    setModalObject(selectedScriptObject)
                                                    setActiveModal("reverse")
                                                }}
                                            >
                                                <InspectUndoIcon className={buttonIconStyles} />
                                            </button>
                                        }
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from "react";
import checkboxOptions from "../data/checkboxOptions";

export default function PrefSelection() {
    // checkboxOptions = source of truth
    const [filteredCheckboxOptions, setFilteredCheckboxOptions] = useState<typeof checkboxOptions>(checkboxOptions);
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);

    // only used once in the code, inline maybe?
    const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value
        console.log(targetValue)
        if (targetValue === "") {
            setFilteredCheckboxOptions(checkboxOptions)
        } else {
            setFilteredCheckboxOptions(checkboxOptions.filter(option => option.id.includes(targetValue)))
        }
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetName = e.target.name;
        setCheckedScripts(prev => {
            if (e.target.checked) {
                return [...prev, targetName]
            } else {
                return prev.filter(option => option !== targetName)
            }
        });
    };

    return (
        <div className="flex">
            <div className="border min-w-48 min-h-60">
                <div className="border">
                    <input
                        type="text"
                        placeholder="search for features..."
                        onChange={handleSearchFilter}
                    // size={10}
                    />
                </div>

                <fieldset>
                    <legend>Pick sum scriptz</legend>
                    {/* CREATING THE CHECKBOXES BASED ON ARRAY*/}
                    {filteredCheckboxOptions && filteredCheckboxOptions.map((checkboxOption) =>
                        // if checkedScripts contents .includes checboxOption, create a disabled checkbox?
                        // do not use index as key
                        <div key={checkboxOption.id}>
                            <input
                                type="checkbox"
                                id={checkboxOption.id}
                                name={checkboxOption.id} // meeded for e.target.name !!!
                                onChange={handleCheckboxChange}
                                // react was upset that I swapped between this input with and without checked
                                // apparently that was known as uncontrolled inputs - either always or never provide a value to checked. tbh, I didnt realise checked could be passed something, faim (at the time) it was just a flag you attached!
                                checked={checkedScripts.includes(checkboxOption.id)}
                            />
                            <label htmlFor={checkboxOption.id}>{checkboxOption.name}</label>
                        </div>
                    )}
                </fieldset>

            </div>
            <div className="border min-w-60 min-h-60">
                Checked Scripts + respective copy btns
                {/* {console.log({ checkedScripts })} */}
                {checkedScripts.map((checkedScriptId) => {
                    // find the entire object via id, to avoid always loading in the object (slow and redundant)
                    const checkboxOptionObj = checkboxOptions.find(option => option.id === checkedScriptId);
                    return (
                        <div
                            // purposely using checkedScript as a key, so I can monitor potential duplicate scripts inside checkedScripts
                            className="flex" key={checkedScriptId}>
                            <div>
                                <input
                                    type="text"
                                    readOnly
                                    // value={checkedScriptId}
                                    value={checkboxOptionObj?.script}
                                />
                            </div>
                            <button
                                className="border border-red-600 cursor-pointer"
                                type="button"
                                // cant use ! here in case there's race conditions etc
                                // onClick={() => navigator.clipboard.writeText(checkboxOptionObj!.script)}
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

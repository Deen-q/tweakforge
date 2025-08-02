'use client';

import { useState } from "react";
import checkboxOptions from "../data/checkboxOptions";

export default function PrefSelection() {
    // checkboxOptions = source of truth
    const [filteredCheckboxOptions, setFilteredCheckboxOptions] = useState<typeof checkboxOptions>(checkboxOptions);
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);

    return (
        <div className="flex justify-center items-center">
            <div className="border min-w-48 min-h-60">
                <div className="border">
                    <input
                        type="text"
                        placeholder="search for features..."
                        // onChange={handleSearchFilter}
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
                        // do not use index as key
                        <div key={checkboxOption.id}>
                            <input
                                type="checkbox"
                                id={checkboxOption.id}
                                name={checkboxOption.id} // needed for e.target.name !!!
                                // onChange={handleCheckboxChange}
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
                            // purposely using checkedScript as a key, so I can monitor potential duplicate scripts inside checkedScripts - probs replace this with an actual test
                            className="flex" key={checkedScriptId}>
                            <div>
                                <input
                                    type="text"
                                    readOnly
                                    value={checkboxOptionObj?.script}
                                />
                            </div>
                            <button
                                className="border border-red-600 cursor-pointer"
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

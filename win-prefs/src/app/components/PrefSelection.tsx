'use client';

import { useState } from "react";
import checkboxOptions from "../data/checkboxOptions";

export default function PrefSelection() {
    // checkboxOptions = source of truth
    const [filteredCheckboxOptions, setFilteredCheckboxOptions] = useState<string[]>(checkboxOptions);
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);

    // only used once in the code, inline maybe?
    const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value
        console.log(targetValue)
        if (targetValue === "") {
            setFilteredCheckboxOptions(checkboxOptions)
        } else {
            // setFilteredCheckboxOptions(checkboxOptions.filter(option => option == targetValue))

            // allow for substring matching. although below works, the newest solution makes the most sense and made sure I PROPERLY understood how .filter works
            /// setFilteredCheckboxOptions(checkboxOptions.filter(option => option.match(targetValue) == targetValue))
            setFilteredCheckboxOptions(checkboxOptions.filter(option => option.includes(targetValue)))
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
            <div className="border border-blue-600 min-w-60 min-h-60">
                <div className="border">
                    <input
                        type="text"
                        placeholder="search for features..."
                        onChange={handleSearchFilter}
                    />
                </div>

                <fieldset>
                    <legend>Pick sum scriptz</legend>
                    {/* CREATING THE CHECKBOXES BASED ON ARRAY*/}
                    {filteredCheckboxOptions && filteredCheckboxOptions.map((checkboxOption) =>
                        // do not use index as key
                        <div key={checkboxOption}>
                            <input
                                type="checkbox"
                                id={checkboxOption}
                                name={checkboxOption}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor={checkboxOption}>{checkboxOption}</label>
                        </div>
                    )}
                    {/* <div>
                        <input
                            type="checkbox"
                            id="removeCopilot"
                            name="removeCopilot"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="removeCopilot">removeCopilot</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="addCopilot"
                            name="addCopilot"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="addCopilot">addCopilot</label>
                    </div> */}
                </fieldset>

            </div>
            <div className="border border-green-600 min-w-60 min-h-60">
                {/* <input
                    type="text"
                    readOnly
                    value={checkedScripts.join(' ')}

                /> */}
                {checkedScripts.map((checkedScript) =>
                    <input
                        key={checkedScript}
                        type="text"
                        readOnly
                        value={checkedScript}
                    />
                )}

                {checkedScripts.length > 0 &&
                    checkedScripts.map((aButton) =>
                        <div key={aButton}>
                            <button
                                className="border border-red-600 cursor-pointer"
                                type="button"
                                onClick={() => navigator.clipboard.writeText(checkedScripts.toString())}
                            >
                                copy
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

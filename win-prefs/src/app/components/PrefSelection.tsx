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
            <div className="border border-blue-600 min-w-48 min-h-60">
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
                </fieldset>

            </div>
            <div className="border border-green-600 min-w-60 min-h-60">
                {checkedScripts.map((checkedScript) =>
                    <div
                        className="flex"
                        key={checkedScript}
                    >
                        <div>
                            <input
                                type="text"
                                readOnly
                                value={checkedScript}
                            />
                        </div>
                        <button
                            className="border border-red-600 cursor-pointer"
                            type="button"
                            onClick={() => navigator.clipboard.writeText(checkedScript.toString())}
                        >
                            copy
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// {
//     checkedScripts.length > 0 &&
//     checkedScripts.map((aCopyButton) =>
//         <div key={aCopyButton}>
//             <button
//                 className="border border-red-600 cursor-pointer"
//                 type="button"
//                 onClick={() => navigator.clipboard.writeText(checkedScripts.toString())}
//             >
//                 copy
//             </button>
//         </div>
//     )
// }
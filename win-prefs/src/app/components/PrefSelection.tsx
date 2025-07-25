'use client';

import { useState } from "react";

export default function PrefSelection() {
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);

    const handelCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetName = e.target.name;
        setCheckedScripts(prev => {
            if (e.target.checked) {
                return [...prev, targetName]
            } else {
                return prev.filter(option => option !== targetName)
            }

        });
    };

    /*
     * when I click to add, it should check previous state and probs spread it 
     */

    return (
        <div className="flex">
            <div className="border">
                <div className="border">
                    <input
                        type="text"
                        placeholder="search for features..."
                    />
                </div>

                <fieldset>
                    <legend>Pick sum scriptz</legend>
                    <div>
                        <input
                            type="checkbox"
                            id="removeCopilot"
                            name="removeCopilot"
                            onChange={handelCheckboxChange}
                        />
                        <label htmlFor="removeCopilot">removeCopilot</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="addCopilot"
                            name="addCopilot"
                            onChange={handelCheckboxChange}
                        />
                        <label htmlFor="addCopilot">addCopilot</label>
                    </div>
                </fieldset>

            </div>
            <div className="border flex-col">
                <input
                    type="text"
                    readOnly
                    value={checkedScripts.join(' ')}

                />
                {/* New plan: each script that is added will get it's own copy button! */}
                <button
                    className="border border-red-600 cursor-pointer"
                    type="button"
                    onClick={() => navigator.clipboard.writeText(checkedScripts)}
                >
                    copy
                </button>
            </div>
        </div>
    );
}

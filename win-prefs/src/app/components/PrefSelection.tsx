'use client';

import { useState } from "react";

export default function PrefSelection() {
    const [checkedScripts, setCheckedScripts] = useState<string[]>([]);

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div>
            <fieldset>
                <legend>Pick sum scriptz</legend>
                <div>
                    <input
                        type="checkbox"
                        id="removeCopilot"
                        name="removeCopilot"
                        onChange={handleClick}
                    />
                    <label htmlFor="removeCopilot">removeCopilot</label>
                </div>
            </fieldset>

            <div className="border-black">
                <input
                    type="text"
                    readOnly
                    value={checkedScripts}
                />
            </div>
        </div>
    );
}

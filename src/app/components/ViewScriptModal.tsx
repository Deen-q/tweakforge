'use client';

import { checkboxOption } from "../data/checkboxOptions";

interface ViewScriptModalProps {
    setShowModal: (value: boolean) => void;
    // modalObject: object | undefined;
    modalObject: checkboxOption | null;
}

// turned into a generic component, later
export default function ViewScriptModal({
    setShowModal,
    modalObject,
}: ViewScriptModalProps) {

    const modalDimensions = "w-80 h-40 md:w-112 md:h-56 lg:w-144 lg:h-72 xl:w-168 xl:h-84";
    const modalPositioning = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

    return (
        <div className={`flex flex-col items-center rounded border z-10 bg-slate-800 border-blue-300 ${modalPositioning} ${modalDimensions}`}>
            <div className="flex justify-between w-full px-6 py-1 bg-slate-700">
                <span className="">{modalObject?.name}:</span>
                <button
                    className="cursor-pointer hover:bg-slate-400 text-red-600 rounded w-5"
                    onClick={() => setShowModal(false)}
                >x</button>
            </div>
            <div className="">
                <textarea
                    value={modalObject?.script}
                    readOnly
                    className="resize-none mt-1.5 
                    w-78 h-30 pl-12 pr-12
                    md:w-110 md:h-54 md:max-w-110 md:max-h-44
                    lg:w-142 lg:h-70 lg:max-w-142 lg:max-h-58
                    xl:w-145 xl:h-65 xl:max-h-80 
                    xl:px-0"
                />
            </div>
        </div>
    );
}

'use client';

import { useEffect } from "react";
import { CheckboxOption, BySlug } from "../data/types";

interface ViewScriptModalProps {
    setShowModal: (value: boolean) => void;
    modalObject: CheckboxOption | null;
    activeModal: "forward" | "reverse" | "none";
    setActiveModal: (value: "forward" | "reverse" | "none") => void;
    versionData: BySlug;
}

export default function ViewScriptModal({
    setShowModal,
    modalObject,
    activeModal,
    setActiveModal,
    versionData
}: ViewScriptModalProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowModal(false)
                setActiveModal("none")
            }
        }
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setShowModal, setActiveModal]);

    const modalDimensions = "w-80 h-48 md:w-112 md:h-64 lg:w-144 lg:h-80 xl:w-168 xl:h-88";
    const modalPositioning = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

    if (!modalObject) return null;

    const modalTitle = activeModal === "forward" ? modalObject.name : `Undo ${modalObject.name}`;
    const modalContent = activeModal === "forward" ? modalObject.script : modalObject.undoScript;

    const scriptVersion = versionData?.[modalObject.id]?.version;
    const changelog = versionData?.[modalObject.id]?.changelog;
    const createdAt = versionData?.[modalObject.id]?.created_at;

    return (
        <div className={`flex flex-col items-center rounded border z-10 bg-slate-800 border-blue-300 ${modalPositioning} ${modalDimensions}`}>
            <div className="flex justify-between w-full px-6 py-1 bg-slate-700 border-0 border-b border-b-red-600">
                <div className="flex flex-col w-full">
                    <span className=""><b>{modalTitle}</b></span>
                    <span className="text-slate-400 text-xs">Version:
                        <span>
                            <b>
                                {scriptVersion ?? "not yet published"}
                            </b>
                        </span>
                    </span>
                    <div className="flex justify-between text-xs">
                        {/* add new script + entry to scriptMetadata -> versionData.ts is still clueless since no new row exists in Neon yet */}
                        <span className="cursor-help" title={changelog == null ? "not yet published..." : changelog}>Changelog<span className="font-bold"><sup>i</sup></span></span>
                        <span className="cursor-help" title={createdAt == null ? "not yet published..." : String(createdAt)}>Created At<span className="font-bold"><sup>i</sup></span></span>
                    </div>
                </div>

                <button
                    aria-label="Close"
                    className="cursor-pointer hover:bg-slate-400 text-slate-400 hover:text-red-600 rounded w-4 h-6"
                    onClick={() => {
                        setShowModal(false)
                        setActiveModal("none")
                    }
                    }
                >
                    <b>&times;</b>
                </button>
            </div>
            <div>
                <textarea
                    aria-label="Modal Content"
                    value={modalContent ?? ""}
                    readOnly
                    className="resize-none mt-1.5 
                    w-78 h-30 px-12
                    md:w-110 md:h-54 md:max-w-110 md:max-h-44
                    lg:w-142 lg:h-70 lg:max-w-142 lg:max-h-58
                    xl:w-145 xl:h-65 xl:max-h-80 
                    xl:px-0"
                />
            </div>
        </div>
    );
}
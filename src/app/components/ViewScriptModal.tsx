'use client';

import { useEffect } from "react";
import { CheckboxOption } from "../data/checkboxOptions";
import { BySlug } from "../page";

interface ViewScriptModalProps {
    setShowModal: (value: boolean) => void;
    modalObject: CheckboxOption | null;
    activeModal: "forward" | "reverse" | "none";
    setActiveModal: (value: "forward" | "reverse" | "none") => void;
    versionData: BySlug | null;
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

    const modalTitle = activeModal === "forward" ? modalObject?.name : `Undo ${modalObject?.name}`;
    const modalContent = activeModal === "forward" ? modalObject?.script : modalObject?.undoScript;

    const scriptVersion = modalObject ? versionData?.[modalObject.id]?.version : null;
    const changelog = modalObject ? versionData?.[modalObject.id]?.changelog : null;
    const createdAt = modalObject ? versionData?.[modalObject.id]?.created_at : null;

    return (
        <div className={`flex flex-col items-center rounded border z-10 bg-slate-800 border-blue-300 ${modalPositioning} ${modalDimensions}`}>
            <div className="flex justify-between w-full px-6 py-1 bg-slate-700 border-0 border-b border-b-red-600">
                <div className="flex flex-col w-full">
                    <span className=""><b>{modalTitle}</b></span>
                    <span className="text-slate-400 text-xs">Version:
                        <span className={versionData == null ? "cursor-wait" : ""}>
                            <b>
                                {scriptVersion == null ? " loading..." : scriptVersion}
                            </b>
                        </span>
                    </span>
                    <div className="flex justify-between text-xs">
                        <span className="cursor-help" title={changelog == null ? "loading..." : changelog}>Changelog<span className="font-bold"><sup>i</sup></span></span>
                        <span className="cursor-help" title={createdAt === null ? "loading..." : String(createdAt)}>Created At<span className="font-bold"><sup>i</sup></span></span>
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
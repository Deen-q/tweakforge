'use client';

interface ViewScriptModalProps {
    setShowModal: (value: boolean) => void;
    modalScript: string | undefined;
}

// turned into a generic component, later
export default function ViewScriptModal({
    setShowModal,
    modalScript,
}: ViewScriptModalProps) {

    // ---> this weird issue is LIKELY caused by the offset from the navbar!! w-24, approx 96px
    // const testDimensions = "xl:w-170 xl:h-92.5 xl:mt-60"
    // const testDimensions = "w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-84 xl:h-84"

    // double the dimensions for pref selection, since both halves have the same size
    const modalDimensions = "w-80 h-40 md:w-112 md:h-56 lg:w-144 lg:h-72 xl:w-168 xl:h-84";
    const modalPositioning = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

    return (
        // <div className={`flex justify-center items-center bg-yellow-900 absolute inset-0 m-auto ${ViewScriptModalDimensions}`}>
        <div className={`flex flex-col items-center rounded border z-10 bg-slate-800 border-blue-300 ${modalPositioning} ${modalDimensions}`}>
            {/* <div className=""> */}
            <div className="flex justify-between w-full px-6 py-1 bg-slate-700">
                <span className="">hi</span>
                <button
                    // className="flex items-center justify-center absolute top-2 right-2 w-6 h-6 hover:bg-slate-400 text-red-600 rounded"
                    className="cursor-pointer hover:bg-slate-400 text-red-600 rounded w-5"
                    onClick={() => setShowModal(false)}
                >x</button>
            </div>
            <div className="">
                <textarea
                    value={modalScript}
                    readOnly
                    className="resize-none mt-1.5 
                    w-78 h-38 pl-12 pr-12
                    md:w-110 md:h-54 md:max-w-110 md:max-h-54
                    lg:w-142 lg:h-70 lg:max-w-142 lg:max-h-70
                    xl:w-145 xl:h-65 xl:max-h-80 xl:pl-0 xl:pr-0"
                // "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
                />
            </div>
            {/* </div> */}
        </div>
    );
}

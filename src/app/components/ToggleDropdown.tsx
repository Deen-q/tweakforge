'use client';

interface ToggleDropdownProps {
    title: string;
    children: React.ReactNode;
    id: string;
    isOpen: boolean;
    changeActiveDropdownId: (id: string) => void;
}

export default function ToggleDropdown({
    title,
    children,
    id,
    changeActiveDropdownId,
    isOpen
}: ToggleDropdownProps) {

    return (
        <>
            <button
                onClick={() => changeActiveDropdownId(id)}
                className="flex items-center pt-1 pb-1 gap-2 w-full hover:bg-slate-400 transition-colors duration-200"
            >
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {/* 24x24 grid where 9,5 is starting pos */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

                <span className="font-medium text-blue-300">{title}</span>
            </button>
            {/* overflow-hidden container = clip anything taller than its height */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-2 h-12 md:h-24 lg:h-16 xl:h-auto xl:max-h-38 overflow-y-auto bg-slate-800 text-gray-400">
                    {children}
                </div>
            </div>
        </>
    );
}
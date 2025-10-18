
import { useState } from "react";
import aboutPageData from "../data/aboutPageData";

export default function SidebarLayout() {
    const [activeSectionId, setActiveSectionId] = useState<string>("about-tweakforge");

    // think: why couldnt I just use aboutPageData.id == e.currentTarget.id data logic?
    const currentSection = aboutPageData.find(aboutObj => aboutObj.id === activeSectionId) // for loop worth it?

    return (
        <div className="flex flex-1 h-full gap-4">
            <nav className="flex flex-col items-start justify-center pl-4">
                {aboutPageData.map(sections =>
                    // no e needed?
                    <button
                        className={`${activeSectionId == sections.id && "rounded bg-blue-300 text-black"} pl-1 pr-2 py-2 my-0.5`}
                        key={sections.id}
                        onClick={() => setActiveSectionId(sections.id)}>
                        {sections.title}
                    </button>
                )}
            </nav>
            <main className="flex flex-1 bg-slate-800 rounded-tl-lg whitespace-pre-wrap">
                <span className="overflow-y-auto lg:w-[60%] xl:w-[70%] pt-4 pl-6 pr-2">{currentSection?.content}</span>
            </main>
        </div>
    )
}


import { useState } from "react";
import aboutPageData from "../data/aboutPageData";

export default function SidebarLayout() {
    const [activeSectionId, setActiveSectionId] = useState<string>("about-tweakforge");

    // think: why couldnt I just use aboutPageData.id == e.currentTarget.id data logic?
    const currentSection = aboutPageData.find(aboutObj => aboutObj.id === activeSectionId) // for loop worth it?
    // const selectedSectionStyles = "rounded bg-blue-300 text-black"

    return (
        <div className="flex h-full">
            <nav className="flex flex-col items-start justify-center w-[20%] p-10">
                {aboutPageData.map(sections =>
                    // no e needed?
                    <button
                        className={`mb-2 py-2 pl-2 pr-4 ${activeSectionId == sections.id && "rounded bg-blue-300 text-black"}`}
                        key={sections.id}
                        onClick={() => setActiveSectionId(sections.id)}>
                        {sections.title}
                    </button>
                )}
            </nav>
            <main className="flex flex-col items-center justify-center w-[60%] p-4 whitespace-pre-wrap">
                <span className="bg-slate-800 rounded-tl-lg p-4">{currentSection?.content}</span>
            </main>
        </div>
    )
}

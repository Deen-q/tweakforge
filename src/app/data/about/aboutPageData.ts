import {
    aboutTweakforge,
    howScriptsAreTested,
    licensing,
} from "./content";

export interface AboutPageData {
    id: string;
    title: string;
    content: string;
}

const aboutPageData: readonly AboutPageData[] = [
    {
        id: "about_about-tweakforge",
        title: "💡 about tweakforge",
        content: aboutTweakforge,
    },
    {
        id: "about_how-scripts-are-tested",
        title: "❓ how scripts are tested",
        content: howScriptsAreTested,
    },
    {
        // should this have a seperate page?
        id: "about_licensing",
        title: "⚖️ license",
        content: licensing,
    },
    // plans for thorough use of ARIA labels and support for screen readers...
    // {
    //     id: "about_accessibility",
    //     title: "💖 accessibility",
    //     content: "1",
    // },
]

export default aboutPageData
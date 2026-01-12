import { Ps1Scripts } from "@/getscripts/getScripts";

export interface CheckboxOption {
    id: string;
    name: string;
    script: string;
    undoScript: string | null;
    description: string;
    undoDescription: string;
}

// to ensure TweakForge is accessible to people of all skill levels (including non-technical folk), scripts may seem to hold your hand a lot. This is on purpose.

export function getCheckboxOptions(scripts: Ps1Scripts): CheckboxOption[] {
    return [
        {
            id: "restoreRightClickMenu",
            name: "Restore Classic Right-click Menu",
            script: scripts.classicRightClick,
            undoScript: scripts.classicRightClickUndo,
            description: "Returns the original right-click menu when in file explorer",
            undoDescription: "Back to default: Windows 11 right-click menu"
        },
        {
            id: "disableOneDrive",
            name: "Disable OneDrive",
            script: scripts.disableOneDrive,
            undoScript: scripts.disableOneDriveUndo,
            description: "Completely removes OneDrive from your Local Machine (via HKLM)",
            undoDescription: "Return OneDrive as it was. Will offer to take you to official reinstall web page"
        },
        {
            id: "disableWidgetPreload",
            name: "Disable Widget Preload",
            script: scripts.disableWidgetPreload,
            undoScript: scripts.disableWidgetPreloadUndo,
            description: "Stops widgets from running in background (potentially saves 100-200MB RAM) without breaking other apps via WebView2",
            undoDescription: "Restore widgets to default behavior"
        },
        {
            id: "disableCopilot",
            name: "Disable Copilot",
            script: scripts.disableCopilot,
            undoScript: scripts.disableCopilotUndo,
            description: "Disables copilot at the user-level AND system-wide (REVERSIBLE), including: copilot in Edge sidebar, copilot suggestions in search",
            undoDescription: "Returns Copilot to its default state"
        },
        {
            id: "removeBloatware",
            name: "Remove Bloatware (non-aggressive)",
            script: scripts.removeBloatware,
            undoScript: null,
            description: "Removes promotional apps, games, and trials (Candy Crush, Clipchamp, etc.). Preserves essential apps and doesn't touch Teams/OneNote to avoid interfering with business versions",
            undoDescription: ""
        },
    ];
}

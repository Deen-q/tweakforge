/* >>> build-scripts: .ps1 files to string literals */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// script metadata to replace current checkboxOptions array
const scriptMetadata = [
    {
        id: "restoreRightClickMenu",
        name: "Restore Classic Right-click Menu",
        scriptFile: "classicRightClick.ps1",
        undoScriptFile: "classicRightClick.undo.ps1",
        description: "Returns the original right-click menu when in file explorer",
        undoDescription: "Back to default: Windows 11 right-click menu"
    },
    {
        id: "disableOneDrive",
        name: "Disable OneDrive",
        scriptFile: "disableOneDrive.ps1",
        undoScriptFile: "disableOneDrive.undo.ps1",
        description: "Completely removes OneDrive from your Local Machine (via HKLM)",
        undoDescription: "Return OneDrive as it was. Will offer to take you to official reinstall web page"
    },
    {
        id: "disableWidgetPreload",
        name: "Disable Widget Preload",
        scriptFile: "disableWidgetPreload.ps1",
        undoScriptFile: "disableWidgetPreload.undo.ps1",
        description: "Stops widgets from running in background (potentially saves 100-200MB RAM) without breaking other apps via WebView2",
        undoDescription: "Restore widgets to default behavior"
    },
    {
        id: "disableCopilot",
        name: "Disable Copilot",
        scriptFile: "disableCopilot.ps1",
        undoScriptFile: "disableCopilot.undo.ps1",
        description: "Disables copilot at the user-level AND system-wide (REVERSIBLE), including: copilot in Edge sidebar, copilot suggestions in search",
        undoDescription: "Returns Copilot to its default state"
    },
    {
        id: "removePreinstalledApps",
        name: "Remove Preinstalled Apps (non-aggressive)",
        scriptFile: "removePreinstalledApps.ps1",
        undoScriptFile: null,
        description: "Removes promotional apps, games, and trials (Candy Crush, Clipchamp, etc.). Preserves essential apps and doesn't touch Teams/OneNote to avoid interfering with business versions",
        undoDescription: ""
    },
];

// const scriptsDir = path.join(process.cwd(), 'src', 'scripts');
const scriptsDir = path.join(__dirname, '../src/scripts');
const outputPath = path.join(__dirname, '../src/app/data/checkboxOptions.ts');

let output = `
// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// Generated from .ps1 files in /src/scripts/
// Run 'npm run generate-scripts' to regenerate

export interface CheckboxOption {
    id: string;
    name: string;
    script: string;
    undoScript: string | null;
    description: string;
    undoDescription: string;
}

// to ensure TweakForge is accessible to people of all skill levels (including non-technical folk), scripts may seem to hold your hand a lot. This is on purpose.

const checkboxOptions: CheckboxOption[] = [
`;

for (let i = 0; i < scriptMetadata.length; i++) {
    const item = scriptMetadata[i];

    const scriptPath = path.join(scriptsDir, item.scriptFile);
    let scriptContent;
    try {
        scriptContent = fs.readFileSync(scriptPath, 'utf8');
        scriptContent = scriptContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
    } catch (error) {
        console.error(`Error reading ${item.scriptFile}... error mesage: `, error.message);
        process.exit(1);
    }

    let undoScriptContent = 'null';
    if (item.undoScriptFile) {
        const undoScriptPath = path.join(scriptsDir, item.undoScriptFile);
        try {
            const undoContent = fs.readFileSync(undoScriptPath, 'utf8');
            const escapedUndoContent = undoContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
            undoScriptContent = '`' + escapedUndoContent + '`';
        } catch (error) {
            console.error(`Error reading ${item.undoScriptFile}... error message: `, error.message);
            process.exit(1);
        }
    }

    output += `    {
    id: "${item.id}",
    name: "${item.name}",
    script: \`${scriptContent}\`,
    undoScript: ${undoScriptContent},
    description: "${item.description}",
    undoDescription: "${item.undoDescription}",
    }${i < scriptMetadata.length - 1 ? ',' : ''}
    `;
}

output += `];

export default checkboxOptions;
`;

// write file
try {
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, output, 'utf8');
    console.log("=== Finished ===");
    console.log(`-> checkboxOptions.ts generated successfully at ${outputPath}`)
} catch (error) {
    console.log("error writing file, error message is: ", error.message);
    process.exit(1);
}
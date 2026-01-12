'use server';
import fs from 'node:fs/promises';
import path from 'node:path';

export interface Ps1Scripts {
    [key: string]: string
}

const scriptFiles = {
    classicRightClick: 'classicRightClick.ps1',
    classicRightClickUndo: 'classicRightClick.undo.ps1',
    disableOneDrive: 'disableOneDrive.ps1',
    disableOneDriveUndo: 'disableOneDrive.undo.ps1',
    disableWidgetPreload: 'disableWidgetPreload.ps1',
    disableWidgetPreloadUndo: 'disableWidgetPreload.undo.ps1',
    disableCopilot: 'disableCopilot.ps1',
    disableCopilotUndo: 'disableCopilot.undo.ps1',
    removePreinstalledApps: 'removePreinstalledApps.ps1',
};

export async function getPs1Scripts() {
    const arrFromObj: [string, string][] = [];
    const keys = Object.keys(scriptFiles);
    const values = Object.values(scriptFiles);
    for (let i = 0; i < Object.entries(scriptFiles).length; i++) {
        arrFromObj.push([keys[i], values[i]]);
    }

    const promises: [string, Promise<string>][] = [];
    const scriptsDir = path.join(process.cwd(), 'src', 'scripts');
    for (let i = 0; i < arrFromObj.length; i++) {
        const key = arrFromObj[i][0];
        const filename = arrFromObj[i][1];
        const fullpath = path.join(scriptsDir, filename);
        const promise = fs.readFile(fullpath, 'utf8');
        promises.push([key, promise])
    }

    const transformed: { [key: string]: string } = {};
    for (let i = 0; i < promises.length; i++) {
        const key = promises[i][0];
        const promiseObj = promises[i][1];
        const scriptCotent = await promiseObj;
        transformed[key] = scriptCotent;
    }
    return transformed; // { script1: ".ps1 file as string", scrip2: ".ps1 as string"}
}

// export type Ps1Scripts = Awaited<ReturnType<typeof getPs1Scripts>>;

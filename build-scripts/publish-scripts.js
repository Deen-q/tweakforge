// data for the publish endpoint
// publish endpoint: hash received data -> hash comparison -> new row IF new script data

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scriptMetadata } from '../build-scripts/generateCheckboxOptions.js';

const filename = fileURLToPath(import.meta.url);
const dirName = path.dirname(filename);

const ps1Dir = path.join(dirName, '../src/scripts');
const publishRoute = "https://tweakforge.tools/api/scripts/publish";

const sendPayload = async (payload) => {
    const response = await fetch(publishRoute, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.PUBLISH_SECRET}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) { // for silent failures
        console.error("Error. Result: ", result);
        process.exit(1); // non-zero exit code for CI to detect failure (500 equivalent)
    };
};

async function main() {
    try {
        const changelog = JSON.parse(fs.readFileSync(`${ps1Dir}/changelog/changelog.json`, 'utf8'));

        for (const script of scriptMetadata) {
            const content = fs.readFileSync(`${ps1Dir}/${script.scriptFile}`, 'utf-8');
            const payload = {
                slug: script.id,
                name: script.name,
                content,
                changelog: changelog[script.id]
            };
            console.log(`Currently publishing: ${script.id}...`);
            await sendPayload(payload);

            if (script.scriptFileUndo) {
                const undoContent = fs.readFileSync(`${ps1Dir}/${script.scriptFileUndo}`, 'utf-8');
                const undoPayload = {
                    slug: `${script.id}Undo`,
                    name: `${script.name}Undo`,
                    content: undoContent,
                    changelog: changelog[`${script.id}Undo`]
                };
                console.log(`Currently publishing: ${script.id}Undo...`);
                await sendPayload(undoPayload);
            }
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
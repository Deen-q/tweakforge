// build-scripts/generateVersionData.js -> src/app/data/versionData.ts
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import postgres from 'postgres';
// ES import hoisting issues / Node execution order issues -> process.env ... would run undefined
const sql = postgres(process.env.NEON_CONNECTION_STRING);
import { fileURLToPath } from 'node:url';

let modalData = {};

try {
    const rows = await sql`
        SELECT DISTINCT ON (slug) slug, version, changelog, created_at
        FROM scripts
        ORDER BY slug, version DESC
    `;
    for (const [index, item] of rows.entries()) {
        modalData[item.slug] = { // slug: {version: 1, changelog: xyz, created_at: abc}, slug: {...},
            version: item.version,
            changelog: item.changelog,
            created_at: item.created_at
        }
        console.log(`[${index + 1}/${rows.length}] Success: fetched ${item.slug}`);
    }
    await sql.end(); // otherwise hangs from idle postgres connection
} catch (error) {
    console.error(error);
    process.exit(1);
};

// created_at = string due to .stringify from before
let output = `
// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// GENERATED FROM generateVersionData.js, which calls the db, transforms the data, then creates this file with said data
// run 'npm run generate-versiondata' to regenerate

interface VersionDataShape {
  slug: string,
  name: string,
  version: number,
  changelog: string,
  created_at: string,
}

export type BySlug = {
  [slug: string]: Pick<VersionDataShape, "version" | "changelog" | "created_at">
};

const versionData: BySlug = ${JSON.stringify(modalData)};

export default versionData;
`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, '../src/app/data/versionData.ts');

// write file
try {
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    };

    fs.writeFileSync(outputPath, output, 'utf-8');
    console.log("=== Finished ===");
    console.log(`-> versionData.ts generated successfully at ${outputPath}`);
} catch (error) {
    console.log("error writing file, error message is: ", error.message);
    process.exit(1);
};

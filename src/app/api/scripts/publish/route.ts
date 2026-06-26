// in Next.js 13, API routes are called Route Handlers, at app/api/
// This app uses App Router, not to be confused with the old Pages Router

import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import sql from "../../../../../lib/db";

interface PublishPayload {
    slug: string,
    name: string,
    content: string,
    changelog: string
};

// Purpose: receives a script payload from CI, computes a hash of the content, compares it against the latest stored hash for that slug, and inserts a new row only if something changed
export async function POST(req: NextRequest) { // do not rename, Next looks for this export name to map http methods
    try {
        const authorisationHeader = req.headers.get('authorization');
        const token = authorisationHeader?.split(" ")[1];

        if (!authorisationHeader || token !== process.env.PUBLISH_SECRET) {
            return NextResponse.json('Unauthorized', { status: 401 });
        };
        const body: PublishPayload = await req.json();
        const { slug, name, content, changelog } = body;

        const hash = crypto.createHash('sha256').update(content).digest('hex');

        const result = await sql`
        SELECT * FROM scripts 
        WHERE slug = ${slug} 
        ORDER BY version DESC 
        LIMIT 1
        `; // arr of rows

        const dbHash = result[0]?.content_hash;

        if (result[0] === undefined || dbHash != hash) {
            const version = result[0] ? result[0].version + 1 : 1;
            await sql`INSERT INTO scripts 
            (slug, name, content_hash, version, changelog)
            VALUES (${slug}, ${name}, ${hash}, ${version}, ${changelog})
            `
            return NextResponse.json({ message: 'New version added' }, { status: 200 });
        } else { // dbHash === hash
            return NextResponse.json({ message: 'No change' }, { status: 200 });
        };

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    };
}

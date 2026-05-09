// GET endpoint -> data the FE needs to display

import { NextRequest, NextResponse } from "next/server";
import sql from "../../../../lib/db";
import { rateLimit } from "../../../../lib/rate-limit";

// Rate limiting concerns:
// |-> serverless -> might spin more than 1 instance of the Map = x2 the limit. not worth using Redis at this scale

export async function GET(req: NextRequest) {
    // no token auth since it's a public api
    const maxRequests = 20; // per hour
    try {
        const { success, remaining, resetTime } = rateLimit(
            req.headers.get('x-forwarded-for')!, // client IP stored in x-forwarded-for. netlify routes reqs through a proxy, and not directly on the request
            maxRequests,
            60 * 60 * 1000
        );
        if (!success) {
            const resetIn = Math.ceil((resetTime! - Date.now()) / 1000);
            return NextResponse.json(
                { error: `Rate limit exceeded. Try again in ${resetIn}s` },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': String(maxRequests),
                        'X-RateLimit-Remaining': String(remaining),
                        'x-RateLimit-Reset': String(Math.ceil(resetTime! / 1000))
                    }
                }
            );
        };

        // select latest row per slug
        const rows = await sql`
        SELECT DISTINCT ON (slug) slug, name, version, changelog, created_at
        FROM scripts
        ORDER BY slug, version DESC
        `;
        return NextResponse.json(rows, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    };
}
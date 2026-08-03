# Incident: Scraper-Driven Traffic Spike (2026)

## Summary
A public metadata GET endpoint had an in-code IP rate limiter that never worked in production. Bot/scraper traffic exploited it, Netlify auto-suspended hosting for exceeding usage limits, and the fix ended up reshaping the backend architecture rather than patching the limiter.

## Timeline

**1. The limiter that never limited anything**
The public endpoint's rate limiter was stateless in-memory logic. On Netlify's serverless functions, each request can land on a fresh instance with no memory of previous ones, so the limiter never actually tracked or blocked repeat requests.

**2. The spike**
~195K requests hit the endpoint over a month (bot/scraper traffic, intent unknown), against a ~300/day baseline. Netlify auto-suspended hosting for exceeding usage limits. This was discovered after the fact, via Netlify's warning emails, not through any monitoring on my end.

**3. The fix: remove the endpoint, don't patch the limiter**
Rather than fixing the in-memory limiter, which would still be fragile on serverless, metadata generation moved to build time, the same approach scripts already used. This removed the public runtime endpoint entirely rather than just protecting it.

**4. Adding Cloudflare**
With the public GET endpoint gone, the only remaining endpoint was the authenticated `/api/scripts/publish` write path. Cloudflare was added in front of the domain as a second layer of protection for what remained.

**5. Cloudflare then blocked CI**
After the pivot, `publish-scripts.js` started getting HTTP 403s with an HTML "Just a moment..." challenge page instead of the app's own JSON error responses, a sign the block was happening in front of the app, not in it.

The cause: Cloudflare's Bot Fight Mode (Free tier) was challenging GitHub Actions' runner IPs before requests reached the endpoint. A custom WAF rule to skip it was tried first and didn't work, Bot Fight Mode on the Free tier is a structurally different product from Super Bot Fight Mode and can't be bypassed by WAF skip rules on any plan below Pro. That's a platform limitation, not a misconfiguration.

The actual fix was disabling Bot Fight Mode at the zone level entirely, relying instead on a dedicated Cloudflare rate-limiting rule scoped to `/api/`.

## Current state
- No public runtime endpoints remain; all metadata is static at build time
- `/api/scripts/publish` is rate limited: any URI path containing `/api/` gets blocked for 10 seconds after 17 requests in 10 seconds
- A dedicated custom rule (`Publish Endpoint - CI Publish Bypass`) exempts CI's own publish requests from that rate limit, so scheduled publishes can't self-block
- No Cloudflare Managed Rules or Super Bot Fight Mode are active (Free tier); Bot Fight Mode is disabled at the zone level per the fix above
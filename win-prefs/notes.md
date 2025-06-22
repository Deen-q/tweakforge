
# Client-side Rendering vs Server-side Rendering
tl;dr: 
- default to SSR, but you will always need both
- bots cannot read JS, so rendering to client means they cant see content (literally a blank page in some cases)

## Server-Side Rendering (SSR)
### Pros:
- Smaller Bundles - only send essentials
- Less resource on client since rendering is on Server
- SEO: rendering on server, so content is on the client (SEO bots can view + index our pages)
- Secure: API keys on server

### Cons:
- Lose interactivity - server components cannot listen to browser events (click, change, submit etc)
- cannot access browser APIs or maintain state
- cant use effects

## Client-Side Rendering (CSR)
### Pros:
- 
### Cons:
- Large Bundles (bundle all components and sent to client for rendering) - thus gets larger as project gets larger (more memory needed on client)
- Resource heavy, for the above reason
- No SEO (bots cannot browse the site and render components)
- Less secure: sensitive data from components + their dependencies like API keys, will be exposed to the client


# SSR + CSR, together
- NavBar, Pagination, Footer etc, should live on Server
- However, that would mean user could not add an item to cart, for example
- so, extract only the needed functionality from server components, into client components

## All components inside app folder are server components by default!
- Pages router doesnt support server side components, stop using it and use App router instead

## 'use client'; on L1
- tells NextJS compiler to include this file/component in the js Bundle (making it larger)
- on a comp that uses this: if a comp is dependent on other comps, those comps will also become client comps (and thus, added to the js bundle)
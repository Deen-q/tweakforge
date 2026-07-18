# TweakForge

Customise Windows 11 through browser-based registry scripts. Adjust features to match your preferences - no installation required.

**Try it now:** https://tweakforge.tools/

<p align="center">
  <img src="assets/tweakforge-demo.gif" alt="TweakForge demo" width="800">
</p>

### Built With
- Next.js + TypeScript + Tailwind + Jest + Neon (SQL) + GitHub Actions

## Overview

TweakForge is a web-based utility designed to simplify Windows 11 PC setup and configuration, particularly after clean installations. The application provides an accessible, no-registration interface for executing common system tweaks and optimisations. TweakForge aims to be accessible to people of all abilities, and to act as an alternative to the numerous CLI based apps that run scripts under the hood

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture Decisions](#architecture-decisions)
- [Backend & Script Versioning](#backend--script-versioning)
- [Project Status](#project-status)
- [Local Development](#local-development)
- [Script Testing Methodlogy](#script-testing-methodology-via-differencing-disk)
- [Safety & Transparency](#safety--transparency)
- [Contributing](#contributing)
- [License](#license)

## Key Features

- **Zero-friction onboarding** – No account creation required; immediate access to all functionality
- **Accessibility-first design** – Full keyboard navigation support and beginner-friendly interface
- **Privacy-focused** – No advertisements, tracking, or data collection
- **Active development** – Regular updates with new scripts and features
- **Transparency** – Scripts may be temporarily disabled if issues are identified

## Architecture Decisions

<p align="center">
<img src="assets/tweakforge-architecture-diagram.svg" alt="TweakForge architecture diagram" width="800">
</p>

## Backend & Script Versioning

### Why everything is static
- A live database dependency (for non-corporate software) means: cold starts, connection limits, an outage taking features down with it. None of that should stand between a user and a registry script
- So, neither scripts nor metadata are ever fetched at runtime. Both are baked in at build time - scripts from local files, metadata from a Neon query. And the deployed app never talks to a database when someone's using it
- If a metadata fetch is missed at build time (say, a Neon hiccup), a script's metadata just says "not yet published" - TweakForge itself never goes down over it

### Trust model
- Scripts are never stored in or served from the database. A compromised database affects the changelog display only, not script integrity

### Backend Architecture: built with...
- Neon Serverless (PostgreSQL) + Next.js App Router + Node.js + TypeScript + JavaScript

### Endpoint(s)
- `/api/scripts/publish` -> Private. CI POSTs here with a bearer token after a successful publish step; the endpoint hashes and compares content before writing a new version row to Neon
- i.e., checks if a script has been edited on push (and so introducing a new script version)

### CI Integration
- CI (see `ci.yml`) runs `npm run generate`, lint, test and build first (as a correctness check only, this output is never deployed. This may be streamlined later)
- `publish-scripts.js` runs only on a push to `main`, after that build succeeds. A script's content hash is compared against the latest stored version; only a real change inserts a new row
- If unchanged, the publish step is skipped
- Once publish succeeds, CI triggers a Netlify build hook, which regenerates everything against Neon's now-current state - that build is what ships!

## Project Status
- TweakForge will be receiving significantly fewer updates as I work on other projects

**Current Development Priorities:**
- Increasing unit test coverage
- Implementing integration test suite (likely Cypress)
- Expanding script library (or just suggest ones you'd like)
- Improving the "Contribution" documentation
- Potentially make some "good first issue" under issues for TweakForge

## Local Development
- Metadata generation needs a Neon connection string in `.env.local` to show real version/changelog data locally (might be streamlined in a future fix)
- Without it, the app runs fine: scripts just show as "not yet published"

### Prerequisites
- **Option 1:** Node.js v22.11.0 or higher
- **Option 2:** Docker Desktop

### Option 1: Setup Instructions (Node.js)

```bash
# Clone the repository
git clone https://github.com/Deen-q/tweakforge.git
cd tweakforge

# Install dependencies and start development server
npm install
npm run dev

# Application runs at http://localhost:3000 with hot module replacement enabled
```

### Option 2: Setup Instructions (Docker)

```bash
# Clone the repository
git clone https://github.com/Deen-q/tweakforge.git
cd tweakforge

# Build the Docker image
docker build -t tweakforge .

# Run the container (note the --name flag)
docker run -d -p 3000:3000 --name tweakforgecontainer tweakforge

# Access the application at http://localhost:3000

# Stop the container
docker stop tweakforgecontainer

# Optional: Remove the container
docker rm tweakforgecontainer

# Note: Docker doesn't auto-reload like Node.js HMR - rebuild the image after making changes
```
<br>
<details>
<summary><b>Help, I'm new to Docker</b></summary>

### Understanding the Run Command

**`docker run -d -p 3000:3000 --name tweakforgecontainer tweakforge`**

- **`docker run`** - Create and start a new container from an image
- **`-d`** (detached mode) - Run in background, freeing up your terminal
- **`-p 3000:3000`** (port mapping) - Forward `localhost:3000` → container port `3000`
- **`--name tweakforgecontainer`** - Give the container a human-readable name
- **`tweakforge`** - The image name to run (created with `docker build`)

### Common Commands

```bash
# Control your container
docker stop tweakforgecontainer
docker start tweakforgecontainer
docker restart tweakforgecontainer
docker rm tweakforgecontainer  # Remove (must stop first)

# Monitor containers
docker ps                        # Show running containers
docker ps -a                     # Show all containers (including stopped)

# View logs
docker logs tweakforgecontainer          # View logs
docker logs -f tweakforgecontainer       # Follow logs in real-time

# Debugging
docker exec -it tweakforgecontainer sh   # Access container shell
```

### Rebuild After Changes

```bash
docker stop tweakforgecontainer
docker rm tweakforgecontainer
docker build -t tweakforge .
docker run -d -p 3000:3000 --name tweakforgecontainer tweakforge
```

</details>
<br>

**Development Workflow:**
- Create a new branch for your changes before beginning work
- Use the Node.js setup for active development (instant feedback)
- Use Docker to test the production build
- Run tests via `npm run test` before pushing any changes

## Script Testing Methodology (via differencing disk)

Scripts undergo validation in isolated Windows environments before merging to the main branch. The testing process uses Hyper-V virtual machines with a differencing disk strategy:

**Infrastructure:**
- **Base Image** – Clean Windows installation with read-only parent disk serving as immutable template
- **Differencing Disks** – Lightweight, test-specific disks that capture only changes from the base image
- **Test Workflow** – Boot VM → Execute script → Validate results → Discard differencing disk → Generate fresh disk for next iteration
- **Benefits** – Ensures consistent test environment while maintaining rapid iteration speed (differencing disks typically <5GB vs. multi-GB snapshots)

See [differencing disk methodology](docs/differencing-disk-methodology.md) for full details.

## Safety & Transparency

- All scripts are open source and reviewable in `/src/app/data/checkboxOptions.ts`
- Scripts require administrator privileges to modify system settings
- Despite all the care put into the scripts, it is still recommended you either backup your entire registry or create a system restore point before applying changes

## Contributing

Contributions welcome! Please:
1. Open an issue to discuss proposed changes
2. Fork the repository and create a feature branch
3. Ensure tests pass (`npm run test`)
4. Submit a pull request with clear description

## License

[GNU AFFERO GENERAL PUBLIC LICENSE Version 3 (AGPL-3.0)](LICENSE)
# TweakForge

Customise Windows 11 through browser-based registry scripts. Adjust features to match your preferences - no installation required.

**Try it now:** https://tweakforge.tools/

### Built With
- Next.js + TypeScript + Tailwind + Jest

## Overview

TweakForge is a web-based utility (unlike the numerous CLI based apps) designed to simplify Windows PC setup and configuration, particularly after clean installations. The application provides an accessible, no-registration interface for executing common system tweaks and optimisations.

### Key Features

- **Zero-friction onboarding** – No account creation required; immediate access to all functionality
- **Accessibility-first design** – Full keyboard navigation support and beginner-friendly interface
- **Privacy-focused** – No advertisements, tracking, or data collection
- **Active development** – Regular updates with new scripts and features
- **Transparency** – Scripts may be temporarily disabled if issues are identified

## Project Status

**Current Development Priorities:**
- Expanding script library
- Increasing unit test coverage
- Implementing integration test suite
- Introduce script versioning

## Local Development

### Prerequisites
- **Option 1:** Node.js v22.11.0 or higher
- **Option 2:** Docker Desktop

### Setup Instructions (Node.js)

```bash
# Clone the repository
git clone https://github.com/Deen-q/tweakforge.git
cd tweakforge

# Install dependencies and start development server
npm install
npm run dev

# Application runs at http://localhost:3000 with hot module replacement enabled
```

### Setup Instructions (Docker)

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

## Testing Methodology

Scripts undergo validation in isolated Windows environments before merging to the main branch. The testing process uses Hyper-V virtual machines with a differencing disk strategy:

**Infrastructure:**
- **Base Image** – Clean Windows installation with read-only parent disk serving as immutable template
- **Differencing Disks** – Lightweight, test-specific disks that capture only changes from the base image
- **Test Workflow** – Boot VM → Execute script → Validate results → Discard differencing disk → Generate fresh disk for next iteration
- **Benefits** – Ensures consistent test environment while maintaining rapid iteration speed (differencing disks typically <5GB vs. multi-GB snapshots)

*Note: A detailed markdown file documenting the full automated testing process may be published in the future. The current implementation uses a batch file for automation.*

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
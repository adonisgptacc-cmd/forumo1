# Forumo Monorepo

This repository hosts the Forumo marketplace platform. It is organised as a PNPM workspace with dedicated applications for the API (NestJS) and the web frontend (React + Vite) alongside shared packages and infrastructure tooling.

## Structure

```
forumo/
  apps/
    api/    # NestJS + Prisma backend
    web/    # React + Vite frontend
  packages/
    config/ # shared linting/formatting/tailwind/tsconfig config
    ui/     # shared UI primitives
  infra/
    docker/ # local development docker setup
    k8s/    # kubernetes manifests (future)
  .github/workflows/ # CI pipelines
```

## Getting started

1. Install [pnpm](https://pnpm.io/) `10.x` and [Docker](https://www.docker.com/).
2. Copy `.env.example` to `.env` and adjust secrets for your environment.
3. Install dependencies:

   ```bash
   pnpm install
   pnpm --filter api prisma:generate
   ```

4. Start the local stack:

   ```bash
   docker compose -f infra/docker/compose.yml up --build
   ```

   The API is available at `http://localhost:3000/v1/health` and the web client at `http://localhost:5173`.

5. Run tests and linting:

   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```

## CI lockfile workflow

The CI pipeline expects a committed `pnpm-lock.yaml`. If dependency versions change, regenerate and commit the lockfile with:

```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "Add pnpm-lock.yaml for CI"
git push
```

## Documentation

The project roadmap is captured in `docs/` (coming soon) and aligns with the staged delivery plan outlined in the product brief.

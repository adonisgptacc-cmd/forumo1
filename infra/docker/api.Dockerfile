FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@10.13.1
COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/config/package.json packages/config/
COPY packages/ui/package.json packages/ui/
RUN pnpm install --recursive --ignore-scripts --no-frozen-lockfile || true
COPY . .
RUN pnpm --filter api prisma:generate || true
RUN pnpm --filter api build || true
CMD ["pnpm", "--filter", "api", "start"]

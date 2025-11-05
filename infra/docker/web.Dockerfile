FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm@10.13.1
COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY packages/config/package.json packages/config/
COPY packages/ui/package.json packages/ui/
RUN pnpm install --recursive --ignore-scripts --no-frozen-lockfile || true
COPY . .
RUN pnpm --filter web build || true
CMD ["pnpm", "--filter", "web", "dev"]

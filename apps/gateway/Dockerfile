
FROM node:20-alpine AS builder
WORKDIR /app

ENV CI=true

RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter @bc-arch-drafter/model... build
RUN pnpm --filter @bc-arch-drafter/contracts... build
RUN pnpm --filter @bc-arch-drafter/lib... build
RUN pnpm --filter @bc-arch-drafter/api-config... build
RUN pnpm --filter @bc-arch-drafter/ui... build
RUN pnpm --filter @bc-arch-drafter/postgres-db... build
RUN pnpm --filter @bc-arch-drafter/client-services... build

WORKDIR /app/apps/gateway
RUN pnpm build

# ----------------------------
FROM node:20-alpine
WORKDIR /app

COPY apps/gateway/package*.json ./apps/gateway/
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN npm install -g pnpm 

COPY --from=builder /app/apps/gateway/dist ./apps/gateway/dist
COPY --from=builder /app/packages ./packages

RUN pnpm install --prod

ENV PATH=/app/node_modules/.bin:$PATH
ENV NODE_ENV=production

WORKDIR /app/apps/gateway

CMD ["pnpm", "start:prod"]


FROM node:20-alpine AS builder
WORKDIR /app

ENV CI=true

RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter @bc-arch-drafter/model... build
RUN pnpm --filter @bc-arch-drafter/contracts... build
RUN pnpm --filter @bc-arch-drafter/api-config... build
RUN pnpm --filter @bc-arch-drafter/lib... build
RUN pnpm --filter @bc-arch-drafter/ui... build
RUN pnpm --filter @bc-arch-drafter/postgres-db... build
RUN pnpm --filter @bc-arch-drafter/client-services... build

WORKDIR /app/apps/web-client
RUN pnpm build:prod

# ----------------------------
FROM node:20-alpine
WORKDIR /app

COPY apps/web-client/package*.json ./apps/web-client/
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN npm install -g pnpm serve

COPY --from=builder /app/apps/web-client/dist ./apps/web-client/dist
COPY --from=builder /app/packages ./packages

RUN pnpm install 

ENV PATH=/app/node_modules/.bin:$PATH
ENV NODE_ENV=production

WORKDIR /app/apps/web-client

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]




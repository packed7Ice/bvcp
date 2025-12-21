# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared/package*.json ./packages/shared/

# Install dependencies
RUN npm ci --workspace=apps/api

# Copy source
COPY apps/api ./apps/api
COPY packages/shared ./packages/shared

# Generate Prisma client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built files
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package*.json ./
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Environment
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Start
CMD ["node", "dist/index.js"]

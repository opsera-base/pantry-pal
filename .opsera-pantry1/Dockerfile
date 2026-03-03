# ============================================================
# pantry1 - Dockerfile
# Tenant: opsera | App: pantry1 | Framework: React/Vite SPA
# RULE 73: npm install --legacy-peer-deps
# RULE 74: nginxinc/nginx-unprivileged:alpine
# RULE 74b: Non-root container on port 8080
# ============================================================

# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first (cache optimization)
COPY package*.json ./

# RULE 73: Use --legacy-peer-deps to handle peer dependency conflicts
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build Vite/React SPA (outputs to /app/dist)
RUN npm run build

# ── Stage 2: Serve ──────────────────────────────────────────
# RULE 74: Use nginxinc/nginx-unprivileged:alpine for non-root
FROM nginxinc/nginx-unprivileged:alpine

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (SPA routing + port 8080)
# Note: Build context is repo root, so path includes folder prefix
COPY .opsera-pantry1/nginx.conf /etc/nginx/conf.d/default.conf

# RULE 74b: Non-root containers MUST use port 8080 (not 80)
EXPOSE 8080

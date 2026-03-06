# ─────────────────────────────────────────────────────────────
# Stage 1: Build (Node 22 - all deps including devDependencies)
# RULE 6: Do NOT set NODE_ENV=production before npm install
# ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Install deps first (cache layer)
COPY package*.json ./
# RULE 73: Use --legacy-peer-deps for compatibility
RUN npm install --legacy-peer-deps

# Copy source (repo root = build context per RULE 7)
COPY . .

# Build the Vite/React SPA
RUN npm run build

# ─────────────────────────────────────────────────────────────
# Stage 2: Serve (nginx-unprivileged, port 8080)
# RULE 74: nginxinc/nginx-unprivileged:alpine for non-root
# RULE 74b: Port 8080 for non-root containers
# ─────────────────────────────────────────────────────────────
FROM nginxinc/nginx-unprivileged:alpine AS runtime

# Copy built SPA assets
COPY --from=build /app/dist /usr/share/nginx/html

# RULE 3: Copy server block config to conf.d/ (server {} only, NO pid)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# RULE 74b: Non-root nginx listens on 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

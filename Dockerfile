# Multi-stage build: TypeScript compilation and Python dependencies built
# separately, then combined into a minimal production image.

# --- Stage 1: Build the TypeScript/Node.js application ---
FROM node:18-alpine AS builder-node
WORKDIR /app

# Install dependencies using ci for reproducible, locked installs
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Install Python dependencies ---
FROM python:3.9-slim AS builder-python
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

COPY ./src ./src

# --- Stage 3: Final production image ---
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production Node.js dependencies to reduce image size
COPY --from=builder-node /app/package*.json ./
RUN npm ci --omit=dev

# Copy compiled application
COPY --from=builder-node /app/dist ./dist

# Copy Python dependencies installed to user site-packages
COPY --from=builder-python /root/.local /home/appuser/.local
COPY --from=builder-python /app/src ./src

# Transfer ownership to non-root user
RUN chown -R appuser:appgroup /app /home/appuser/.local

USER appuser

EXPOSE 3000

CMD ["node", "dist/main.js"]

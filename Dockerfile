# Use a multi-stage build to create a lean final image
# This allows us to build TypeScript and install Python dependencies in separate stages.

# --- Stage 1: Build the TypeScript/Node.js application ---
FROM node:18-alpine AS builder-node
WORKDIR /app

# Copy package files and install dependencies
# This layer is cached as long as package*.json doesn't change
COPY package*.json ./
RUN npm install

# Copy the rest of the source code and build the project
COPY . .
# Assumes a 'build' script in package.json that compiles TS to JS in a /dist folder
RUN npm run build 

# --- Stage 2: Setup the Python environment ---
FROM python:3.9-slim AS builder-python
WORKDIR /app

# Install Python dependencies
# This layer is cached as long as requirements.txt doesn't change
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Python source code
COPY ./src ./src

# --- Stage 3: Final Production Image ---
FROM node:18-alpine
WORKDIR /app

# Set environment to production for security and performance
ENV NODE_ENV=production

# Copy Node.js dependencies from the builder stage
COPY --from=builder-node /app/package*.json ./
COPY --from=builder-node /app/node_modules ./node_modules

# Copy the compiled TypeScript code from the builder stage
COPY --from=builder-node /app/dist ./dist

# Copy Python dependencies and source code from the Python builder stage
COPY --from=builder-python /usr/local/lib/python3.9/site-packages/ /usr/local/lib/python3.9/site-packages/
COPY --from=builder-python /app/src ./src

# Expose the application port (e.g., 3000)
EXPOSE 3000

# Command to run the application
# This will likely be a script that starts the main server.
CMD [ "node", "dist/main.js" ]

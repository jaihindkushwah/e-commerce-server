# ---------- Stage 1: Build ----------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the NestJS app
RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:22-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the build output and production deps from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production deps
RUN npm install --only=production

# Expose port (adjust as needed)
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/main"]

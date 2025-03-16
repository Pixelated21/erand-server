# Build stage
FROM oven/bun:latest as builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install production dependencies only
RUN bun install

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose the port your app runs on
EXPOSE 3020

# Start the application
CMD ["sh", "-c", "bun run start"]

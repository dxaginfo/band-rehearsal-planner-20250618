# Build stage for client
FROM node:16-alpine as client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Build stage for server
FROM node:16-alpine as server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./

# Production stage
FROM node:16-alpine
WORKDIR /app

# Copy server files
COPY --from=server-build /app/server ./server

# Copy client build files
COPY --from=client-build /app/client/build ./server/public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the application port
EXPOSE 5000

# Start the server
CMD ["node", "server/src/index.js"]

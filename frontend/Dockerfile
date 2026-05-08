# Stage 1: Build the Vite React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve the built app using a lightweight static server
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l 0.0.0.0:${PORT:-3000}"]

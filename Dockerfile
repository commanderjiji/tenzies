# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app

# Install dependencies separately (for caching)
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Run in dev mode with hot reload
CMD ["npm", "run", "dev", "--", "--host"]

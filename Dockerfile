FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm ci --silent

RUN NODE_OPTIONS="--max-old-space-size=32768" npm run build
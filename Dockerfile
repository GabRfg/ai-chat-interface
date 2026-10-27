# Estágio 1: build da aplicação
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Estágio 2: servidor de produção
FROM nginx:stable-alpine

# Fallback de SPA: rotas como /dashboard servem o index.html em vez de 404
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

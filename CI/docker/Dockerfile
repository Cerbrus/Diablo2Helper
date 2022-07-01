# BUILD STAGE
WORKDIR ../..
FROM node:14-alpine as builder
ARG BUILD_VERSION=DEV
ARG BUILD_CONFIG="dev"
COPY package.json package-lock.json ./
RUN npm install && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .

ENV NODE_OPTIONS="--max_old_space_size=4096"
RUN npm run build --output-path=dist;

# CREATE RUNTIME IMAGE
FROM nginx:1.14.1-alpine
COPY CI/nginx/nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist/Diablo2Helper /usr/share/nginx/html

# DEFAULT ENVIRONMENT & CONFIG
EXPOSE 80

# ENTRY
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;'"]

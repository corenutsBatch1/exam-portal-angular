# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
# Stage 1: Build angular codebase
FROM node:lts-alpine AS builder
RUN npm cache clean --force
WORKDIR /ang23
COPY . .
RUN npm cache clean --force

RUN npm i --force
RUN npm run build

# Stage 2: Create production-ready image
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /ang23/dist/exam-portal-ui .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
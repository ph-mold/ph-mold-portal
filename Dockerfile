# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_API_URL
ARG VITE_IMAGE_BASE_URL

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_IMAGE_BASE_URL=$VITE_IMAGE_BASE_URL

# 웹 버전으로 빌드 (Electron 제외)
RUN npm run build

# 2단계: Nginx 정적 파일 서버
FROM nginx:alpine
COPY --from=builder /app/dist-react /usr/share/nginx/html
COPY ./nginx/portal-nginx.conf /etc/nginx/conf.d/default.conf
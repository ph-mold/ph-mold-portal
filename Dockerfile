# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 웹 버전으로 빌드 (Electron 제외)
RUN npm run build

# 2단계: 런타임 스테이지
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist-react ./dist-react
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Vite preview 서버 실행
CMD ["npm", "run", "start"]

# 포트 5123
EXPOSE 5123 
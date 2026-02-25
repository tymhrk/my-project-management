# Node.jsの安定版を使用
FROM node:22-alpine

WORKDIR /app

# パッケージ管理ファイルをコピー
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# Next.js の開発サーバーを起動
CMD ["npm", "run", "dev"]
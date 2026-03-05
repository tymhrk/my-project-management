.PHONY: build up down clean restart dev-all set-env-local set-env-docker

# ==========================================
# 1. 起動・ビルド系
# ==========================================

# DBコンテナだけをバックグラウンドで起動
db:
	docker compose up -d db

# シンプルな起動
up: set-env-docker
	docker compose up -d

# ストレージを掃除してから再ビルドして起動
build: set-env-docker
	docker compose down --rmi all --volumes --remove-orphans
	docker compose up --build -d

# 停止
down:
	docker compose down

# ==========================================
# 2. 開発モード（Mac本体で動かす）
# ==========================================

# Mac本体でフロント・バック両方起動
# 1. 環境変数を localhost 用に
# 2. Docker で DB だけを起動
# 3. Mac 上でフロントとバックを並列起動（frontendはポート3001を指定）
dev-all: set-env-local db
	make -j 2 dev-f dev-b

dev-f:
	cd frontend && export $$(grep -v '^#' ../.env | xargs) && PORT=3001 npm run dev

dev-b:
	cd backend && export $$(grep -v '^#' ../.env | xargs) && bundle exec rails s

# ==========================================
# 3. 環境変数スイッチ（DATABASE_HOST対応版）
# ==========================================

set-env-local:
	@sed -i '' 's/^DATABASE_HOST=.*/DATABASE_HOST=localhost/' .env
	@sed -i '' 's/^INTERNAL_API_URL=.*/INTERNAL_API_URL=http:\/\/localhost:3000\/api\/v1/' .env
	@echo "✅ .env switched to localhost (Native Mac Mode)"

set-env-docker:
	@sed -i '' 's/^DATABASE_HOST=.*/DATABASE_HOST=db/' .env
	@sed -i '' 's/^INTERNAL_API_URL=.*/INTERNAL_API_URL=http:\/\/backend:3000\/api\/v1/' .env
	@echo "✅ .env switched to db (Docker Mode)"

# ==========================================
# 4. メンテナンス系
# ==========================================

# Dockerのゴミを一掃（ディスクが苦しくなったら）
clean:
	docker system prune -f
	docker volume prune -f

# ポートを掴んで離さないプロセスを強制終了させる（緊急用）
kill-ports:
	lsof -ti:3000,3001 | xargs kill -9
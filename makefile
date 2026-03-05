.PHONY: db up down dev-f dev-b dev-all

# --- ヘルパー: .envをMac（localhost）用に書き換える ---
set-env-local:
	@sed -i '' 's/^DATABASE_HOST=.*/DATABASE_HOST=localhost/' .env
	@sed -i '' 's/^INTERNAL_API_URL=.*/INTERNAL_API_URL=http:\/\/localhost:3000\/api\/v1/' .env
	@echo "✅ .env switched to localhost"

# --- ヘルパー: .envをDocker（コンテナ名）用に書き換える ---
set-env-docker:
	@sed -i '' 's/^DATABASE_HOST=.*/DATABASE_HOST=db/' .env
	@sed -i '' 's/^INTERNAL_API_URL=.*/INTERNAL_API_URL=http:\/\/backend:3000\/api\/v1/' .env
	@echo "✅ .env switched to docker (db)"

# ==========================================
# DBだけ起動
# ==========================================
db:
	docker compose up -d db

# ==========================================
# Dockerモード（実行前にDocker用に書き換え）
# ==========================================
up: set-env-docker
	docker compose up -d

# ==========================================
# Mac本体モード（実行前にLocal用に書き換え）
# ==========================================
dev-all: db
	@make set-env-local
	@sleep 1
	make -j 2 dev-f dev-b

dev-f:
	cd frontend && export $$(grep -v '^#' ../.env | xargs) && PORT=3001 npm run dev

dev-b:
	cd backend && export $$(grep -v '^#' ../.env | xargs) && bundle exec rails s

down:
	docker compose down
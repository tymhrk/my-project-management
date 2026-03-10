.PHONY: db build up down clean restart dev-all

db:
	docker compose up -d db

build:
	docker compose up --build -d

up:
	docker compose up -d

down:
	docker compose down

dev-all: db
	make -j 2 dev-f dev-b

dev-f:
	cd frontend && npm run dev -- -p 3001

dev-b:
	cd backend && bundle exec rails s

refresh:
	docker compose down --rmi all --volumes --remove-orphans
	docker compose up --build -d

clean:
	docker system prune -f
	docker volume prune -f

kill-ports:
	lsof -ti:3000,3001 | xargs kill -9
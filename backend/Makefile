run: build
	./bin/server

build:
	go build -o bin/server cmd/server/main.go

seed:
	go run cmd/seed/main.go

gen:
	sqlc generate
package main

import (
	"log"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/markbussard/go-react-blog-app/server"
)

func main() {
	godotenv.Load(".env")

	srv, err := server.New()
	if err != nil {
		log.Fatal("Failed to initialize server", err)
	}

	defer srv.Close()

	log.Println("Server listening on port:", srv.Addr[1:])
	err = srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	_ "github.com/lib/pq"
	"github.com/markbussard/go-react-blog-app/env"
)

type server struct {
	env    env.Env
	router chi.Router
}

func New() (*http.Server, error) {
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("Missing PORT environment variable")
	}

	env, err := env.New()
	if err != nil {
		return nil, err
	}

	srv := &server{
		env: env,
	}

	authUser, err := srv.env.Auth().GetUserByEmail(context.Background(), "markbussard@outlook.com")
	if err != nil {
		fmt.Printf("error occurred retrieving auth user by email: %v", err)
	}

	fmt.Printf("authUser: %s\n", authUser.UID)
	srv.ConfigureRouter()

	server := &http.Server{
		Handler: srv.router,
		Addr:    ":" + port,
	}

	return server, nil
}

func (srv *server) Close() {
	srv.env.Close()
}

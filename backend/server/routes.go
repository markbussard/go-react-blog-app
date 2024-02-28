package server

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/markbussard/go-react-blog-app/server/handlers"
)

func (srv *server) ConfigureRouter() {
	srv.router = chi.NewRouter()

	srv.router.Use(cors.Handler(
		cors.Options{
			AllowedOrigins:   []string{"https://*", "http://*"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"*"},
			ExposedHeaders:   []string{"Link"},
			AllowCredentials: false,
			MaxAge:           300,
		},
	))

	srv.router.Get("/health", handlers.Health)

	apiRouter := chi.NewRouter()

	apiRouter.Get("/users/me", srv.withUserAndEnv(handlers.GetMe))
	apiRouter.Post("/users", srv.withEnv(handlers.CreateUser))
	apiRouter.Get("/posts", srv.withEnv(handlers.GetPosts))

	srv.router.Mount("/api", apiRouter)
}

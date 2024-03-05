package server

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/markbussard/go-react-blog-app/server/handlers"
)

func (srv *server) ConfigureRouter() {
	srv.router = chi.NewRouter()

	srv.router.Use(middleware.RequestID)
	srv.router.Use(middleware.RealIP)
	srv.router.Use(middleware.Logger)
	srv.router.Use(middleware.Recoverer)

	srv.router.Use(middleware.Heartbeat("/ping"))

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

	apiRouter := chi.NewRouter()

	apiRouter.Use(srv.LoadUser)

	apiRouter.Get("/users/me", srv.withUserAndEnv(handlers.GetMe))
	apiRouter.Post("/users", srv.withEnv(handlers.CreateUser))

	apiRouter.Get("/posts", srv.withEnv(handlers.GetPosts))
	apiRouter.Get("/posts/{slug}", srv.withEnv(handlers.GetPostBySlug))

	apiRouter.Get("/posts/{slug}/comments", srv.withEnv(handlers.GetCommentsByPostSlug))
	apiRouter.Post("/posts/{slug}/comments", srv.withUserAndEnv(handlers.CreateComment))
	apiRouter.Patch("/posts/{slug}/comments/{commentID}", srv.withUserAndEnv(handlers.UpdateComment))
	apiRouter.Delete("/posts/{slug}/comments/{commentID}", srv.withUserAndEnv(handlers.DeleteComment))

	apiRouter.Post("/posts/{slug}/likes", srv.withUserAndEnv(handlers.CreatePostLike))
	apiRouter.Post("/posts/{slug}/comments/{commentID}/likes", srv.withUserAndEnv(handlers.CreateCommentLike))
	apiRouter.Delete("/posts/{slug}/comments/{commentID}/likes", srv.withUserAndEnv(handlers.DeleteCommentLike))
	apiRouter.Delete("/posts/{slug}/likes", srv.withUserAndEnv(handlers.DeletePostLike))

	srv.router.Mount("/api", apiRouter)
}

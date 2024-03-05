package server

import (
	"context"
	"log"
	"net/http"
	"strings"

	"github.com/markbussard/go-react-blog-app/db"
	"github.com/markbussard/go-react-blog-app/env"
	"github.com/markbussard/go-react-blog-app/server/write"
)

type srvHandlerWithEnv func(env env.Env, w http.ResponseWriter, r *http.Request)
type srvHandlerWithUserAndEnv func(env env.Env, user db.User, w http.ResponseWriter, r *http.Request)

func (srv *server) withEnv(h srvHandlerWithEnv) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		h(srv.env, w, r)
	}
}

func (srv *server) withUserAndEnv(h srvHandlerWithUserAndEnv) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user, ok := r.Context().Value(srv.env.UserContextKey()).(db.User)
		if !ok {
			write.Error(w, 401, "Not authorized")
			return
		}

		h(srv.env, user, w, r)
	}
}

func (srv *server) LoadUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		token := strings.Replace(authHeader, "Bearer ", "", 1)

		idToken, err := srv.env.Auth().VerifyIDToken(r.Context(), token)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		user, err := srv.env.DB().FindUserByAuthID(r.Context(), idToken.UID)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), srv.env.UserContextKey(), user)

		user, ok := ctx.Value(srv.env.UserContextKey()).(db.User)
		if ok {
			log.Printf("context user loaded: %v\n", user.Email)
		}

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

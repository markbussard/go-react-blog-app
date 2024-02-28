package server

import (
	"fmt"
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
		authHeader := r.Header.Get("Authorization")
		token := strings.Replace(authHeader, "Bearer ", "", 1)

		idToken, err := srv.env.Auth().VerifyIDToken(r.Context(), token)
		if err != nil {
			write.Error(w, 400, fmt.Sprintf("Token verification failed: %v", err))
			return
		}

		user, err := srv.env.DB().FindUserByAuthID(r.Context(), idToken.UID)
		if err != nil {
			write.Error(w, 400, fmt.Sprintf("Failed to fetch user: %v", err))
		}

		h(srv.env, user, w, r)
	}
}

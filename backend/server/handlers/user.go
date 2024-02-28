package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/markbussard/go-react-blog-app/db"
	"github.com/markbussard/go-react-blog-app/env"
	"github.com/markbussard/go-react-blog-app/server/write"
)

func CreateUser(env env.Env, w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Email  string `json:"email"`
		AuthID string `json:"auth_id"`
	}
	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing JSON: %s", err))
		return
	}

	user, err := env.DB().CreateUser(r.Context(), db.CreateUserParams{
		Email:  params.Email,
		AuthID: params.AuthID,
	})
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Couldn't create user: %s", err))
		return
	}

	write.JSON(w, 201, user)
}

func GetMe(env env.Env, u db.User, w http.ResponseWriter, r *http.Request) {
	write.JSON(w, 200, u)
}

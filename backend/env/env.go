package env

import (
	"context"

	"firebase.google.com/go/auth"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/markbussard/go-react-blog-app/db/wrapper"
)

type Env interface {
	DB() wrapper.Querier
	Auth() *auth.Client
	Close()
	Pool() *pgxpool.Pool
	UserContextKey() userContextKey
}

type userContextKey string

const userKey userContextKey = "user"

type env struct {
	db             *pgxpool.Pool
	querier        wrapper.Querier
	auth           *auth.Client
	userContextKey userContextKey
}

func (e *env) Pool() *pgxpool.Pool {
	return e.db
}

func (e *env) DB() wrapper.Querier {
	return e.querier
}

func (e *env) Auth() *auth.Client {
	return e.auth
}

func (e *env) Close() {
	e.db.Close()
}

func (e *env) UserContextKey() userContextKey {
	return e.userContextKey
}

func New() (Env, error) {
	db, err := Connect()
	if err != nil {
		return nil, err
	}

	auth, err := GetAuthClient(context.Background())
	if err != nil {
		return nil, err
	}

	return &env{
		db:             db,
		querier:        wrapper.NewQuerier(db),
		auth:           auth,
		userContextKey: userKey,
	}, nil
}

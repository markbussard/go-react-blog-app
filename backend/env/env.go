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
}

type env struct {
	db      *pgxpool.Pool
	querier wrapper.Querier
	auth    *auth.Client
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
		db:      db,
		querier: wrapper.NewQuerier(db),
		auth:    auth,
	}, nil
}

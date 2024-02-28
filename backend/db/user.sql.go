// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: user.sql

package db

import (
	"context"
)

const createUser = `-- name: CreateUser :one
INSERT INTO "user" (email, auth_id) VALUES (LOWER($1::varchar), $2::varchar) RETURNING id, auth_id, email, created_at, updated_at
`

type CreateUserParams struct {
	Email  string `json:"email"`
	AuthID string `json:"authId"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, createUser, arg.Email, arg.AuthID)
	var i User
	err := row.Scan(
		&i.ID,
		&i.AuthID,
		&i.Email,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const findUserByAuthID = `-- name: FindUserByAuthID :one
SELECT id, auth_id, email, created_at, updated_at FROM "user" WHERE auth_id = $1 LIMIT 1
`

func (q *Queries) FindUserByAuthID(ctx context.Context, authID string) (User, error) {
	row := q.db.QueryRow(ctx, findUserByAuthID, authID)
	var i User
	err := row.Scan(
		&i.ID,
		&i.AuthID,
		&i.Email,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

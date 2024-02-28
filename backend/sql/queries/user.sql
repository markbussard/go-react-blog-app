-- name: CreateUser :one
INSERT INTO "user" (email, auth_id) VALUES (LOWER(@email::varchar), @auth_id::varchar) RETURNING *;

-- name: FindUserByAuthID :one
SELECT * FROM "user" WHERE auth_id = $1 LIMIT 1;
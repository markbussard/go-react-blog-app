-- name: CreateLike :one
INSERT INTO "like" (user_id, likeable_id, likeable_type) VALUES ($1, $2, $3) RETURNING *;

-- name: DeleteLike :exec
DELETE FROM "like" WHERE user_id = $1 AND likeable_id = $2 AND likeable_type = $3;

-- name: FindLikesByLikeableID :many
SELECT * FROM "like" WHERE likeable_id = $1 AND likeable_type = $2 ORDER BY created_at DESC;

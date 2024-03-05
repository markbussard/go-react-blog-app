-- name: FindBookmarksByUserID :many
SELECT * FROM bookmark WHERE user_id = $1 ORDER BY id DESC;

-- name: FindBookmarkByIDs :one
SELECT * FROM bookmark WHERE user_id = $1 AND post_id = $2 LIMIT 1;

-- name: DeleteBookmarkByIDs :exec
DELETE FROM bookmark WHERE user_id = $1 AND post_id = $2;

-- name: FindBookmarksByPostID :many
SELECT * FROM bookmark WHERE post_id = $1 ORDER BY created_at DESC;

-- name: CreateBookmark :one
INSERT INTO bookmark (user_id, post_id) VALUES ($1, $2) RETURNING *;


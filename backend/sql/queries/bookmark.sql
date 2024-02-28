-- name: CreateBookmark :one
INSERT INTO bookmark (user_id, post_id) VALUES ($1, $2) RETURNING *;

-- name: FindBookmarksByUserID :many
SELECT * FROM bookmark WHERE user_id = $1 ORDER BY id DESC;
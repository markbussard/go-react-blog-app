-- name: CreatePost :one
INSERT INTO post (author_id, title, body, status) VALUES ($1, $2, $3, $4) RETURNING *;

-- name: UpdatePost :one
UPDATE post SET title = $3, body = $4, updated_at = NOW() WHERE id = $1 AND author_id = $2 RETURNING *;

-- name: FindPostsByAuthor :many
SELECT * FROM post WHERE author_id = $1 ORDER BY id DESC;

-- name: FindPostByIDs :one
SELECT * FROM post WHERE author_id = $1 AND id = $2 LIMIT 1;

-- name: GetPosts :many
SELECT post.id, post.title, post.body, post.created_at, post.updated_at, "user".email as author_email
FROM post
LEFT JOIN "user" ON post.author_id = "user".id
WHERE deleted_at is null AND status = 'PUBLISHED'
ORDER BY post.created_at DESC
LIMIT 5 OFFSET $1;

-- name: DeletePostByIDs :exec
DELETE FROM post WHERE author_id = $1 AND id = $2;


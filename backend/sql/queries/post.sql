-- name: CreatePost :one
INSERT INTO post (author_id, slug, title, subtitle, body, tags, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;

-- name: UpdatePost :one
UPDATE post 
SET 
  title = $3, 
  subtitle = $4, 
  body = $5,
  tags = $6, 
  updated_at = NOW() 
WHERE id = $1 AND author_id = $2 RETURNING *;

-- name: FindPostsByAuthor :many
SELECT * FROM post WHERE author_id = $1 AND deleted_at is null ORDER BY updated_at DESC;

-- name: FindPostByIDs :one
SELECT * FROM post WHERE author_id = $1 AND id = $2 LIMIT 1;

-- name: FindPostBySlug :one
SELECT 
  post.id, 
  post.slug, 
  post.title, 
  post.subtitle, 
  post.body, 
  post.tags::text[] as tags, 
  post.created_at, 
  post.updated_at, 
  "user".email as author_email,
  COUNT(DISTINCT "like".id) as like_count,
  COUNT(DISTINCT comment.id) as comment_count
FROM post 
LEFT JOIN "user" ON post.author_id = "user".id
LEFT JOIN "like" ON post.id = "like".likeable_id AND "like".likeable_type = 'POST'
LEFT JOIN comment ON post.id = comment.post_id
WHERE post.slug = $1 AND post.deleted_at is null AND post.status = 'PUBLISHED'
GROUP BY post.id, post.slug, post.title, post.subtitle, post.body, post.tags, post.created_at, post.updated_at, "user".email
LIMIT 1;

-- name: FindPostBySlugWithLikedByUser :one
SELECT 
  post.id, 
  post.slug, 
  post.title, 
  post.subtitle, 
  post.body, 
  post.tags::text[] as tags, 
  post.created_at, 
  post.updated_at, 
  "user".email as author_email,
  COUNT(DISTINCT "like".id) as like_count,
  COUNT(DISTINCT comment.id) as comment_count,
  CASE WHEN COUNT(DISTINCT liked_by_user.id) > 0 THEN true ELSE false END as is_liked
FROM post
LEFT JOIN "user" ON post.author_id = "user".id
LEFT JOIN "like" ON post.id = "like".likeable_id AND "like".likeable_type = 'POST'
LEFT JOIN comment ON post.id = comment.post_id
LEFT JOIN "like" as liked_by_user ON post.id = liked_by_user.likeable_id AND liked_by_user.likeable_type = 'POST' AND liked_by_user.user_id = $2
WHERE post.slug = $1 AND post.deleted_at is null AND post.status = 'PUBLISHED'
GROUP BY post.id, post.slug, post.title, post.subtitle, post.body, post.tags, post.created_at, post.updated_at, "user".email
LIMIT 1;

-- name: GetPosts :many
SELECT 
  post.id, 
  post.slug, 
  post.title, 
  post.subtitle, 
  post.tags::text[] as tags, 
  post.created_at, 
  post.updated_at, 
  "user".email as author_email
FROM post
LEFT JOIN "user" ON post.author_id = "user".id
WHERE deleted_at is null AND status = 'PUBLISHED'
ORDER BY post.updated_at DESC
LIMIT 5 OFFSET $1;

-- name: DeletePostByIDs :exec
DELETE FROM post WHERE author_id = $1 AND id = $2;


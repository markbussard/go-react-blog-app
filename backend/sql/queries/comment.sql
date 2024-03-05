-- name: FindCommentsByPostID :many
SELECT 
  comment.id, 
  comment.body, 
  comment.created_at, 
  "user".email as author_name,
  COUNT(DISTINCT "like".id) as like_count
FROM comment
LEFT JOIN "user" ON comment.user_id = "user".id
LEFT JOIN "like" ON comment.id = "like".likeable_id AND "like".likeable_type = 'COMMENT'
WHERE comment.post_id = $1 AND comment.deleted_at is null
GROUP BY comment.id, comment.body, comment.created_at, "user".email
ORDER BY comment.created_at DESC;

-- name: FindCommentsWithLikedByUser :many
SELECT 
  comment.id, 
  comment.body, 
  comment.created_at, 
  "user".email as author_name,
  COUNT(DISTINCT "like".id) as like_count,
  CASE WHEN COUNT(DISTINCT liked_by_user.id) > 0 THEN true ELSE false END as is_liked
FROM comment
LEFT JOIN "user" ON comment.user_id = "user".id
LEFT JOIN "like" ON comment.id = "like".likeable_id AND "like".likeable_type = 'COMMENT'
LEFT JOIN "like" as liked_by_user ON comment.id = liked_by_user.likeable_id AND liked_by_user.likeable_type = 'COMMENT' AND liked_by_user.user_id = $2
WHERE comment.post_id = $1 AND comment.deleted_at is null
GROUP BY comment.id, comment.body, comment.created_at, "user".email
ORDER BY comment.created_at DESC;

-- name: CreateComment :one
INSERT INTO comment (user_id, post_id, body) VALUES ($1, $2, $3) RETURNING *;

-- name: UpdateComment :one
UPDATE comment
SET 
  body = $4,
  updated_at = NOW()
WHERE id = $1 AND user_id = $2 AND post_id = $3 RETURNING *;

-- name: DeleteCommentByIDs :exec
UPDATE comment
SET deleted_at = NOW()
WHERE id = $1 AND user_id = $2 AND post_id = $3 RETURNING *;

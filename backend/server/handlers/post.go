package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"github.com/markbussard/go-react-blog-app/db"
	"github.com/markbussard/go-react-blog-app/env"
	"github.com/markbussard/go-react-blog-app/server/write"
)

func GetPosts(env env.Env, w http.ResponseWriter, r *http.Request) {
	offSetStr := r.URL.Query().Get("offset")
	if offSetStr == "" {
		offSetStr = "0"
	}

	offset, err := strconv.Atoi(offSetStr)
	if err != nil {
		offset = 0
	}

	posts, err := env.DB().GetPosts(r.Context(), int32(offset))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Couldn't create user: %s", err))
		return
	}

	write.JSON(w, 200, posts)
}

func CreatePost(env env.Env, w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		AuthorID uuid.UUID     `json:"author_id"`
		Title    string        `json:"title"`
		Body     string        `json:"body"`
		Status   db.PostStatus `json:"status"`
	}
	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing JSON: %s", err))
		return
	}

	// post, err := env.DB().CreatePost(r.Context(), db.CreatePostParams{
	// 	AuthorID: params.AuthorID,
	// 	Title:    params.Title,
	// 	Body:     params.Body,
	// 	Status:   params.Status,
	// })
}

// -- name: CreatePost :one
// INSERT INTO post (author_id, title, body, status) VALUES ($1, $2, $3, $4) RETURNING *;

// -- name: UpdatePost :one
// UPDATE post SET title = $3, body = $4, updated_at = NOW() WHERE id = $1 AND author_id = $2 RETURNING *;

// -- name: FindPostsByAuthor :many
// SELECT * FROM post WHERE author_id = $1 ORDER BY id DESC;

// -- name: FindPostByIDs :one
// SELECT * FROM post WHERE author_id = $1 AND id = $2 LIMIT 1;

// -- name: GetPosts :many
// SELECT post.*, "user".*
// FROM post
// LEFT JOIN "user" ON post.author_id = "user".id
// ORDER BY post.created_at DESC
// LIMIT 5 OFFSET $1;

// -- name: DeletePostByIDs :exec
// DELETE FROM post WHERE author_id = $1 AND id = $2;

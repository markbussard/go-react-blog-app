package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
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
		log.Printf("Error getting posts: %v", err)
		write.Error(w, 400, fmt.Sprintf("Couldn't get posts: %s", err))
		return
	}

	write.JSON(w, 200, posts)
}

func CreatePost(env env.Env, u db.User, w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Title    string        `json:"title"`
		Subtitle string        `json:"subtitle"`
		Body     string        `json:"body"`
		Status   db.PostStatus `json:"status"`
		Tags     []db.PostTag  `json:"tags"`
	}
	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing JSON: %s", err))
		return
	}

	slug := GenerateSlug(params.Title)

	post, err := env.DB().CreatePost(r.Context(), db.CreatePostParams{
		AuthorID: u.ID,
		Slug:     slug,
		Title:    params.Title,
		Subtitle: params.Subtitle,
		Body:     params.Body,
		Tags:     params.Tags,
		Status:   params.Status,
	})
	if err != nil {
		log.Printf("Error occurred: %v", err)
	}

	write.JSON(w, 201, post)
}

func GetPostBySlug(env env.Env, w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	user, ok := r.Context().Value(env.UserContextKey()).(db.User)
	if ok {
		post, err := env.DB().FindPostBySlugWithLikedByUser(r.Context(), db.FindPostBySlugWithLikedByUserParams{
			Slug:   slug,
			UserID: user.ID,
		})
		if err != nil {
			write.Error(w, 400, fmt.Sprintf("Error getting post by slug: %s", err))
			return
		}

		write.JSON(w, 200, post)
	} else {
		post, err := env.DB().FindPostBySlug(r.Context(), slug)
		if err != nil {
			write.Error(w, 400, fmt.Sprintf("Error getting post by slug: %s", err))
			return
		}

		write.JSON(w, 200, post)
	}
}

// TODO
// -- name: CreatePost :one
// INSERT INTO post (author_id, title, body, status) VALUES ($1, $2, $3, $4) RETURNING *;

// -- name: UpdatePost :one
// UPDATE post SET title = $3, body = $4, updated_at = NOW() WHERE id = $1 AND author_id = $2 RETURNING *;

// -- name: FindPostsByAuthor :many
// SELECT * FROM post WHERE author_id = $1 ORDER BY id DESC;

// -- name: DeletePostByIDs :exec
// DELETE FROM post WHERE author_id = $1 AND id = $2;

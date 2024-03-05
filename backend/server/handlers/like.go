package handlers

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/markbussard/go-react-blog-app/db"
	"github.com/markbussard/go-react-blog-app/env"
	"github.com/markbussard/go-react-blog-app/server/write"
)

func CreatePostLike(env env.Env, u db.User, w http.ResponseWriter, r *http.Request) {
	postID, err := GetUUIDFromSlug(env.Pool(), chi.URLParam(r, "slug"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing postID: %s", err))
		return
	}

	like, err := env.DB().CreateLike(r.Context(), db.CreateLikeParams{
		UserID:       u.ID,
		LikeableID:   postID,
		LikeableType: "POST",
	})
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Failed to create new comment: %s", err))
	}

	write.JSON(w, 201, like)
}

func DeletePostLike(env env.Env, u db.User, w http.ResponseWriter, r *http.Request) {
	postID, err := GetUUIDFromSlug(env.Pool(), chi.URLParam(r, "slug"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing postID: %s", err))
		return
	}

	err = env.DB().DeleteLike(r.Context(), db.DeleteLikeParams{
		UserID:       u.ID,
		LikeableID:   postID,
		LikeableType: "POST",
	})
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Failed to delete like: %s", err))
	}

	write.JSON(w, 200, true)
}

func CreateCommentLike(env env.Env, u db.User, w http.ResponseWriter, r *http.Request) {
	commentID, err := uuid.Parse(chi.URLParam(r, "commentID"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing commentID: %s", err))
		return
	}

	like, err := env.DB().CreateLike(r.Context(), db.CreateLikeParams{
		UserID:       u.ID,
		LikeableID:   commentID,
		LikeableType: "COMMENT",
	})
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Failed to create new comment: %s", err))
	}

	write.JSON(w, 201, like)
}

func DeleteCommentLike(env env.Env, u db.User, w http.ResponseWriter, r *http.Request) {
	commentID, err := uuid.Parse(chi.URLParam(r, "commentID"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing commentID: %s", err))
		return
	}

	err = env.DB().DeleteLike(r.Context(), db.DeleteLikeParams{
		UserID:       u.ID,
		LikeableID:   commentID,
		LikeableType: "COMMENT",
	})
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Failed to delete like: %s", err))
	}

	write.JSON(w, 200, true)
}

package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/markbussard/go-react-blog-app/db"
	"github.com/markbussard/go-react-blog-app/env"
	"github.com/markbussard/go-react-blog-app/server/write"
)

func GetCommentsByPostSlug(env env.Env, w http.ResponseWriter, r *http.Request) {
	postID, err := GetUUIDFromSlug(env.Pool(), chi.URLParam(r, "slug"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing postID: %s", err))
		return
	}

	user, ok := r.Context().Value(env.UserContextKey()).(db.User)

	if ok {
		comments, err := env.DB().FindCommentsWithLikedByUser(r.Context(), db.FindCommentsWithLikedByUserParams{
			PostID: postID,
			UserID: user.ID,
		})
		if err != nil {
			write.Error(w, 400, fmt.Sprintf("Error getting post comments: %s", err))
			return
		}

		write.JSON(w, 200, comments)
	} else {
		comments, err := env.DB().FindCommentsByPostID(r.Context(), postID)
		if err != nil {
			write.Error(w, 400, fmt.Sprintf("Error getting post comments: %s", err))
			return
		}

		write.JSON(w, 200, comments)
	}
}

func CreateComment(env env.Env, u db.User, w http.ResponseWriter, r *http.Request) {
	postID, err := GetUUIDFromSlug(env.Pool(), chi.URLParam(r, "slug"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing commentID: %s", err))
		return
	}

	type parameters struct {
		Body string `json:"body"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err = decoder.Decode(&params)
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing JSON: %s", err))
		return
	}

	comment, err := env.DB().CreateComment(r.Context(), db.CreateCommentParams{
		UserID: u.ID,
		PostID: postID,
		Body:   params.Body,
	})
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Failed to create new comment: %s", err))
	}

	write.JSON(w, 201, comment)
}

func UpdateComment(env env.Env, u db.User, w http.ResponseWriter, r *http.Request) {
	postID, err := GetUUIDFromSlug(env.Pool(), chi.URLParam(r, "slug"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing postID: %s", err))
		return
	}

	commentID, err := uuid.Parse(chi.URLParam(r, "commentID"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing commentID: %s", err))
		return
	}

	type parameters struct {
		Body string `json:"body"`
	}
	decoder := json.NewDecoder(r.Body)

	params := parameters{}
	err = decoder.Decode(&params)
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing JSON: %s", err))
		return
	}

	comment, err := env.DB().UpdateComment(r.Context(), db.UpdateCommentParams{
		ID:     commentID,
		UserID: u.ID,
		PostID: postID,
		Body:   params.Body,
	})
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Failed to create new comment: %s", err))
	}

	write.JSON(w, 201, comment)
}

func DeleteComment(env env.Env, u db.User, w http.ResponseWriter, r *http.Request) {
	postID, err := GetUUIDFromSlug(env.Pool(), chi.URLParam(r, "slug"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing postID: %s", err))
		return
	}

	commentID, err := uuid.Parse(chi.URLParam(r, "commentID"))
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Error parsing commentID: %s", err))
		return
	}

	err = env.DB().DeleteCommentByIDs(r.Context(), db.DeleteCommentByIDsParams{
		ID:     commentID,
		UserID: u.ID,
		PostID: postID,
	})
	if err != nil {
		write.Error(w, 400, fmt.Sprintf("Failed to delete comment: %s", err))
	}

	write.JSON(w, 200, true)
}

package handlers

import (
	"context"
	"fmt"
	"regexp"
	"strings"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

func GenerateSlug(title string) string {
	reg, _ := regexp.Compile("[^a-zA-Z0-9 ]+")
	processedTitle := reg.ReplaceAllString(title, "")

	processedTitle = strings.ToLower(processedTitle)

	slug := strings.Replace(processedTitle, " ", "-", -1)

	uid := uuid.New()

	uidString := strings.Replace(uid.String(), "-", "", -1)

	uid12 := uidString[:12]

	slug = fmt.Sprintf("%s-%s", slug, uid12)

	return slug
}

func GetUUIDFromSlug(db *pgxpool.Pool, slug string) (uuid.UUID, error) {
	var postID uuid.UUID
	err := db.QueryRow(context.Background(), "SELECT id FROM post WHERE slug = $1", slug).Scan(&postID)
	if err != nil {
		return uuid.Nil, err
	}
	return postID, nil
}

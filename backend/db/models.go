// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package db

import (
	"database/sql/driver"
	"fmt"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type LikeableType string

const (
	LikeableTypePOST    LikeableType = "POST"
	LikeableTypeCOMMENT LikeableType = "COMMENT"
)

func (e *LikeableType) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = LikeableType(s)
	case string:
		*e = LikeableType(s)
	default:
		return fmt.Errorf("unsupported scan type for LikeableType: %T", src)
	}
	return nil
}

type NullLikeableType struct {
	LikeableType LikeableType `json:"likeableType"`
	Valid        bool         `json:"valid"` // Valid is true if LikeableType is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullLikeableType) Scan(value interface{}) error {
	if value == nil {
		ns.LikeableType, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.LikeableType.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullLikeableType) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.LikeableType), nil
}

type PostStatus string

const (
	PostStatusDRAFT     PostStatus = "DRAFT"
	PostStatusPUBLISHED PostStatus = "PUBLISHED"
)

func (e *PostStatus) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = PostStatus(s)
	case string:
		*e = PostStatus(s)
	default:
		return fmt.Errorf("unsupported scan type for PostStatus: %T", src)
	}
	return nil
}

type NullPostStatus struct {
	PostStatus PostStatus `json:"postStatus"`
	Valid      bool       `json:"valid"` // Valid is true if PostStatus is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullPostStatus) Scan(value interface{}) error {
	if value == nil {
		ns.PostStatus, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.PostStatus.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullPostStatus) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.PostStatus), nil
}

type PostTag string

const (
	PostTagTECHNOLOGY  PostTag = "TECHNOLOGY"
	PostTagSCIENCE     PostTag = "SCIENCE"
	PostTagPROGRAMMING PostTag = "PROGRAMMING"
)

func (e *PostTag) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = PostTag(s)
	case string:
		*e = PostTag(s)
	default:
		return fmt.Errorf("unsupported scan type for PostTag: %T", src)
	}
	return nil
}

type NullPostTag struct {
	PostTag PostTag `json:"postTag"`
	Valid   bool    `json:"valid"` // Valid is true if PostTag is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullPostTag) Scan(value interface{}) error {
	if value == nil {
		ns.PostTag, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.PostTag.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullPostTag) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.PostTag), nil
}

type Bookmark struct {
	ID        uuid.UUID        `json:"id"`
	UserID    uuid.UUID        `json:"userId"`
	PostID    uuid.UUID        `json:"postId"`
	CreatedAt pgtype.Timestamp `json:"createdAt"`
}

type Comment struct {
	ID        uuid.UUID        `json:"id"`
	UserID    uuid.UUID        `json:"userId"`
	PostID    uuid.UUID        `json:"postId"`
	Body      string           `json:"body"`
	CreatedAt pgtype.Timestamp `json:"createdAt"`
	UpdatedAt pgtype.Timestamp `json:"updatedAt"`
	DeletedAt pgtype.Timestamp `json:"deletedAt"`
}

type Like struct {
	ID           uuid.UUID        `json:"id"`
	UserID       uuid.UUID        `json:"userId"`
	LikeableID   uuid.UUID        `json:"likeableId"`
	LikeableType LikeableType     `json:"likeableType"`
	CreatedAt    pgtype.Timestamp `json:"createdAt"`
}

type Post struct {
	ID        uuid.UUID        `json:"id"`
	AuthorID  uuid.UUID        `json:"authorId"`
	Slug      string           `json:"slug"`
	Title     string           `json:"title"`
	Subtitle  string           `json:"subtitle"`
	Tags      []PostTag        `json:"tags"`
	Body      string           `json:"body"`
	Status    PostStatus       `json:"status"`
	CreatedAt pgtype.Timestamp `json:"createdAt"`
	UpdatedAt pgtype.Timestamp `json:"updatedAt"`
	DeletedAt pgtype.Timestamp `json:"deletedAt"`
}

type User struct {
	ID        uuid.UUID        `json:"id"`
	AuthID    string           `json:"authId"`
	Email     string           `json:"email"`
	CreatedAt pgtype.Timestamp `json:"createdAt"`
	UpdatedAt pgtype.Timestamp `json:"updatedAt"`
}

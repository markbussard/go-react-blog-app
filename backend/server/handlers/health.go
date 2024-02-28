package handlers

import (
	"net/http"

	"github.com/markbussard/go-react-blog-app/server/write"
)

func Health(w http.ResponseWriter, r *http.Request) {
	write.JSON(w, 200, struct{}{})
}

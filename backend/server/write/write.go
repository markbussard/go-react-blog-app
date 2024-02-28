package write

import (
	"encoding/json"
	"log"
	"net/http"
)

func JSON(w http.ResponseWriter, code int, payload interface{}) {
	data, err := json.Marshal(payload)
	if err != nil {
		log.Printf("Failed to Marshal payload: %v", err)
		w.WriteHeader(500)
		return
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(data)
}

func Error(w http.ResponseWriter, code int, message string) {
	if code > 499 {
		log.Println("Responding with 5XX error:", message)
	}
	type ErrorResponse struct {
		Error string `json:"error"`
	}
	JSON(w, code, ErrorResponse{Error: message})
}

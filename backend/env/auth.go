package env

import (
	"context"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

func FirebaseApp(ctx context.Context) (*firebase.App, error) {
	firebaseCredentials := os.Getenv("FIREBASE_CREDENTIALS")
	if firebaseCredentials == "" {
		log.Fatalln("Missing FIREBASE_CREDENTIALS environment variable")
	}
	app, err := firebase.NewApp(ctx, nil, option.WithCredentialsJSON([]byte(firebaseCredentials)))
	if err != nil {
		return nil, err
	}
	return app, nil
}

func GetAuthClient(ctx context.Context) (*auth.Client, error) {
	app, err := FirebaseApp(ctx)
	if err != nil {
		return nil, err
	}
	authClient, err := app.Auth(ctx)
	if err != nil {
		return nil, err
	}
	return authClient, nil
}

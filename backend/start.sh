#!/bin/bash

# Build the Go code
go build -o serverbin ./cmd/server/main.go

# Run the built binary
./serverbin

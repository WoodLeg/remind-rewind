package main

import (
	"net/http"
	"os"
	"remind-rewind/server/components/users"

	"github.com/gorilla/handlers"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
)

func main() {
	r := httprouter.New()
	userController := users.NewController()
	r.POST("/user", userController.CreateUser)

	loggedRouter := handlers.LoggingHandler(os.Stdout, r)
	http.ListenAndServe(":8080", cors.Default().Handler(loggedRouter))
}

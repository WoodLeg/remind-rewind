package users

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

// Controller - struct of UserController
type Controller struct{}

// NewController - create new user controller
func NewController() *Controller {
	return &Controller{}
}

// CreateUser - Insert a user in the database then send an email
func (c Controller) CreateUser(response http.ResponseWriter, request *http.Request, _ httprouter.Params) {
	// request.ParseForm()
	u := User{}
	json.NewDecoder(request.Body).Decode(&u)

	if u.Email == "" {
		data := dataBuilder(`No email found`, http.StatusBadRequest)
		u, _ := json.Marshal(data)
		response.Header().Set(`Content-Type`, `application/json`)
		response.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(response, "%s\n", u)
	} else {
		data := dataBuilder(`Successful`, 200)
		toSend, _ := json.Marshal(data)
		response.Header().Set(`Content-Type`, `application/json`)
		response.WriteHeader(http.StatusOK)
		fmt.Fprintf(response, "%s\n", toSend)
	}

}

func dataBuilder(str string, code int) interface{} {
	return struct {
		Message string
		Code    int
	}{
		str,
		code,
	}
}

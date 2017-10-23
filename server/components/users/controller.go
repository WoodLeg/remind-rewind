package users

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"

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
	fmt.Println(request.Header)
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
		go sendMail(u)
		response.Header().Set(`Content-Type`, `application/json`)
		response.Header().Set("Access-Control-Allow-Origin", "*")
		response.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		response.Header().Set("Access-Control-Allow-Headers",
			"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		response.WriteHeader(http.StatusOK)
		fmt.Fprintf(response, "%s\n", toSend)
	}

}

func sendMail(data User) {
	mess := []byte("To: " + data.Email + "\r\n" +
		"Subject: Remind-rewind\r\n" +
		"\r\n" +
		data.Message + "\r\n")
	err := smtp.SendMail("smtp.gmail.com:587", smtp.PlainAuth("", "paul.souvestre@gmail.com", "qn$]Cj;p", "smtp.gmail.com"), data.Email, []string{`paul.souvestre@gmail.com`}, []byte(mess))
	if err != nil {
		fmt.Println(err)
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

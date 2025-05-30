package auth

type SignupPayload struct {
	Username        string `json:"username" validator:"required,min=4"`
	Email           string `json:"email" validator:"required,email"`
	Password        string `json:"password" validator:"required,min=8"`
	ConfirmPassword string `json:"confirmpassword" validator:"required,eqfield=Password"`
}
